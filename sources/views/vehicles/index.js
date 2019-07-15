import { JetView } from "webix-jet";
import NewCustomerPopup from "../forms/customer";

export default class VehiclesView extends JetView {
    config() {
        return {
            type: "space",
            rows: [{
                type: "wide", cols: [
                    { $subview: "tables.vehicles" }
                ]
            },
            {
                type: "wide", cols: [
                    { $subview: "tables.carsusers" }
                ]
            }
            ]
        };
    }

    init() {
        //this.newtask = this.ui(NewCustomerPopup);
    }
}