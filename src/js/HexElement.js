"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;

class HexElement extends Nidget{
    constructor(){
        super();
    }
    
    connectedCallback(){
        let src = this.getAttribute(HexElement.srcAttribute);
        this.img = document.createElement("img");
        if (src) this.img.setAttribute("src", src);
        this.attachShadow({mode: 'open'}).appendChild(this.img);
    }
    
    imgSrc(src){
        if (!src) return this.img.getAttribute("src");
        this.img.setAttribute("src", src);
    }
    
    size(width, height){
        $(this).css("width", width);
        $(this).css("height", height);
    }
};

HexElement.srcAttribute = "src";
window.customElements.define('hex-element', HexElement);
module.exports = HexElement;