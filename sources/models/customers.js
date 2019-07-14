import {apiURL} from "../globals";

export const customersmodel = new webix.DataCollection({
	url: apiURL + "getcostumers"
});