import Datastore from 'nedb-promise';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const initAdmin = async () => {
  const username = 'admin';
  const password = 'admin'; // Byt detta till ett säkrare lösenord
  const role = 'admin';

  const existingUser = await usersDb.findOne({ username });
  if (existingUser) {
    console.log('Admin user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await usersDb.insert({ username, password: hashedPassword, role });
  console.log('Admin user initialized');
};

initAdmin().catch(err => console.error(err));
