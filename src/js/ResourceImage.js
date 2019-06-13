"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetHTMLImage = require("@thaerious/nidget").NidgetHTMLImage;

class ResourceImage extends NidgetHTMLImage{
    constructor(){
        super();
    }
    
    connectedCallback(){
        this._updateRendering();
        this.classList.add("centered-image");
    }
    
    static get observedAttributes() { return [ResourceImage.resourceAttribute]; }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this._updateRendering();
    } 
    
    _updateRendering(){
        let resource = this.getAttribute(ResourceImage.resourceAttribute);
        if (!resource) return;
        
        let filename = 
            ResourceImage.imagePath +
            resource + 
            ResourceImage.imageSuffix;
        $(this).attr("src", filename);
    }
};

ResourceImage.imageSuffix = ".png";
ResourceImage.imagePath = "assets/images/port-token/";
ResourceImage.resourceAttribute = "resource";
window.customElements.define('resource-image', ResourceImage, {extends: "img"});
module.exports = ResourceImage;