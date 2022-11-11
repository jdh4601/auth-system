const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

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
  console.log({ email, username, tel, password });
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
