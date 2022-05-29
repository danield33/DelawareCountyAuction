import { Organizations } from "./modules/organization";

const data = require('./MockData.json');

class Auction{

  organizations: Organizations

  constructor() {
    this.organizations = new Organizations(data.participates)
  }

}

export const db = new Auction();
