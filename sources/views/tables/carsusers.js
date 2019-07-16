import { JetView } from "webix-jet";
import { apiURL } from "../../globals";
//import NewCustomerPopup from "../forms/customer";

export default class CarsusersView extends JetView {
    config() {
        return {
            rows: [
                {
                    id: "carsusersForm", localId: "carsusersForm",
                    view: "form", elementsConfig: { labelPosition: "top" },
                    elements: [{
                        cols: [
                            { view: "text", name: "v_reference", label: "Reference", hidden: true },
                            {
                                view: "combo", label: "UserID", 
                                name: "userid", options: [
                                    { id: "female", value: "female" },
                                    { id: "male", value: "male" }]
                            },{
                                view: "combo", label: "User type",
                                name: "v_type_relation",
                                options: {
                                    keyPressTimeout: 500,
                                    body: {
                                        dataFeed:function(str){
                                        if(!str.match(/\w/g))
                                            return;
                                            return webix.ajax().bind(this).get(apiURL +"?filter[value]="+str, function(data){
                                            this.parse(data);
                                        });
                                        },  
                                        url:apiURL, 
                                        ready: function (){  
                                        $$("combo").setValue(this.data.getFirstId())
                                        }
                                    }
                                }
                            },
                            { view: "text", name: "v_type_owner", label: "Owner type" },
                            { view: "text", name: "v_num_driver", label: "Driver ID"},
                            /*{
                                view: "datepicker", label: "Start wit car", name: "v_start_date",
                                placeholder: "Click to select", format: dateFormat
                            },*/
                            { view: "button", width: 100, label: "Save", type: "form", click: () => this.saveForm() },
                            { view: "button", width: 100, label: "Clear", click: "$$('carsusersForm').clear();" }
                        ],
                        rules: {
                            "v_num_driver": webix.rules.isEmail
                        }
                    }]
                }, {
                    view: "datatable", localId: "carusersTables", id: "carusersTables",
                    select: true, tooltip: true, resizeColumn: true, resizeRow: false,
                    //url: apiURL + "getcostumers",
                    headermenu: {
                        autowidth: true,
                        scroll: true
                    }, columns: [
                        {
                            id: "id", header: "id", hidden: true
                        }, {
                            id: "refernce", header: "Reference", hidden: true
                        },{
                            id: "userid", header: "Userid", sort: "string",hidden: true
                        }, {
                            id: "type_relation", header: ["Customer's type", { content: "selectFilter" }], sort: "string", adjust: "data", fillspace: true
                        }, {
                            id: "type_owner", header: ["Type owner", { content: "selectFilter" }], sort: "string", fillspace: true
                        }, {
                            id: "num_driver", header: "Driver badge", sort: "string", adjust: "data", fillspace: true
                        }, {
                            id: "start_date", header: "Start with car", sort: "string", adjust: "data", fillspace: true
                        }
                    ], on: {
                        onAfterSelect: userid => {
                            
                        }
                    }
                }
            ]
        }
    };

    saveForm() {
        const carsusersForm = this.$$("carsusersForm").getValues();
        if (this.$$("carsusersForm").validate()) {
            webix.ajax(apiURL + "addemail/", carsusersForm).then(function (data) {
                //console.log(data.json());
                if (data.json().data.msgType == "success") {
                    webix.message(data.json().data.msgBody);
                }
                $$("emailstable").load($$("emailstable").config.url);
            });
        }
    }
    
    init(view) {
        //this.newcustomer = this.ui(NewCustomerPopup);
    }
}