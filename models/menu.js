//Controllers? Johan

import Datastore from 'nedb-promise';

const menuDb = new Datastore({ filename: './menu.db', autoload: true });
// Ny databas skapas för meny 

export { menuDb };

//Funktion för att hämta alla menyobjekt
export async function getMenu() {
  return menuDb.find({});
}

//Funktion för att hämta ett menyobjekt baserat på ID
export async function getMenuItemById(id) {
  return menuDb.findOne({ id: parseInt(id, 10) });
}

//Funktion för att lägga till ett nytt menyobjekt. Skapelsedatum (createdAt)läggs till. 
export async function addMenuItem(item) {
  item.createdAt = new Date(); 
  return menuDb.insert(item);
}

//Funktion för att uppdatera ett menyobjekt. Modifieringsdatum (modifiedAt)läggs till.
export async function updateMenuItem(id, updates) {
 
  updates.modifiedAt = new Date();

  const updatedItem = await menuDb.update(
    { id: parseInt(id, 10) },
    { $set: updates },
    { returnUpdatedDocs: true }
  );

  const [numAffected, item] = updatedItem;

  if (numAffected === 0) {
    throw new Error('Product not found');
  }
  return item;
}


// Funktion som tar bort ett menyobjekt baserat på id.
export async function deleteMenuItem(id) {
  const removedItem = await menuDb.remove({ id: parseInt(id, 10) });
  return removedItem > 0;  
}

