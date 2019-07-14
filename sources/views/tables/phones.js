import {JetView} from "webix-jet";
import {apiURL} from "../../globals";

export default class PhonesView extends JetView {
    
    config() {
        return {
            rows:[
                { id: "phonesform",
                  view:"form",
                  elements: [{
                    cols:[
                        { view:"text", name:"phone_number", label:"Phoner"},
                        { view:"button", width: 100, label:"Save" , type:"form", click:"$$('phonesform').save()" },
                        { view:"button", width: 100, label:"Clear", click:"$$('phonesform').clear();" }
                    ]
                  }]
                },{ 
                    view:"datatable", localId:"grid", id:"customerstable",container:"box",
                    select:true, tooltip:true,
                    url: apiURL + "getphones/",
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
                            id:"phone_number", header:"Phone number", sort:"text", fillspace:true
                        }
                    ]
                }
              ]


            
        }
    };


    init(view){
        
    }
}