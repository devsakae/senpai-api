const { senpaiMongoDb } = require("../utils/connections")

const getPremiumUsers = async () => {
  const premiumUsers = await senpaiMongoDb.collection('premium').find().toArray();
  return premiumUsers;
}

const getAllUsers = async () => {
  const allUsers = await senpaiMongoDb.collection('customers').find().toArray();
  return allUsers;
}

module.exports = {
  getPremiumUsers,
  getAllUsers,
}