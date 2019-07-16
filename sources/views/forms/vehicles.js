import { JetView } from "webix-jet";
import { apiURL } from "../../globals"

export default class NewVehiclePopup extends JetView {
    config() {
        const dateFormat = webix.Date.dateToStr("%d/%m/%Y");
        return {
            view: "window",
            position: "center",
            modal: true,
            head: "New vehicle",
            body: {
                view: "form",
                id: "vehicleForm",
                localId: "vehicleForm",
                elementsConfig: { labelPosition: "top" },
                rows: [
                    {
                        cols: [
                            { view: "text", label: "Reference", name: "v_reference", width: 200 },
                            { view: "text", label: "Mark", name: "v_mark", width: 200 },
                        ]
                    }, {
                        cols: [
                            {
                                view: "text", type: "number", name: "v_year", label: "Year", 
                                width: 200, value: "2018"
                            },
                            {
                                view: "colorpicker", label: "Color", name: "v_color",
                                placeholder: "Click to select", width: 200
                            },
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
								click:() => this.saveVehicle()
							}
						]
					}
                ],
                rules: {
                    "v_reference": webix.rules.isNotEmpty,
                    "v_mark": webix.rules.isNotEmpty,
                    "v_year": webix.rules.isNotEmpty,
                    'v_color': webix.rules.isNotEmpty
                }
            }
        };
    }
    showWindow() {
        this.getRoot().show();
    }
    getBack() {
        this.getRoot().hide();
        this.$$("vehicleForm").clear();
        this.$$("vehicleForm").clearValidation();
    }
    saveVehicle() {
        const task = this.$$("vehicleForm").getValues();
        if (this.$$("vehicleForm").validate()) {
            webix.ajax(apiURL + "newvehicle/", task).then(function (data) {
                //console.log(data.json());
                if (data.json().data.msgType == "success") {
                    webix.message(data.json().data.msgBody);
                }
            });
            this.getBack();
        }
    }
}