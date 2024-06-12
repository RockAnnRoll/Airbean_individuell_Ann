
import Datastore from 'nedb-promise';

const campaignDb = new Datastore({ filename: './campaign.db', autoload: true });

export async function addCampaign(campaign) {
  return campaignDb.insert(campaign);
}

export async function getCampaigns() {
  return campaignDb.find({});
}

export async function getCampaign(id) {
  return campaignDb.findOne({ _id: id });
}

export async function deleteCampaign(id) {
  return campaignDb.remove({ _id: id });
}
