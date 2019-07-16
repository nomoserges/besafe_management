import {JetView} from "webix-jet";
import {apiURL} from "../../globals";

export default class EmailsView extends JetView {
    config() {
        return {
            rows:[
                {
                    id: "emailsform", localId: "emailsform",
                    view:"form",
                    elements: [{
                        cols:[
                            { view:"text", name:"u_email", label:"Email"},
                            { view: "text", name: "userid", label: "UserID", hidden: true },
                                { view: "button", width: 100, label: "Save", type: "form", click: () => this.saveForm() },
                            { view:"button", width: 100, label:"Clear", click:"$$('emailsform').clear();" }
                        ], rules: {
                        "u_email": webix.rules.isEmail
                        }
                    }]
                },{
                    view: "datatable", localId:"emailstable", id:"emailstable",
                    select:true, tooltip:true,
                    url: apiURL + "getemails/",
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
                            id:"email", header:"Email", sort:"text",fillspace:true
                        }
                    ]
                }
            ]
        }
    };

    saveForm() {
        const emailForm = this.$$("emailsform").getValues();
        if (this.$$("emailsform").validate()) {
            webix.ajax(apiURL + "addemail/", emailForm).then(function (data) {
                //console.log(data.json());
                if (data.json().data.msgType == "success") {
                    webix.message(data.json().data.msgBody);
                }
                $$("emailstable").load($$("emailstable").config.url);
            });
        }
        $$("emailstable").loadNext(-1, 0);
    }

    init(view){
        
    }
}