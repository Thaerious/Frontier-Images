"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;
const HexElement = require("./HexElement");
const HexImage = require("./HexImage");

class TileElement extends HexElement{
    constructor(){
        super();
        this.hexImg = new HexImage();
    }
    
    connectedCallback(){
        super.connectedCallback();               
        $(this).append(this.hexImg);
        $(this).css("box-sizing: content-box");
        $(this.hexImg).css("box-sizing: content-box");
    }
    
    static get observedAttributes() {
        return [TileElement.typeAttribute].concat(super.observedAttributes);
    }    
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case TileElement.typeAttribute:
                this.hexImg.setAttribute(HexImage.typeAttribute, newValue);                
                break;
        }
    }
    
    get hexType() {
        return this.getAttribute(TileElement.typeAttribute);
    }

    set hexType(string) {   
        this.setAttribute(TileElement.typeAttribute, string);
    }    
};

/* tile types corrispond to image filename */
TileElement.TileType = {
    WATER    : "WATER",
    FIELD    : "FIELD",
    FOREST   : "FOREST",
    HILL     : "HILL",
    MOUNTAIN : "MOUNTAIN",
    PASTURE  : "PASTURE",
    DESERT   : "DESERT",
    PORT0    : "PORT0",
    PORT1    : "PORT1",
    PORT2    : "PORT2",
    PORT3    : "PORT3",
    PORT4    : "PORT4",
    PORT5    : "PORT5"    
};

TileElement.imageDirectory = "assets/images/hex/";
TileElement.typeAttribute = "hex-type";

window.customElements.define('tile-element', TileElement);
module.exports = TileElement;