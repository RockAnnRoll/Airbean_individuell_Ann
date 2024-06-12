//Rutthanterare för admins funktionaliteter

import express from 'express';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../models/menuController.js';
import { requireAdmin } from '../middleware/auth.js';
import { addCampaign, getCampaigns, getCampaign, deleteCampaign } from '../models/campaign.js';


const router = express.Router();
//Skapa en router

/******************* GET/menu - HÄMTAR HELA MENYN ************************** */


router.get('/menu', requireAdmin, async (req, res) => {
  const menu = await getMenu();
  res.json(menu);
});
//Endast administratörer kan komma åt denna route->requiereAdmin. Likaså för post, put och delete. 


/******************* POST/menu - LÄGGA TILL PRODUKT ************************** */

router.post('/menu', requireAdmin, async (req, res) => {
  const { id, title, desc, price } = req.body;

  if (!id || !title || !desc || !price) {
    return res.status(400).send('All fields (id, title, desc, price) are required');
  }
  const newItem = { id, title, desc, price, createdAt: new Date().toISOString() };
  const addedItem = await addMenuItem(newItem);
  res.status(201).json({ message: 'Product added successfully', newItem });
});
// Validerar att alla nödvändiga fält id, title, desc, price finns i req.body
// addMenuItem funktionen används för att lägga till den nya artikeln

/**************** PUT /menu/:id - UPPDATERAR EN BEFINTLIG PRODUKT ***************************** */

router.put('/menu/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  updates.modifiedAt = new Date().toISOString();

  try {
    const updatedItem = await updateMenuItem(id, updates);
    res.json({
      message: 'Product updated successfully',
      item: updatedItem
    });
  } catch (error) {
    if (error.message === 'Product not found') {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});
//Uppdateringar tas emot från req.body och lägger till ett modifiedAt fält med nuvarande tid.
//updateMenuItem funktionen används för att uppdatera artikeln med specificerat id och de nya uppdateringarna.

/******************DELETE /menu/:id - TA BORT EN ARTIKEL FRÅN MENYN *************************** */

router.delete('/menu/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const deletedItem = await deleteMenuItem(id);
  if (deletedItem) {
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).send('Item not found');
  }
});
//deleteMenuItem används funktionen för att ta bort artikeln med specificerat id.

/******************POST /campaign - LÄGGA TILL KAMPANJ ************************* */

router.post('/campaign', requireAdmin, async (req, res) => {
  const { products, price } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0 || !price) {
    return res.status(400).send('Products (array) and price are required');
  }
  // Validera att alla produkter som anges i kampanjen finns i menyn genom att jämföra deras id med de id som finns i menyn.
  const menu = await getMenu();
  const menuIds = menu.map(item => item.id);
  const invalidProducts = products.filter(product => !menuIds.includes(product));

  if (invalidProducts.length > 0) {
    return res.status(400).send(`The following products do not exist in the menu: ${invalidProducts.join(', ')}`);
  }

  const newCampaign = { products, price, createdAt: new Date().toISOString() };
  const addedCampaign = await addCampaign(newCampaign);
  res.status(201).json({ message: 'Campaign added successfully', addedCampaign });
});

/***************** GET /campaigns - SE ALLA KAMPANJER **************************** */ 

router.get('/campaigns', requireAdmin, async (req, res) => {
  const campaigns = await getCampaigns();
  res.json(campaigns);
});

export default router;
