"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const HexAnchor = require("./HexAnchor");
const HexElement = require("./HexElement");

class RadialHexCollection extends HexAnchor{
    constructor(){
        super();
        this.index = 1;
        this.radius = 0; 
    }
    
    connectedCallback(){
        super.connectedCallback();
    }
    
    onAdd(hexElement){
        this.addNext(hexElement);
        
        this.index = this.index + 1;
        console.warn(this.index + ", " + this.radius);
        if (this.index > this.radius * 6){
            this.index = 1;
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
        let i = this.index / r;
                
        console.log(`${this.index}: i, r, i/r, ${i} ${r} ${i/r}`);
        
        switch (i / r){
            case 0:
                console.log(`1: ${i} ${-r} ${r-i}`);
                hexElement.axial = new Axial(i, -r, r-i);
            break;
            case 1:
                console.log(`2: ${r} ${-r-i} ${i}`);
                hexElement.axial = new Axial(r, -r+i, -i);
            break;
            case 2:
                hexElement.axial = new Axial(r-i, i, -r);
            break;
            case 3:
                hexElement.axial = new Axial(-i, r, -r+i);
            break;
            case 4:
                hexElement.axial = new Axial(-r, r-i ,i);
            break;
            case 5:
                hexElement.axial = new Axial(-r+i, -i, r);
            break;
        }
    }
    
    fill(radius){
        let src = this.getAttribute(RadialHexCollection.imgAttribute);
        
        for (let i = 1; i <= radius; i++){
            let hexEle = new HexElement(i, -radius, -i + radius);
            hexEle.src = src;
            this.append(hexEle);
        }

        for (let i = -1; i >= -radius; i--){
            let hexEle = new HexElement(radius, -radius - i ,i);
            hexEle.src = src;
            this.append(hexEle);
        }
        
        for (let i = 1; i <= radius; i++){
            let hexEle = new HexElement(radius - i, i,-radius);
            hexEle.src = src;
            this.append(hexEle);
        }

        for (let i = -1; i >= -radius; i--){
            let hexEle = new HexElement(i, radius, -i - radius);
            hexEle.src = src;
            this.append(hexEle);
        }

        for (let i = 1; i <= radius; i++){
            let hexEle = new HexElement(-radius, radius - i ,i);
            hexEle.src = src;
            this.append(hexEle);
        }

        for (let i = -1; i >= -radius; i--){
            let hexEle = new HexElement(-radius - i, i, radius);
            hexEle.src = src;
            this.append(hexEle);
        } 
    }
    
    set src(src){
        this.img.setAttribute("src", src);
    }
    
    get src(){
        return this.img.getAttribute("src");
    }
    
    size(width, height){
        $(this).css("width", width);
        $(this).css("height", height);
    }
};

RadialHexCollection.imgAttribute = "img";
RadialHexCollection.radiusAttribute = "size";
window.customElements.define('radial-hex-collection', RadialHexCollection);
module.exports = RadialHexCollection;