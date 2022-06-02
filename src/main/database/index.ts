import { Organizations } from "./modules/organization";

const io = require("socket.io-client");

class Auction {

  readonly socket;
  organizations?: Organizations;
  private _isInitialized: boolean = false;

  constructor() {
    this.socket = io("ws://localhost:8080");
  }

  init(data: any) {
    this.organizations = new Organizations(data.participants);
    this._isInitialized = true;
  }


  get isInitialized(): boolean {
    return this._isInitialized;
  }
}

export const db = new Auction();
