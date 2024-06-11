//middleware för att säkerställa att användaren är admin

import { usersDb } from "../utils/createAdmin.js";
//import Datastore from 'nedb-promise';

export async function requireAdmin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('Access denied. No user session found.');
  }

  const user = await usersDb.findOne({ _id: req.session.user._id });
  if (!user || user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }

  next();
}

