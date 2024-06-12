
import { menuDb } from './menu.js';


const menu = [
  { id: 1, title: "Bryggkaffe", desc: "Bryggd på månadens bönor.", price: 39 },
  { id: 2, title: "Caffè Doppio", desc: "Bryggd på månadens bönor.", price: 49 },
  { id: 3, title: "Cappuccino", desc: "Bryggd på månadens bönor.", price: 49 },
  { id: 4, title: "Latte Macchiato", desc: "Bryggd på månadens bönor.", price: 49 },
  { id: 5, title: "Kaffe Latte", desc: "Bryggd på månadens bönor.", price: 54 },
  { id: 6, title: "Cortado", desc: "Bryggd på månadens bönor.", price: 39 }
];
//Skapa Meny-array

const initMenu = async () => {
  await menuDb.remove({}, { multi: true });
  await menuDb.insert(menu);
  console.log('Menu initialized');
};
//Funktionen initMenu rensar först alla befintliga poster i menuDb och lägger sedan till nya poster från menu. 

initMenu().catch(err => console.error(err));

