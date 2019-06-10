"use strict";
const $ = window.$ ? window.$ : require("jquery");

class NumberImage extends HTMLImageElement{
    constructor(number){
        super();
    }
    
    connectedCallback(){
        this._updateRendering();
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
    
    scale(amount){
        this.width = this.width * amount;
        this.height = this.height * amount;
    }    
};

NumberImage.imagePrefix = "number";
NumberImage.imageSuffix = ".png";
NumberImage.imagePath = "assets/images/number-token/";
NumberImage.numberAttribute = "number";
window.customElements.define('number-image', NumberImage, {extends: "img"});
module.exports = NumberImage;