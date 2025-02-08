// const jsonHeaders = require('../utils/index');
// const axios = require('axios');


// const listMenu1 = async (req) => {

//   await axios({
//     jsonHeaders,
//     data: {}
//   })
// };

// {
//   "messaging_product": "whatsapp",
//   "recipient_type": "individual",
//   "to": "{{Recipient-Phone-Number}}",
//   "context": {
//       "message_id": "<MSGID_OF_PREV_MSG>"
//   },
//   "type": "interactive",
//   "interactive": {
//       "type": "list",
//       "header": {
//           "type": "text",
//           "text": "<HEADER_TEXT>"
//       },
//       "body": {
//           "text": "<BODY_TEXT>"
//       },
//       "footer": {
//           "text": "<FOOTER_TEXT>"
//       },
//       "action": {
//           "button": "<BUTTON_TEXT>",
//           "sections": [
//               {
//                   "title": "<LIST_SECTION_1_TITLE>",
//                   "rows": [
//                       {
//                           "id": "<LIST_SECTION_1_ROW_1_ID>",
//                           "title": "<SECTION_1_ROW_1_TITLE>",
//                           "description": "<SECTION_1_ROW_1_DESC>"
//                       },
//                       {
//                           "id": "<LIST_SECTION_1_ROW_2_ID>",
//                           "title": "<SECTION_1_ROW_2_TITLE>",
//                           "description": "<SECTION_1_ROW_2_DESC>"
//                       }
//                   ]
//               },
//               {
//                   "title": "<LIST_SECTION_2_TITLE>",
//                   "rows": [
//                       {
//                           "id": "<LIST_SECTION_2_ROW_1_ID>",
//                           "title": "<SECTION_2_ROW_1_TITLE>",
//                           "description": "<SECTION_2_ROW_1_DESC>"
//                       },
//                       {
//                           "id": "<LIST_SECTION_2_ROW_2_ID>",
//                           "title": "<SECTION_2_ROW_2_TITLE>",
//                           "description": "<SECTION_2_ROW_2_DESC>"
//                       }
//                   ]
//               }
//           ]
//       }
//   }
// }
