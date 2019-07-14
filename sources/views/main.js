import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config(){
		const header = {
			type:"header", css:"custom_dark", height:58,
			template:"Menu"
		};

		const sidebar = {
			localId:"menu",
			view:"sidebar", css:"webix_dark", width:200,
			data:[
				/*{ id:"dash", value:"Dashboard", icon:"mdi mdi-view-dashboard" },
				{ id:"charts", value:"Charts", icon:"mdi mdi-chart-areaspline" },*/
				{ id:"customers", value:"Customers", icon:"mdi mdi-format-line-style"  },
				{ id:"tables", value:"Tables", icon:"mdi mdi-table" },
				{ id:"forms", value:"Forms", icon:"mdi mdi-format-line-style"  }
				/*{ id:"kanban", value:"Kanban", icon:"mdi mdi-view-column"  },
				{ id:"pivot", value:"Pivot", icon:"mdi mdi-layers"  },
				{ id:"files", value:"File Manager", icon:"mdi mdi-folder-star"  }*/
			]
		};

		const toolbar = {
			view:"toolbar",
			padding:9, height:58,
			cols:[
				{ template: "BeSafe Management tool - Monitoring." },
				{ view:"icon", icon:"mdi mdi-bell", badge:"5" },
				{ view:"icon", icon:"mdi mdi-settings" },
				{
					template:`<image class="mainphoto" src="data/images/morgan_yu.jpg">
					<span class="webix_icon mdi mdi-circle status green"></span>`,
					width:60, css:"avatar",	borderless:true
				}
			]
		};

		return {
			type:"clean", cols:[
				{ rows:[ header, sidebar ]},
				{ rows:[ toolbar, { $subview:true } ]}
			]
		};
	}

	init(){
		this.use(plugins.Menu, "menu");
	}
}