import { Organizations } from "./modules/organization";

const io = require("socket.io-client");

class Auction {

  readonly socket;
  organizations?: Organizations;

  constructor() {
    this.socket = io("ws://localhost:8080");
  }

  private _isInitialized: boolean = false;

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  init(data: any) {
    this.organizations = new Organizations(data.participants);
    this._isInitialized = true;
  }
}

export const db = new Auction();
