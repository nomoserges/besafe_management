import { JetView } from "webix-jet";
import { apiURL } from "../../globals";
import NewVVehiclePopup from "../forms/vehicles";

export default class CustomersView extends JetView {
    config() {
        return {
            rows: [
                {
                    view: "toolbar", height: 38,
                    cols: [{
                        view: "button",
                        type: "form",
                        label: "New vehicle",
                        autowidth: true,
                        inputHeight: 40,
                        batch: "default",
                        click: () => this.newvehicle.showWindow()
                    }
                    ]
                }, {
                    view: "datatable", localId: "vechiclesTables", id: "vechiclesTables",
                    select: true, tooltip: true, resizeColumn: true, resizeRow: false,
                    url: apiURL + "getallvehicles/",
                    headermenu: {
                        autowidth: true,
                        scroll: true
                    },
                    columns: [
                        {
                            id: "id", header: "id", hidden: true
                        },{
                            id: "reference", header: ["Reference", { content: "textFilter" }], sort: "string", adjust: "data",
                            fillspace: true, width: 200
                        }, {
                            id: "mark", header: ["Mark", { content: "textFilter" }], sort: "string", adjust: "data", fillspace: true
                        }, {
                            id: "year", header: ["Year", { content: "selectFilter" }], sort: "string", format: webix.Date.dateToStr("%Y"), fillspace: true
                        }, {
                            id: "color", header: ["Color", { content: "selectFilter" }], sort: "string", adjust: "data", fillspace: true
                        }
                    ],
                    on: {
                        onAfterSelect: userid => {
                            $$("emailstable").bind($$("customerstable"), function (obj, filter) {
                                $$('emailsform').setValues({ userid: filter.userid });
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


    init(view) {
        this.newvehicle = this.ui(NewVVehiclePopup);
    }
}