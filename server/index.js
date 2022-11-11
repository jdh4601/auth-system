// two-factor authentication
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const { Novu } = require('@novu/node');
const novu = new Novu('ee0239fd73dbdcc8f99c1c13f0afe5a0');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello world' });
});

// containing all users
const users = [];
// random id
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post('/api/register', (req, res) => {
  // Get the user's credentials
  const { email, username, tel, password } = req.body;
  let result = users.filter(user => user.email === email || user.tel === tel);
  // if user data none
  if (result.length === 0) {
    const newUser = { id: generateID(), email, username, password, tel };
    users.push(newUser);
    return res.json({
      message: 'Account created successfully!',
    });
  }
  // if user data exists
  res.json({
    error_message: 'User already exists.',
  });
});

let code;

app.post('/api/login', (req, res) => {
  // Accept user's credentials
  const { email, password } = req.body;
  let result = users.filter(
    user => user.email === email || user.password === password
  );
  if (result.length !== 1) {
    return res.json({
      error_message: 'Incorrect credentials!',
    });
  }

  code = generateCode();

  sendNovuNotification(result[0].tel, code);

  res.json({
    message: 'Login successfully!',
    data: {
      username: result[0].username,
    },
  });
});

app.post('/api/verification', (req, res) => {
  if (code === req.body.code) {
    return res.json({ message: "You're verified successfully" });
  }
  res.json({
    error_message: 'Incorrect credentials',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Generate the code to be sent via SMS
const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
  try {
    let response = await novu.trigger('636dc9d6d5ec781ad7604bbf', {
      to: {
        subscriberId: recipient,
        phone: recipient,
      },
      payload: {
        code: verificationCode,
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
};
