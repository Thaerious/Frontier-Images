"use strict";
const NidgetHTMLImage = require("@thaerious/nidget").NidgetHTMLImage;
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetElement = require("@thaerious/nidget").NidgetElement;

class Robber extends NidgetHTMLImage{
    constructor(){
        super();
        window.addEventListener("load", ()=>this.ready());
        this.running = false;
    } 

    ready(){
        this.addEventListener("mousedown", (event)=>this.mousedown(event));                
        NidgetElement.query(".resource-tile", (ele)=>ele.addEventListener("mouseup", (event)=>this.mouseup(event)));
    }
    
    mousedown(){
        if (this.disabled) return;
        this.startElement = this.parentElement;
        this.running = true;
        this.detach();
        MouseUtilities.attachElement(this);
        this.transformer.push("translate(-50%, -50%)");        
    }

    mouseup(event){
        if (!this.running) return;
        if (event.srcElement === this.startElement) return;
        this.running = false;
        MouseUtilities.detachElement();
        this.transformer.pop();
        this.clearPos();
        event.srcElement.append(this);
    }

};

window.customElements.define('frontier-robber', Robber, {extends: "img"});
module.exports = Robber;