"use strict";
const NidgetHTMLImage = require("@thaerious/nidget").NidgetHTMLImage;
const Axial = require("../utility/Axial");

class NidgetAxialImage extends NidgetHTMLImage{
    constructor(){
        super();
    }
    
    connectedCallback(){       
        if (!this.axial) this.axial = "0 0 0";
    }
    
    scale(dw, dh){
        if (!dh) dh = dw;
        let w = this.width * dw;
        let h = this.height * dh;
        this.width = w;
        this.height = h;
    }        
    
    /**
     * Accepts either a string or an axial object.
     */
    set axial(ax){
        if (typeof(ax) === "string"){
            this.setAttribute(NidgetAxialImage.axialAttribute, ax);
        } else {
            this.setAttribute(NidgetAxialImage.axialAttribute, ax.toString());
        }
    }
    
    /**
     * Returns an axial object.
     */
    get axial(){
        let axialString = this.getAttribute(NidgetAxialImage.axialAttribute);
        if (!axialString) return undefined;
        return new Axial(axialString);
    }        
}

NidgetAxialImage.axialAttribute = "axial";
module.exports = NidgetAxialImage;
