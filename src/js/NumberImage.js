"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetHTMLImage = require("@thaerious/nidget").NidgetHTMLImage;

class NumberImage extends NidgetHTMLImage{
    constructor(){
        super();
    }
    
    connectedCallback(){
        this._updateRendering();
        this.classList.add("centered-image");
        this.setAttribute("is", "number-image");
    }
    
    static get observedAttributes() { return [NumberImage.numberAttribute]; }
    
    attributeChangedCallback(name, oldValue, newValue) {
        // name will always be "number" due to observedAttributes
        this._updateRendering();
    } 
    
    _updateRendering(){
        let number = this.getAttribute(NumberImage.numberAttribute);
        if (!number) return;
        
        let filename = 
            NumberImage.imagePath +
            NumberImage.imagePrefix +
            number + 
            NumberImage.imageSuffix;
    
        $(this).attr("src", filename);
    }
};

NumberImage.imagePrefix = "number";
NumberImage.imageSuffix = ".png";
NumberImage.imagePath = "assets/images/number-token/";
NumberImage.numberAttribute = "number";
window.customElements.define('number-image', NumberImage, {extends: "img"});
module.exports = NumberImage;