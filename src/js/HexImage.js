"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetHTMLImage = require("@thaerious/nidget").NidgetHTMLImage;

class HexImage extends NidgetHTMLImage{
    constructor(){
        super();
    }
    
    connectedCallback(){
        this._updateRendering();
        this.setAttribute("is", "hex-image");
    }
    
    static get observedAttributes() { return [HexImage.typeAttribute]; }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this._updateRendering();
    } 
    
    _updateRendering(){
        let hexType = this.getAttribute(HexImage.typeAttribute);     
        if (!hexType) return;
        let filename = HexImage.imagePath + hexType + HexImage.imageSuffix;    
        $(this).attr("src", filename);
    }
};

HexImage.imageSuffix = ".png";
HexImage.imagePath = "assets/images/hex/";
HexImage.typeAttribute = "hex-type";
window.customElements.define('hex-image', HexImage, {extends: "img"});
module.exports = HexImage;