"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const Road = require("../custom-elements/Road");

class BuyRoadController {
    constructor(owner) {
        this.map = document.querySelector("#mapAnchor");
        this.bank = document.querySelector("#bank");
        this.store = document.querySelector("#store");
        this.owner = owner;
        this.eventListeners = [];
    }

    start() {
        this.bank.brick = this.bank.brick - 1;
        this.bank.wood = this.bank.wood - 1;

        this.road = new Road();
        this.road.setAttribute("i", this.i);

        window.road = this.road;
        document.body.appendChild(this.road);
        this.road.owner = this.owner;
        MouseUtilities.attachElement(this.road);

        this.map.query("tile-element,port-tile-element,resource-tile-element", (ele) =>{
            let eventListener = () => this.hex = ele.axial;
            this.eventListeners.push({ele: ele, type: "mouseenter", event: eventListener});
            ele.addEventListener("mouseenter", eventListener);
        });

        this.map.query("[marker='edge']", (ele) => {
            ele.show();
            
            let enterListener = mouseEnterEventListener.bind(this);            
            let mouseUpListener = mouseUpEventListener.bind(this);            
            
            this.eventListeners.push({ele: ele, type: "mouseenter", event: enterListener});
            this.eventListeners.push({ele: ele, type: "mouseup", event: mouseUpListener});
            
            ele.addEventListener("mouseenter", enterListener);
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
        
        this.map.query("[marker='edge']", (ele) => ele.hide());
    }
}

function cancelEventListener(event) {
    console.log(this.bank);
    this.bank.wood = this.bank.wood + 1;
    this.bank.brick = this.bank.brick + 1;

    MouseUtilities.detachElement().detach();
    this.cleanup();
    event.stopPropagation();
}

function mouseEnterEventListener(event) {
    let c = this.hex.cardinality(event.srcElement.axial);
    if (c) {
        this.road.cardinality = c;
    }
}

function mouseUpEventListener(event) {
    event.srcElement.detach();
    let road = new Road();
    this.map.appendChild(road);
    road.owner = this.owner;
    road.axial =  event.srcElement.axial;

    let hex = road.axial.hexes().toArray()[0];
    let c = hex.cardinality(road.axial, true);
    road.cardinality = c;
    MouseUtilities.detachElement().detach();

    this.cleanup();
}

module.exports = BuyRoadController;