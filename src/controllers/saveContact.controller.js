const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const { dispatchAxios } = require('../utils/sender');

const checkContact = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  if (
    contact.wa_id === process.env.BOT_ADMIN_WAID ||
    contact.wa_id === process.env.BOT_SUBADMIN_WAID
  ) {
    let data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: contact.wa_id,
      context: {
        message_id: payload.messages[0].id,
      },
      type: 'interactive',
      interactive: {
        type: 'list',
        header: {
          type: 'text',
          text: '<HEADER_TEXT>',
        },
        body: {
          text: '<BODY_TEXT>',
        },
        footer: {
          text: 'Acesse nosso site http://www.botdosenpai.com.br',
        },
        action: {
          button: '<BUTTON_TEXT>',
          sections: [
            {
              title: '<LIST_SECTION_1_TITLE>',
              rows: [
                {
                  id: '<LIST_SECTION_1_ROW_1_ID>',
                  title: '<SECTION_1_ROW_1_TITLE>',
                  description: '<SECTION_1_ROW_1_DESC>',
                },
                {
                  id: '<LIST_SECTION_1_ROW_2_ID>',
                  title: '<SECTION_1_ROW_2_TITLE>',
                  description: '<SECTION_1_ROW_2_DESC>',
                },
              ],
            },
            {
              title: '<LIST_SECTION_2_TITLE>',
              rows: [
                {
                  id: '<LIST_SECTION_2_ROW_1_ID>',
                  title: '<SECTION_2_ROW_1_TITLE>',
                  description: '<SECTION_2_ROW_1_DESC>',
                },
                {
                  id: '<LIST_SECTION_2_ROW_2_ID>',
                  title: '<SECTION_2_ROW_2_TITLE>',
                  description: '<SECTION_2_ROW_2_DESC>',
                },
              ],
            },
          ],
        },
      },
    };
    return await dispatchAxios(data)
      .then((res) => console.log('ok', res))
      .catch((err) => console.error('erro', err));
  }

  const sender = await senpaiMongoDb
    .collection('customers')
    .findOne({ wa_id: contact.wa_id });
  if (!sender) {
    console.info('primeiro contato do usuário!');
    await senpaiMongoDb
      .collection('customers')
      .insertOne({
        wa_id: contact.wa_id,
        name: contact?.profile?.name,
        contact: contact,
        first_contact: new Date(),
      })
      .then((response) => {
        if (!response.acknowledged)
          throw new Error({
            message: 'Erro criando usuário no MongoDB',
            code: 500,
          });
      })
      .catch((err) => console.error(err.code))
      .finally(() => message_hello(req));
  }
};

module.exports = {
  checkContact,
};
