
import { JetView } from "webix-jet";
import { apiurl, apiURL } from "../globals";

export default class Login extends JetView {
    config() {
        return {
            view: "layout", type: "wide",
            rows: [
                { view: "template", type: "header", template: "BeSafe - Management tool" },
                //{ template : "Greetings, human!" },
                {
                    gravity: 3,
                    cols: [
                        { css: "bgwhite", template: "" },
                        {
                            view: "form",
                            id: "authForm",
                            elementsConfig: {
                                labelWidth: 150, labelPosition: "top"
                            },
                            width: 450,
                            elements: [
                                { view: "label", label: "CONNEXION" },
                                {
                                    view: "text", label: "Identifiant", name: "userLogin",
                                    invalidMessage: "Identifiant incorrect"
                                },
                                { view: "text", label: "Mot de passe", name: "userPassword", type: "password" },
                                {
                                    view: "button", type: "form", align: "center", value: "Connexion", width: 150,
                                    invalidMessage: "Mot de passe incorrect", route: "/top/start",
                                    click: () => {
                                        var button = this;

                                        const form = this.$$("authForm");
                                        if (false == form.validate()) {
                                            webix.message({
                                                text: "Formulaire invalide",
                                                type: "error",
                                                expire: 5000,
                                                id: "message1"
                                            });
                                        } else {
                                            webix.ajax().post(apiURL + "dologin/", form.getValues())
                                                .then(function (data) {
                                                    let res = data.json();
                                                    if (res.msgType == "error") {
                                                        webix.message(res.msgBody, null, 2);
                                                        webix.message({
                                                            text: res.msgBody,
                                                            type: "error",
                                                            expire: 5000,
                                                            id: "message1"
                                                        });
                                                    } else {
                                                        /*  Setting localstorage. */
                                                        webix.storage.local.put("bs_backend_login", res.msgData);
                                                        //this.app.show("/top/start");
                                                        //this.show("/top/transactions");
                                                    }
                                                });
                                        }
                                    }
                                },
                            ],
                            rules: {
                                "userLogin": webix.rules.isNotEmpty,
                                "userPassword": webix.rules.isNotEmpty
                            }
                        },
                        { css: "bgwhite", template: "" }
                    ]
                }
            ]
        };
    }
}