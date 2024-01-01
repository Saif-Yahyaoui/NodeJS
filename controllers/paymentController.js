import axios from 'axios';
import Payment from '../models/payment.js';

export const initiatePayment = async (req, res) => {
  const flouciUrl = 'https://developers.flouci.com/api/generate_payment';
  const payload = {
    app_token: 'c36b4953-9fa5-4f32-bfcd-8f107a9042d5',
    app_secret: '2a190eec-89b8-4714-8797-ba83e334c33c',
    amount: req.body.amount *1000,
    accept_card: 'true',
    session_timeout_secs: 1200,
    success_link: 'http://192.168.100.117:5005/success',
    fail_link: 'http://192.168.100.117:5005/fail',
    developer_tracking_id: '322e6198-6a3a-4970-8def-925a5eef5fc1',
  };

  await axios
  .post(flouciUrl, payload)
  .then(result => {
    res.send(result.data)
  })
.catch(err => console.error(err));
}

export const verifyPayment = async (req, res) => {
    const id_payment = req.params.id;
    await axios.get (
        `https://developers.flouci.com/api/verify_payment/${id_payment}`, {
        headers: {
            'Content-Type': 'application/json',
          'apppublic': 'c36b4953-9fa5-4f32-bfcd-8f107a9042d5',
          'appsecret': '2a190eec-89b8-4714-8797-ba83e334c33c',
        }
      })
      .then((result) => {
        res.send(result.data);
      })
  .catch((err) => {
    console.log(err.message);
  });
}

     