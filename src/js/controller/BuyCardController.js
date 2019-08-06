"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const Card = require("../custom-elements/Card");

class BuyCardController {
    constructor(owner) {
        this.bank = document.querySelector("#bank");
        this.store = document.querySelector("#store");
        this.holder = document.querySelector("#card-holder");
        this.owner = owner;
        this.eventListeners = [];
    }

    start() {
        this.bank.wheat = this.bank.wheat - 1;
        this.bank.wool = this.bank.wool - 1;
        this.bank.ore = this.bank.ore - 1;
        
        let card = new Card();
        this.holder.append(card);
    }

    cleanup() {
    }
}

module.exports = BuyCardController;