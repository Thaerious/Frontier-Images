"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const Axial = require("./Axial");

class HexElement extends NidgetElement{
    constructor(x = 0, y = 0, z = 0){
        super();
        this._axial = new Axial(x, y, z);
        this.img = document.createElement("img");
        this.attachShadow({mode: 'open'}).appendChild(this.img);
    }
    
    connectedCallback(){
        let src = this.getAttribute(HexElement.srcAttribute);        
        if (src) this.img.setAttribute("src", src);
        //this.attachShadow({mode: 'open'}).appendChild(this.img);
                
        let axialAttr = this.getAttribute(HexElement.axialAttribute);
        if (axialAttr !== "" && axialAttr !== null){
            let axialArray = axialAttr.split(/[ ,]+/g);
            let x = axialArray.length >= 1 ? parseFloat(axialArray[0]) : 0;
            let y = axialArray.length >= 2 ? parseFloat(axialArray[1]) : 0;
            let z = axialArray.length >= 3 ? parseFloat(axialArray[2]) : 0;
            this.axial = new Axial(x, y, z);
        }
    }
    
    set src(src){
        this.img.setAttribute("src", src);
    }
    
    get src(){
        return this.img.getAttribute("src");
    }
    
    set axial(ax){
        this._axial = ax;
        this.setAttribute(HexElement.axialAttribute, `${ax.x}, ${ax.y}, ${ax.z}`);
    }
    
    get axial(){
        return this._axial;
    }        
    
    size(width, height){
        $(this).css("width", width);
        $(this).css("height", height);
    }
};

HexElement.srcAttribute = "src";
HexElement.axialAttribute = "axial";
window.customElements.define('hex-element', HexElement);
module.exports = HexElement;