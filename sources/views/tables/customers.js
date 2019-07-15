import {JetView} from "webix-jet";
import {apiURL} from "../../globals";
import NewCustomerPopup from "../forms/customer";

export default class CustomersView extends JetView {
    config() {
        return {
            rows:[
                {
                    view:"toolbar",height:38,
                    cols:[{
                            view: "button",
							type: "form",
							label:"New customer",
							autowidth: true,
							inputHeight: 40,
							batch: "default",
							click: () => this.newcustomer.showWindow()
                        }
                    ]
                }, {
                    view: "datatable", localId:"customerstable", id:"customerstable",
                    select: true, tooltip: true, resizeColumn: true, resizeRow: false,
                    url: apiURL + "getcostumers",
                    headermenu:{
                        autowidth:true,
                        scroll:true
                    },
                    columns:[
                        { 
                            id: "userid", header: "id", hidden: true
                        },/*{ 
                            id:"pseudo", header:"pseudo", sort:"text", adjust:"data",
                            fillspace:1, minWidth:100,
                        },*/{ 
                            id: "firstname", header: ["First name", { content: "textFilter" }], sort:"string", adjust:"data",
                            fillspace: true,width: 200
                        },{ 
                            id: "lastname", header: ["Last name", { content: "textFilter" }], sort: "string", adjust: "data", fillspace: true 
                        },{ 
                            id: "dob", header: "Date of birth", sort: "string", format: webix.Date.dateToStr("%j %F %Y"), fillspace: true
                        },{ 
                            id: "gender", header: ["Gender", { content: "selectFilter" }], sort: "string", adjust: "data", fillspace: true
                        },{ 
                            id: "country", header: "Country", sort: "string", adjust: "data", fillspace: true 
                        }, {
                            id: "town", header: "Town", sort: "string", adjust: "data", fillspace: true
                        }, {
                            id: "place", header: "Place", sort: "string", adjust: "data", fillspace: true
                        }, {
                            id: "job_title", header: "Job", sort: "string", adjust: "data", fillspace: true
                        },
                    ],
                    on:{
                        onAfterSelect: userid => {
                            $$("emailstable").bind($$("customerstable"), function (obj, filter) {
                                $$('emailsform').setValues({ userid: filter.userid});
                                return obj.userid == filter.userid;
                            });
                            $$("phonestable").bind($$("customerstable"), function (obj, filter) {
                                $$('phonesform').setValues({ userid: filter.userid });
                                return obj.userid == filter.userid;
                            });
                        }
                    }
                }
            ]
        }
    };


    init(view){
        this.newcustomer = this.ui(NewCustomerPopup);
    }
}