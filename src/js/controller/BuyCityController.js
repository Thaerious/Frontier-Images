"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const City = require("../custom-elements/City");

class BuyCityController {
    constructor(owner) {
        this.map = document.querySelector("#mapAnchor");
        this.bank = document.querySelector("#bank");
        this.store = document.querySelector("#store");
        this.owner = owner;
        this.eventListeners = [];
    }

    start() {
        this.bank.wood = this.bank.wood - 1;
        this.bank.wheat = this.bank.wheat - 1;
        this.bank.wool = this.bank.wool - 1;
        this.bank.brick = this.bank.brick - 1;

        this.city = new City();

        window.village = this.city;
        document.body.appendChild(this.city);
        this.city.owner = this.owner;
        this.city.style.transform = "translate(-50%, -50%)";
        MouseUtilities.attachElement(this.city);

        this.map.query(`.frontier-village[owner="${this.owner}"]`, (ele) => {
            ele.show();
            
            let mouseUpListener = mouseUpEventListener.bind(this);                        
            this.eventListeners.push({ele: ele, type: "mouseup", event: mouseUpListener});            
            ele.addEventListener("mouseup", mouseUpListener);
        });
    }

    cleanup() {
        for (let object of this.eventListeners) {
            object.ele.removeEventListener(object.type, object.event);
        }
    }
}

function mouseUpEventListener(event) {
    let city = new City();
    event.srcElement.detach();
    this.map.appendChild(city);
    city.owner = this.owner;
    city.axial =  event.srcElement.axial;
    MouseUtilities.detachElement().detach();
    this.cleanup();
}

module.exports = BuyCityController;