import { Organizations } from "./modules/organization";

const data = require('./MockData.json');

class db{

  organizations: Organizations

  constructor() {
    this.organizations = new Organizations(data.participates)
  }

}

export default new db();
