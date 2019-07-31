"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const Village = require("../custom-elements/Village");

class BuyVillageController {
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

        this.village = new Village();

        window.village = this.village;
        document.body.appendChild(this.village);
        this.village.owner = this.owner;
        this.village.style.transform = "translate(-50%, -50%)";
        MouseUtilities.attachElement(this.village);

        this.map.query("[marker='corner']", (ele) => {
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
        
        this.map.query("[marker='corner']", (ele) => ele.hide());
    }
}

function mouseUpEventListener(event) {
    let village = new Village();
    this.map.appendChild(village);
    village.owner = this.owner;
    village.axial =  event.srcElement.axial;
    
    let adjacentEdges = village.axial.edges();
    let adjacentCorners = adjacentEdges.corners();
    let elements = this.map.getElements(adjacentCorners);
    for (let e of elements) console.log(e);
    for (let e of elements) e.detach();
    event.srcElement.axial;

    MouseUtilities.detachElement().detach();

    this.cleanup();
}

module.exports = BuyVillageController;