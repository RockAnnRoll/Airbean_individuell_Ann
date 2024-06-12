import Datastore from 'nedb-promise';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuDb = new Datastore({ filename: path.join(__dirname, 'menu.db'), autoload: true });

const menu = [
  { id: 1, title: "Bryggkaffe", desc: "Bryggd på månadens bönor.", price: 39 },
  { id: 2, title: "Caffè Doppio", desc: "Bryggd på månadens bönor.", price: 49 },
  { id: 3, title: "Cappuccino", desc: "Bryggd på månadens bönor.", price: 49 },
  { id: 4, title: "Latte Macchiato", desc: "Bryggd på månadens bönor.", price: 49 },
  { id: 5, title: "Kaffe Latte", desc: "Bryggd på månadens bönor.", price: 54 },
  { id: 6, title: "Cortado", desc: "Bryggd på månadens bönor.", price: 39 }
];

const initMenu = async () => {
  await menuDb.remove({}, { multi: true });
  await menuDb.insert(menu);
  console.log('Menu initialized');
};

initMenu().catch(err => console.error(err));