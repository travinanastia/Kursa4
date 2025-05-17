/** @format */
const crypto = require('crypto');

const LiqPay = require('../lib/liqpay');
const Mongoose = require('mongoose');
const User = require('../models/userModel');
const liqPay = new LiqPay(process.env.LIQPAY_PUBLIC, process.env.LIQPAY_PRIVATE);

const PAYMENTS_RESULTS = {
  success: 'success',
  failed: 'failed',
};

const generateLiqPayForm = async (req, res, next) => {
  const id = req.params.id;

  const ObjectId = Mongoose.Types.ObjectId;
  const user = await User.findOne({ _id: new ObjectId(id) });

  console.log(user);
  if (!user) {
    return res.send('');
  }

  if (user.subscribed) {
    return res.send('Subscribed already');
  }

  const params = {
    action: 'payment_prepare',
    amount: 5,
    currency: 'USD',
    description: 'description text',
    order_id: `sub_${id}_${Date.now()}`,
    version: 3,
    language: 'en',
    result_url: 'http://localhost:5173/',
    server_url: 'https://0cbb-2a02-a31c-29f-4d80-5828-2422-42da-59fb.ngrok-free.app/api/subscription/callback',
  };

  try {
    const apiResponse = await liqPay.api('request', params);
    return res.send({ apiResponse });
  } catch (error) {}
};

const liqPayCallback = async (req, res) => {
  const { data, signature } = req.body;

  if (!isValidLiqPaySignature(data, signature, process.env.LIQPAY_PRIVATE)) {
    return res.status(403).send('Invalid signature');
  }

  const decoded = Buffer.from(data, 'base64').toString('utf8');
  const paymentInfo = JSON.parse(decoded);

  if (paymentInfo.status === PAYMENTS_RESULTS.success) {
    const orderId = paymentInfo.order_id;
    console.log(orderId);

    const userId = orderId.split('_')[1];
    console.log(userId);

    await grantSubscription(userId);
  }

  res.sendStatus(200);
};

module.exports = { generateLiqPayForm, liqPayCallback };

function isValidLiqPaySignature(data, signature, privateKey) {
  const expectedSignature = crypto
    .createHash('sha1')
    .update(privateKey + data + privateKey)
    .digest('base64');

  return signature === expectedSignature;
}

const grantSubscription = async (id) => {
  const ObjectId = Mongoose.Types.ObjectId;
  const user = await User.findOne({ _id: new ObjectId(id) });

  user.subscribed = true;

  await user.save();
};
