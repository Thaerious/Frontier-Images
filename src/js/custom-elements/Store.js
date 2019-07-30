"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const BuyRoadController = require("../controller/BuyRoadController");
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
        console.log("buy road");
        this.buyRoadController = new BuyRoadController(0);
        this.buyRoadController.start();
    }

    buyVillage() {
        this.bank.wood = this.bank.wood - 1;
        this.bank.wheat = this.bank.wheat - 1;
        this.bank.wool = this.bank.wool - 1;
        this.bank.brick = this.bank.brick - 1;
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