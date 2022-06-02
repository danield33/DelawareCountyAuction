export class Organization {

  name: string;
  id: string;
  description: string;

  constructor(organization: typeof Organization.prototype) {
    this.name = organization.name;
    this.id = organization.id;
    this.description = organization.description;
  }


  async getImage() {
    return await fetch("http://localhost:8080/images?id=" + this.id, { mode: "cors" }).then(async (res) => {
      return await res.json();
    });
  }

}
