import { Organization } from "./Organization";

export class Organizations {

  readonly orgs = new Map<string, Organization>();
  private _winners: string[] = [];

  constructor(orgs: typeof Organizations.prototype) {
    this.orgs = this.convert(orgs as unknown as { [id: string]: typeof Organization.prototype });
  }


  set winners(value: string[]) {
    this._winners = value;
  }

  get winners(): string[] {
    return this._winners;
  }

  convert(orgObj: { [id: string]: typeof Organization.prototype }): Map<string, Organization> {
    const entries: Array<any> = Object.entries(orgObj)
      .map(i => [i[0], new Organization(i[1])]);
    return new Map(entries);
  }

}
