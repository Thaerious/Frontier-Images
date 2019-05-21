"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;
const HexElement = require("./HexElement");

class TileElement extends HexElement{
    constructor(type){
        super();
        if (type === null) this.tileType = TileElement.TileType.WATER;
        else this.tileType = type;
    }
    
    connectedCallback(){
        super.connectedCallback();
        this.tile(this.tileType);
    }
        
    
    tile(type){        
        if (!type) return this.tileType;
        this.tileType = type;
        this.imgSrc(TileElement.imageDirectory + type + ".png");
    }
};

/* tile types corrispond to image filename */
TileElement.TileType = {
    WATER    : "WATER",
    FIELD    : "FIELD",
    FOREST   : "FOREST",
    HILL     :  "HILL",
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

TileElement.imageDirectory = "assets/images/";

window.customElements.define('tile-element', TileElement);
module.exports = TileElement;