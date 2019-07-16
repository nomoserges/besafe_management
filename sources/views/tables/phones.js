import {JetView} from "webix-jet";
import {apiURL} from "../../globals";

export default class PhonesView extends JetView {
    
    config() {
        return {
            rows:[
                { 
                    id: "phonesform", localId: "phonesform",
                    view:"form",
                    elements: [{
                        cols:[
                            { view:"text", name:"u_phone_number", label:"Phone"},
                            { view: "text", name: "userid", label: "UserID", hidden: true },
                            { view: "button", width: 100, label: "Save", type: "form", click: () => this.saveForm() },
                            { view:"button", width: 100, label:"Clear", click:"$$('phonesform').clear();" }
                        ]
                    }]
                },{ 
                    view: "datatable", localId:"phonestable", id:"phonestable",container:"box",
                    select:true, tooltip:true,
                    url: apiURL + "getphones/",
                    headermenu:{
                        autowidth:false,
                        scroll:true
                    },
                    columns:[
                        { 
                            id:"id", header:"id", width:50
                        },{ 
                            id: "userid", header:"userid", sort:"text", adjust:"data",
                            fillspace: 1, minWidth: 100, hidden: true
                        },{ 
                            id:"firstname", header:"First name", sort:"text", adjust:"data",
                            fillspace:1, minWidth:100,
                        },{ 
                            id:"lastname", header:"Last name", sort:"text", adjust:"data" 
                        },{ 
                            id:"phone_number", header:"Phone number", sort:"text", fillspace:true
                        }
                    ]
                }
              ]


            
        }
    };

    saveForm() {
        const phonesForm = this.$$("phonesform").getValues();
        if (this.$$("phonesform").validate()) {
            webix.ajax(apiURL + "addphone/", phonesForm).then(function (data) {
                //console.log(data.json());
                if (data.json().data.msgType == "success") {
                    webix.message(data.json().data.msgBody);
                }
            });
        }
        $$("phonestable").loadNext(-1, 0);
    }

    init(view){
        
    }
}