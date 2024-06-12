
import Datastore from 'nedb-promise';

const campaignDb = new Datastore({ filename: './campaign.db', autoload: true });
//En ny databas skapas för kampanjer

//Lägga till en kampanj
export async function addCampaign(campaign) {
  return campaignDb.insert(campaign);
}

//Hämta alla kampanjer
export async function getCampaigns() {
  return campaignDb.find({});
}

//Hämta en specifik kampanj
export async function getCampaign(id) {
  return campaignDb.findOne({ _id: id });
}

//Ta bort en kampanj
export async function deleteCampaign(id) {
  return campaignDb.remove({ _id: id });
}
