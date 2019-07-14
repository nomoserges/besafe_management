import {JetView} from "webix-jet";

export default class NewCustomerPopup extends JetView {
	config(){
	
		return {
			view:"window",
			position:"center",
			modal:true,
			head: "New customer",
			body:{
				view:"form",
				localId:"form",
				elementsConfig:{ labelPosition:"top" },
				rows:[
					{ view: "text", label: "Tâche", name:"task", width:500 },
					{
						cols:[
							{
								view:"combo", label:"Projets",
								name:"project", options:[{ id:"transtar", value:"Transtar" },
								{ id:"kasma", value:"Kasma" },
								{ id:"typhon", value:"Typhon&Co" }]
							},
							{
								view:"combo", label:"Assignée à",
								name:"user", options:[{ id:"transtar", value:"Transtar" },
								{ id:"kasma", value:"Kasma" },
								{ id:"typhon", value:"Typhon&Co" }]
							}
						]
					},
					{
						cols:[
							{
								view:"button", value:"Annuler",
								click:() => this.getBack()
							},
							{
								view:"button", value:"Ajouter", type:"form",
								click:() => this.saveTask()
							}
						]
					}
				],
				rules:{
					user:webix.rules.isNotEmpty,
					task:webix.rules.isNotEmpty
				}
			}
		};
	}
	showWindow(){
		this.getRoot().show();
	}
	getBack(){
		this.getRoot().hide();
		this.$$("form").clear();
		this.$$("form").clearValidation();
	}
	saveTask(){
		const task = this.$$("form").getValues();
		if (this.$$("form").validate()){
			this.app.callEvent("add:task",[task]);
			this.getBack();
		}
	}
}