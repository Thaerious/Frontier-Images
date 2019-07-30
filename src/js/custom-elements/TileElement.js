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
    WATER    : "water",
    FIELD    : "field",
    FOREST   : "forest",
    HILL     : "hill",
    MOUNTAIN : "mountain",
    PASTURE  : "pasture",
    DESERT   : "desert",
    PORT0    : "port0",
    PORT1    : "port1",
    PORT2    : "port2",
    PORT3    : "port3",
    PORT4    : "port4",
    PORT5    : "port5"    
};

TileElement.imageDirectory = "assets/images/hexes/";
TileElement.typeAttribute = "hex-type";

window.customElements.define('tile-element', TileElement);
module.exports = TileElement;