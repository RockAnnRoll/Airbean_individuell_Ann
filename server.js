//För att starta express-servern
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import adminRoutes from './routes/admin.js';
import bcrypt from 'bcrypt';
import { usersDb } from './utils/createAdmin.js';



const app = express();
//const usersDb = new Datastore({ filename: path.join(__dirname, 'users.db'), autoload: true });



app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Logga in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await usersDb.findOne({ username });

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid credentials');
  }

  req.session.user = user;
  res.send('Logged in');
});

// Logga ut
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out.');
    } else {
      res.send('Logged out');
    }
  });
});

//Kontrollera att användare är inloggad
app.get('/check-login', (req, res) => {
  if (req.session.user) {
    res.send(`Logged in as ${req.session.user.username}`);
  } else {
    res.send('Not logged in');
  }
});

app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Exportera usersDb så att den kan användas i andra filer
export { app };

