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
        MouseUtilities.attachElement(this.village);
        this.village.owner = this.owner;
        this.village.style.transform = "translate(-50%, -50%)";        

        this.map.query("[marker='corner']", (ele) => {
            ele.show();

            let mouseUpListener = mouseUpEventListener.bind(this);
            this.eventListeners.push({ele: ele, type: "mouseup", event: mouseUpListener});
            ele.addEventListener("mouseup", mouseUpListener);
        });

        let cancelListener = cancelEventListener.bind(this);
        this.eventListeners.push({ele: document, type: "mouseup", event: cancelListener});
        document.addEventListener("mouseup", cancelListener);
    }

    cleanup() {
        for (let object of this.eventListeners) {
            object.ele.removeEventListener(object.type, object.event);
        }

        this.map.query("[marker='corner']", (ele) => ele.hide());
    }
}

function cancelEventListener(event) {
    console.log(this.bank);
    this.bank.wood = this.bank.wood + 1;
    this.bank.wheat = this.bank.wheat + 1;
    this.bank.wool = this.bank.wool + 1;
    this.bank.brick = this.bank.brick + 1;

    MouseUtilities.detachElement().detach();
    this.cleanup();
    event.stopPropagation();
}

function mouseUpEventListener(event) {
    let village = new Village();
    
    /* set owner and axial (location) */
    village.owner = this.owner;
    village.axial = event.srcElement.axial;
    
    /* remove marker and adjacent markers */
    let adjacentEdges = village.axial.edges();
    let adjacentCorners = adjacentEdges.corners();
    let elements = this.map.getElements(adjacentCorners);
    for (let e of elements) e.detach();
    MouseUtilities.element = null;
    this.cleanup();
    event.stopPropagation();

    this.map.appendChild(village);
}

module.exports = BuyVillageController;