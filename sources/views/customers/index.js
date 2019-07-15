import {JetView} from "webix-jet";
import NewCustomerPopup from "../forms/customer";

export default class CustomersView extends JetView{
	config(){
		return {
			type:"space",
			rows:[{
					type:"wide", cols:[
						/*{ 
							view: "button",
							type: "form",
							label:"fdsf",
							autowidth: true,
							inputHeight: 40,
							batch: "default",
							click: () => this.newtask.showWindow()
						},*/
						{ $subview:"tables.customers" },
						{ $subview:"forms.customer" }
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
	
	init(){
		this.newtask = this.ui(NewCustomerPopup);
		
	}
}