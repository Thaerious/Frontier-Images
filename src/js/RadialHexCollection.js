"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const HexAnchor = require("./HexAnchor");
const HexElement = require("./HexElement");
const Axial = require("./Axial");

class RadialHexCollection extends HexAnchor{
    constructor(){
        super();
        this.index = 0;
        this.radius = 0;
    }
    
    connectedCallback(){
        super.connectedCallback();
    }
    
    onAdd(hexElement){
        this.addNext(hexElement);        
        this.index = this.index + 1;
        
        if (this.index >= this.radius * 6){
            this.index = 0;
            this.radius = this.radius + 1;
        }
        super.onAdd(hexElement);
    }
    
    addNext(hexElement){
        if (this.radius === 0){
            hexElement.axial = new Axial(0, 0, 0);
            return;
        }
        
        let r = this.radius;
        let i = (this.index % r) + 1;
        let f = Math.floor(this.index / r);
        
        switch (f){
            case 0: // NE
                hexElement.axial = new Axial(i, -r, r-i);
            break;
            case 1: // E
                hexElement.axial = new Axial(r, -r+i, -i);
            break;
            case 2: // SE
                hexElement.axial = new Axial(r-i, i, -r);
            break;
            case 3: // SW
                hexElement.axial = new Axial(-i, r, -r+i);
            break;
            case 4: // W
                hexElement.axial = new Axial(-r, r-i ,i);
            break;
            case 5: // NW
                hexElement.axial = new Axial(-r+i, -i, r);
            break;
        }
    }
    
    size(width, height){
        $(this).attr("hexwidth", width);
        $(this).attr("hexheight", height);
    }
};

RadialHexCollection.imgAttribute = "img";
RadialHexCollection.radiusAttribute = "size";
window.customElements.define('radial-hex-collection', RadialHexCollection);
module.exports = RadialHexCollection;