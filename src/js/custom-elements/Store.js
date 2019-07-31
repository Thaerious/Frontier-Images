"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const BuyRoadController = require("../controller/BuyRoadController");
const BuyVillageController = require("../controller/BuyVillageController");
const NidgetElement = require("@thaerious/nidget").NidgetElement;

class Store extends NidgetElement {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        console.log("store ccb");
        window.addEventListener("load", ()=>this.ready());
    }

    ready(){
        console.log("ready");        
        document.querySelector("#bRoad").addEventListener("click", () => this.buyRoad());
        document.querySelector("#bVillage").addEventListener("click", () => this.buyVillage());
        document.querySelector("#bCity").addEventListener("click", () => this.buyCity());
        document.querySelector("#bCard").addEventListener("click", () => this.buyCard());        
    }

    buyRoad() {
        let buyRoadController = new BuyRoadController(0);
        buyRoadController.start();
    }

    buyVillage() {
        let buyRoadController = new BuyVillageController(0);
        buyRoadController.start();        
    }

    buyCity() {
        this.bank.wheat = this.bank.wheat - 2;
        this.bank.ore = this.bank.ore - 3;
    }

    buyCard() {
        this.bank.wheat = this.bank.wheat - 1;
        this.bank.wool = this.bank.wool - 1;
        this.bank.ore = this.bank.ore - 1;
    }
}

window.customElements.define('frontier-store', Store);
module.exports = Store;