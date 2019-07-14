import {JetView} from "webix-jet";
import {apiURL} from "../../globals";

export default class EmailsView extends JetView {
    config() {
        return {
            rows:[
                { id: "emailsform",
                  view:"form",
                  elements: [{
                    cols:[
                        { view:"text", name:"email", label:"Email"},
                        { view:"button", width: 100, label:"Save" , type:"form", click:"$$('emailsform').save()" },
                        { view:"button", width: 100, label:"Clear", click:"$$('emailsform').clear();" }
                    ]
                  }]
                },{
                    view:"datatable", localId:"grid", id:"customerstable",
                    select:true, tooltip:true,
                    url: apiURL + "getemails/",
                    headermenu:{
                        autowidth:false,
                        scroll:true
                    },
                    columns:[
                        { 
                            id:"id", header:"id", width:50
                        },/*{ 
                            id:"pseudo", header:"pseudo", sort:"text", adjust:"data",
                            fillspace:1, minWidth:100,
                        },*/{ 
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


    init(view){
        
    }
}