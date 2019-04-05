"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;

class HexLayoutManager extends Nidget{
    
    constructor(element, width, height){
        super(element);
        this.width = width;
        this.height = height;
    }
    
    /**
     * Center element around the row,col hex.
     * See axial co-ordinates https://www.redblobgames.com/grids/hexagons/
     * @param {type} element
     * @param {type} x
     * @param {type} y
     * @return {undefined}
     */
    appendChild(nidget, q, r){
        super.appendChild(nidget);
        console.log(q + ", " + r);
        
        nidget.addClass("hex-container-element");

        let left = 3/4 * q * this.width;
        
        let top = r * this.height;
        top += this.height / 2 * q;
        
        console.log(top);
        nidget.top(top);
        nidget.left(left);
    }
    
    getChildAt(q, r){
        
    }
}

module.exports = HexLayoutManager;
