import {PORT} from "../../../constants";

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
        return await fetch(PORT + "/images?id=" + this.id, {mode: "cors", cache:'reload'}).then(async (res) => {
            return await res.json()+"&t="+Date.now();
        });
    }

}
