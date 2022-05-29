export class Organization{

  name: string;
  id: string;
  image: string;

  constructor(organization: typeof Organization.prototype) {
    this.name = organization.name;
    this.id = organization.id;
    this.image = organization.image;
  }



}
