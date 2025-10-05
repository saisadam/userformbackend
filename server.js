const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection (replace <username>, <password>, <dbname>)

const uri = 'mongodb+srv://sai_sadam:<Tillu@143>@saisadam.2uir4bc.mongodb.net/?retryWrites=true&w=majority&appName=saisadam' ;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// POST API to store user
app.post('/add-user', (req, res) => {
  const { name, gender } = req.body;

  const newUser = new User({ name, gender });
  newUser.save()
    .then(() => res.json({ message: "User stored successfully ✅" }))
    .catch(err => res.status(500).json({ error: err }));
});

// Optional: GET API to list all users
app.get('/users', (req, res) => {
  User.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err }));
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
