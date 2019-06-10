"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;
const HexElement = require("./HexElement");
const NumberImage = require("./NumberImage");
const HexImage = require("./HexImage");

class ResourceTileElement extends HexElement {
    constructor() {
        super();
        this.numberImg = new NumberImage();
        this.hexImg = new HexImage();
    }

    static get observedAttributes() {
        return [ResourceTileElement.numberAttribute, ResourceTileElement.typeAttribute];
    }

    connectedCallback() {
        super.connectedCallback();
        this.numberImg.setAttribute(NumberImage.numberAttribute, this.number);
        this.hexImg.setAttribute(HexImage.typeAttribute, this.hexType);        
        $(this).append(this.numberImg);
        $(this).append(this.hexImg);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "number":
                this.numberImg.setAttribute(NumberImage.numberAttribute, this.number);
                break;
            case "type":
                this.hexImg.setAttribute(HexImage.typeAttribute, this.hexType);                
                break;
        }
    }

    get number() {
        return $(this).attr(ResourceTileElement.numberAttribute);
    }

    set number(n) {
        $(this).attr(ResourceTileElement.numberAttribute, n);
        this.hexImg.setAttribute(NumberImage.numberAttribute, n);
    }

    get hexType() {        
        return $(this).attr(ResourceTileElement.typeAttribute);
    }

    set hexType(string) {
        $(this).attr(ResourceTileElement.typeAttribute, string.toUpperCase());
        this.hexImg.setAttribute(HexImage.typeAttribute, string.toUpperCase());
    }
}
;

ResourceTileElement.numberAttribute = "number";
ResourceTileElement.typeAttribute = "hex-type";
window.customElements.define('resource-tile-element', ResourceTileElement);
module.exports = ResourceTileElement;