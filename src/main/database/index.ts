import { Organizations } from "./modules/organization";

const data = require('./MockData.json');
const io = require('socket.io-client');

class Auction{

  readonly organizations: Organizations
  readonly socket;

  constructor() {
    this.socket = io('ws://localhost:8080');
    this.organizations = new Organizations(data.participates)
  }

}

export const db = new Auction();
