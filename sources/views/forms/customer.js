import {JetView} from "webix-jet";
import {apiURL} from "../../globals"

export default class NewCustomerPopup extends JetView {
	config(){
		const dateFormat = webix.Date.dateToStr("%d/%m/%Y");
		return {
			view:"window",
			position:"center",
			modal:true,
			head: "New customer",
			body:{
				view:"form",
				id: "form",
				localId:"form",
				elementsConfig:{ labelPosition:"top" },
				rows:[
					{
						cols: [
							{ view: "text", label: "Firstname", name: "u_firstname", width: 200 },
							{ view: "text", label: "Lastname", name: "u_lastname", width: 200 },
						]
					},{
						cols:[
							{
								view: "combo", label: "Gender", width: 200,
								name:"u_gender", options:[
									{ id:"female", value:"female" },
									{ id:"male", value:"male" }]
							},
							{ view: "datepicker", label: "Date of birth", name: "u_dob",
								placeholder: "Click to select", format: dateFormat, width: 200 },
						]
					},{
						cols: [
							{ view: "text", label: "Country", name: "u_country", width: 200 },
							{ view: "text", label: "Town", name: "u_town", width: 200 },
						]
					}, {
						cols: [
							{ view: "text", label: "Place", name: "u_place", width: 200 },
							{ view: "text", label: "Job title", name: "u_job_title", width: 200 },
						]
					},
					{
						cols:[
							{
								view:"button", value:"Cancel",
								click:() => this.getBack()
							},
							{
								view:"button", value:"Save", type:"form",
								click:() => this.saveTask()
							}
						]
					}
				],
				rules:{
					u_firstname:webix.rules.isNotEmpty,
					u_lastname:webix.rules.isNotEmpty,
					u_gender: webix.rules.isNotEmpty,
					u_dob: webix.rules.isNotEmpty,
					u_country: webix.rules.isNotEmpty,
					u_town: webix.rules.isNotEmpty,
					u_place: webix.rules.isNotEmpty,
					u_job_title: webix.rules.isNotEmpty
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
			webix.ajax(apiURL + "newcostumer/", task).then(function (data) {
				//console.log(data.json());
				if (data.json().data.msgType == "success") {
					webix.message(data.json().data.msgBody);
				}
			});
			this.getBack();
		}
		$$("customerstable").loadNext(-1, 0);
	}
}