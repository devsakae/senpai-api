
const https = require("https");

exports.handler = async (event)  => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
  const WHATSAPP_TOKEN = process.env.GRAPH_API_TOKEN;

  let response;
  if (event?.requestContext?.http?.method === "GET") {
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
    // to learn more about GET request for webhook verification
    let queryParams = event?.queryStringParameters;
    if (queryParams != null) {
      const mode = queryParams["hub.mode"];
      if (mode == "subscribe") {
        const verifyToken = queryParams["hub.verify_token"];
        if (verifyToken == VERIFY_TOKEN) {
          let challenge = queryParams["hub.challenge"];
          response = {
              "statusCode": 200,
              "body": parseInt(challenge),
              "isBase64Encoded": false
          };
        } else {
          const responseBody = "Error, wrong validation token";
          response = {
              "statusCode": 403,
              "body": JSON.stringify(responseBody),
              "isBase64Encoded": false
          };
        }
      } else {
          const responseBody = "Error, wrong mode";
          response = {
              "statusCode": 403,
              "body": JSON.stringify(responseBody),
              "isBase64Encoded": false
        };
      }
    }
    else {
      const responseBody = "Error, no query parameters";
      response = {
          "statusCode": 403,
          "body": JSON.stringify(responseBody),
          "isBase64Encoded": false
      };
    }
  } else if (event?.requestContext?.http?.method === "POST") {
    // process POST request (WhatsApp chat messages)
    // https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    // to learn about WhatsApp text message payload structure
    let body = JSON.parse(event.body)
    let entries = body.entry;
    for (let entry of entries) {
      for (let change of entry.changes) {
        let value = change.value;
        if(value != null) {
          let phone_number_id = value.metadata.phone_number_id;
          if (value.messages != null) {
            for (let message of value.messages) {
              if (message.type === 'text') {
                let from = message.from;
                let message_body = message.text.body;
                let reply_message = "Ack from AWS lambda: " + message_body;
                sendReply(phone_number_id, WHATSAPP_TOKEN, from, reply_message);
                const responseBody = "Done";
                response = {
                    "statusCode": 200,
                    "body": JSON.stringify(responseBody),
                    "isBase64Encoded": false
                };
              }
            }
          }
        }
      }
    }
  } else {
    const responseBody = "Unsupported method";
    response = {
        "statusCode": 403,
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };
  }
  
  return response;
}

const sendReply = (phone_number_id, whatsapp_token, to, reply_message) => {
  let json = {
    messaging_product: "whatsapp",
    to: to,
    text: { body: reply_message },
  };
  let data = JSON.stringify(json);
  let path = "/v22.0/"+phone_number_id+"/messages?access_token="+whatsapp_token;
  let options = {
    host: "graph.facebook.com",
    path: path,
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };
  let callback = (response) => {
    let str = "";
    response.on("data", (chunk) => {
      str += chunk;
    });
    response.on("end", () => {
    });
  };
  let req = https.request(options, callback);
  req.on("error", (e) => {});
  req.write(data);
  req.end();
}
