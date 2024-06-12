import Datastore from 'nedb-promise';
import bcrypt from 'bcrypt';

const usersDb = new Datastore({ filename: './users.db', autoload: true });
//Databas skapas för användare

const initializeAdmin = async () => {
  // Kontrollera om adminanvändaren redan finns för att undvika dubbletter
  const existingAdmin = await usersDb.findOne({ role: 'admin' });

  // Om adminanvändaren inte finns, skapas den:
  if (!existingAdmin) {
    const username = 'admin';
    const password = 'password'; 
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'admin';

    await usersDb.insert({ username, password: hashedPassword, role });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

initializeAdmin().catch(err => console.error(err));
// Om något går fel när initializeAdmin-funktionen körs loggas felet till konsolen.

export {usersDb};