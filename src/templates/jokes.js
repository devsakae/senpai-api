const { default: axios } = require("axios");
const { randomJokes, themedJokes } = require("../controllers/jokes.controller")
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

const jokes = async (req) => {
    const payload = req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body
    const contact = payload?.contacts || payload?.contacts[0];

    const command = payload.split(" ")

    if (command.length === 1) {
        const joker = await randomJokes()

        await axios({
            method: 'POST',
            url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
            headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: contact.wa_id,
                type: "text",
                text: {
                    body: joker
                }
            },
        });
    }

    if (command.length > 1) {
        const theme = command.splice(0, 3).join(" ")

        const joker = await themedJokes(theme)

        await axios({
            method: 'POST',
            url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
            headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: contact.wa_id,
                type: "text",
                text: {
                    body: joker
                }
            },
        });
    }

}

module.exports = {
    jokes
}