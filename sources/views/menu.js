import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		const screen = this.app.config.size;

		return {
			view:"sidebar",
			css:theme,
			width: 250,
			collapsed:(screen !== "wide"),
			tooltip:(obj) => {
				return this.getRoot().config.collapsed ? obj.value : "";
			},
			data:[
				{ id:"customersview", value: 'Clients', icon:"mdi mdi-account-box", data:[
					{ id: "standard", value: 'Standard', icon: "mdi mdi-chart-areaspline" },
				] },
				{ id:"carsmanagement", value: "Gestion des véhicules", icon:"mdi mdi-chart-areaspline", data: [
					{ id: "vehicles", value: "Voitures", icon: "mdi mdi-widgets" },
				] },
				{ id:"users", value: "Utilisateurs", icon:"mdi mdi-widgets" },
				{ id: "logout", value: "Déconnexion", icon: "mdi mdi-out" }
			]
		};
	}
	init(sidebar){
		this.use(plugins.Menu,{
			id:sidebar,
			urls:{
				"logout":"/login"
			}
		});
		this.on(this.app,"menu:toggle",() => sidebar.toggle());
		sidebar.getPopup().attachEvent("onBeforeShow",() => false);
	}
	urlChange(ui,url){
		if (!ui.find(opts => url[1].page === opts.id).length)
			ui.unselect();
	}
}
