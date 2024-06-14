import Datastore from "nedb-promise";
import bcrypt from "bcrypt";

const usersDb = new Datastore({ filename: "./users.db", autoload: true });
//Databas skapas för användare

const initializeAdmin = async () => {
  const username = "admin";
  const password = "password";
  const role = "admin";

  // Kontrollera om en användare med rollen "admin" redan finns
  const existingAdmin = await usersDb.findOne({ role });
  // Om adminanvändaren inte finns, skapas den:
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await usersDb.insert({ username, password: hashedPassword, role });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }
};

// Kör funktionen och hantera eventuella fel
initializeAdmin().catch((err) => console.error(err));

export { usersDb };
