const { MERCADOPAGO_APPID } = process.env;

const checkOrderSig = async (req) => {
  if (req.body.application_id === MERCADOPAGO_APPID) {
    
  }
}

module.exports = {
  checkOrderSig
}