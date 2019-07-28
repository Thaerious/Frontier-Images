"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const Axial = require("./Axial");

class HexElement extends NidgetElement{
    constructor(){
        super();
    }
    
    connectedCallback(){       
        if (!this.axial){
            this.axial = "0, 0, 0";
        }
        super.connectedCallback();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        
    }
    
    /**
     * Accepts either a string or an axial object.
     */
    set axial(ax){
        if (typeof(ax) === "string"){
            this.setAttribute(HexElement.axialAttribute, ax);
        } else {
            this.setAttribute(HexElement.axialAttribute, `${ax.x}, ${ax.y}, ${ax.z}`);
        }
    }
    
    /**
     * Returns an axial object.
     */
    get axial(){
        let axialString = this.getAttribute(HexElement.axialAttribute);
        if (!axialString) return undefined;
        return new Axial(axialString);
    }    
};

HexElement.axialAttribute = "axial";
window.customElements.define('hex-element', HexElement);
module.exports = HexElement;