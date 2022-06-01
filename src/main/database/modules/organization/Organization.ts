export class Organization{

  name: string;
  id: string;
  image: string;
  description: string;

  constructor(organization: typeof Organization.prototype) {
    this.name = organization.name;
    this.id = organization.id;
    this.image = organization.image;
    this.description = organization.description
  }


}
