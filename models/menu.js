//Meny Nedb- databas

import Datastore from 'nedb-promise';

const menuDb = new Datastore({ filename: './menu.db', autoload: true });

export async function getMenu() {
  return menuDb.find({});
}

export async function addMenuItem(item) {
  return menuDb.insert(item);
}

export async function updateMenuItem(id, updates) {
  const updatedItem = await menuDb.update({ id: parseInt(id, 10) }, { $set: updates }, { returnUpdatedDocs: true });
  return updatedItem;
}

export async function deleteMenuItem(id) {
  const removedItem = await menuDb.remove({ id: parseInt(id, 10) });
  return removedItem > 0;  // Return true if an item was deleted
}
