import {JetView} from "webix-jet";

export default class TablesView extends JetView{
	config(){
		return {
			type:"space",
			rows:[{
					type:"wide", cols:[
						{ $subview:"tables.customers" }/*,
						{ $subview:"tables.films" }*/
					]
				},
				{
					type:"wide", cols:[
						{ $subview:"tables.phones" },
						{ $subview:"tables.emails" }
					]
				}
			]
		};
	}
}