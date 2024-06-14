//Middleware för att säkerställa att användaren är admin och inloggade innan de får tillgång till vissa skyddade resurser och funktionernpm s

import { usersDb } from "../utils/createAdmin.js";

export async function requireAdmin(req, res, next) {
  // Kontrollera om det finns en användarsession
  if (!req.session || !req.session.user) {
    return res
      .status(401)
      .json({ message: "Access denied. No user session found." });
  }

  // Kontrollera om användarens roll är 'admin'
  if (req.session.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. User is not an admin." });
  }

  // Hämta användaren från databasen
  const user = await usersDb.findOne({ _id: req.session.user._id });
  if (!user) {
    return res
      .status(403)
      .json({ message: "Access denied. User not found in database." });
  }

  next();
}
