"use strict";
const $ = window.$ ? window.$ : require("jquery");

class HexImage extends HTMLImageElement{
    constructor(){
        super();
    }
    
    connectedCallback(){
        this._updateRendering();
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
    
    scale(amount){
        this.width = this.width * amount;
        this.height = this.height * amount;
    }    
};

HexImage.imageSuffix = ".png";
HexImage.imagePath = "assets/images/hex/";
HexImage.typeAttribute = "hex-type";
window.customElements.define('hex-image', HexImage, {extends: "img"});
module.exports = HexImage;