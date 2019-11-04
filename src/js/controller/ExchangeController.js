"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const Card = require("../custom-elements/Card");
const DisposableController = require("./DisposableController");
const ResourceImage = require("../custom-elements/ResourceImage");

class ExchangeController extends DisposableController{
    constructor() {
        super();
        this.bank = document.querySelector("#bank");    
        this.isRunning = false;
    }

    start(element) {
        console.log("ec.start");
        if(this.isRunning) return;
        
        this.resource = element.closest("[data-cat]").getAttribute("data-cat");
        this.addEventListener(this.bank.query("[data-cat]"), "mouseup", "onDrop");
        this.addEventListener(this.bank.query("[data-cat]"), "mouseEnter", "onEnter");
        this.addEventListener(this.bank.query(`[data-cat="${this.resource}"]`), "mousedown", "onPress");
        
        MouseUtilities.element = new ResourceImage(this.resource);
        MouseUtilities.element.transformer.push("translate(-50%, -50%)");
        
        this.isRunning = true;        
        this.bank[this.resource] -= window.main.exchangeRate(this.resource);
    }

    onPress(event){
        console.log("enter onPress");
        this.cleanup();
        MouseUtilities.element = null;
        this.isRunning = false;
        console.log(this.resource);
        console.log(window.main.exchangeRate(this.resource));
        
        console.log(typeof this.bank[this.resource]);
        this.bank[this.resource] += window.main.exchangeRate(this.resource);
        console.log("exit onPress");
    }

    onDrop(event){
        let resource = event.srcElement.closest("[data-cat]").getAttribute("data-cat");
        if (this.resource !== resource){
            this.cleanup();
            MouseUtilities.element = null;
            this.isRunning = false;
            this.bank[resource] += 1;
        }
    }
}

module.exports = ExchangeController;