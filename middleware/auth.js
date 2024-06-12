//Middleware för att säkerställa att användaren är admin innan de får tillgång till vissa skyddade resurser

import { usersDb } from "../utils/createAdmin.js";


export async function requireAdmin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('Access denied. No user session found.');
  }
  // Kontrollerar om det finns en användarsession 
 

  const user = await usersDb.findOne({ _id: req.session.user._id });
  // Användare hämtas från databasen 

  if (!user || user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }
  //Om användaren inte finns eller om användarens roll inte är 'admin' skickas ett felmeddelande. 

  next();
}

