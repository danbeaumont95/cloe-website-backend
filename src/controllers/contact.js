const { default: axios } = require('axios');

exports.sendEmailToCloeHandler = async (req, res) => {
  const respBody = {
    success: false,
    message: '',
    data: {},
  };
  try {
    const { subject, text, userEmail } = req.body;
    const emailToSend = {
      sender: {
        name: 'Website user',
        email: `${process.env.verifiedEmail}`,
      },
      to: [
        {
          email: `${process.env.emailAddressTo}`,
          name: 'Cloe Roper Website',
        },
      ],
      subject,
      htmlContent: `<html><head></head><body><h3>Email from:${userEmail}</h3><p>${text}</p></body></html>`,
    };
    const email = await axios.post('https://api.sendinblue.com/v3/smtp/email', emailToSend, {
      headers: {
        'api-key': process.env.sendinblueapikey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });

    if (!email) {
      respBody.message = '[BadRequest] Error sending email';
      return res.status(200).json(respBody);
    }
    respBody.success = true;
    respBody.message = '[Success] Email sent!';
  } catch (error) {
    respBody.message = error;
    return res.status(400).json(respBody);
  }
  return res.status(200).json(respBody);
};
