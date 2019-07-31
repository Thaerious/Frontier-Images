"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const HexAnchor = require("../HexAnchor");
const HexElement = require("../HexElement");
const Axial = require("../../utility/Axial");

/**
 * Set the axial value for elements added to HexAnchor.
 * To use a layout manager, in the HexAnchor html set the layout-manager attribute
 * to the name of the layoutManager class.  In main, import the nidget base 
 * package, then set Nidget.layouts.layoutName = class.
 */
class RadialHexLayout{
    constructor(){
        this.index = 0;
        this.radius = 0;
    }
    
    onAdd(hexElement){
        this._addNext(hexElement);        
        this.index = this.index + 1;
        
        if (this.index >= this.radius * 6){
            this.index = 0;
            this.radius = this.radius + 1;
        }
    }
    
    onRemove(hexElement){
        /* do nothing */
    }
    
    _addNext(hexElement){
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
};

RadialHexLayout.imgAttribute = "img";
RadialHexLayout.radiusAttribute = "size";
module.exports = RadialHexLayout;