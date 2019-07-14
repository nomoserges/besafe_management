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
                    view:"datatable", localId:"grid", id:"customerstable",
                    select:true, tooltip:true,
                    url: apiURL + "getcostumers",
                    headermenu:{
                        autowidth:false,
                        scroll:true
                    },
                    columns:[
                        { 
                            id:"userid", header:"id", headermenu:true
                        },{ 
                            id:"pseudo", header:"pseudo", sort:"text", adjust:"data",
                            fillspace:1, minWidth:100,
                        },{ 
                            id:"firstname", header:"First name", sort:"text", adjust:"data",
                            fillspace:1, minWidth:100,
                        },{ 
                            id:"lastname", header:"Last name", sort:"text", adjust:"data" 
                        },{ 
                            id:"dob", header:"Date of birth", sort:"text", format:webix.Date.dateToStr("%j %F")
                        },{ 
                            id:"gender", header:"Gender", sort:"text", adjust:"data" 
                        },{ 
                            id:"country", header:"Country", sort:"text", adjust:"data" 
                        },
                    ],
                    on:{
                        onHeaderClick:function(id, e, node){
                            if (e.target.className == "webix_button webixtype_base"){
                                NewCustomerPopup.showWindow();
                            }
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