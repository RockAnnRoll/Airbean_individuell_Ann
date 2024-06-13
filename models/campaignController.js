
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
