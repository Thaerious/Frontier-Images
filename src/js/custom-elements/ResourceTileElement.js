"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;
const NumberImage = require("./NumberImage");
const HexImage = require("./HexImage");
const TileElement = require("./TileElement");

class ResourceTileElement extends TileElement {
    constructor() {
        super();
        this.numberImg = new NumberImage();
        this.hexImg = new HexImage();
    }

    static get observedAttributes() {
        return [ResourceTileElement.numberAttribute].concat(super.observedAttributes);
    }

    connectedCallback() {
        super.connectedCallback();
        this.numberImg.setAttribute(NumberImage.numberAttribute, this.number);        
        $(this).append(this.numberImg);
        this.classList.add("resource-tile");        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        
        switch (name) {
            case NumberImage.numberAttribute:
                this.numberImg.setAttribute(NumberImage.numberAttribute, this.number);
                break;
        }
    }

    get number() {
        return this.getAttribute(ResourceTileElement.numberAttribute);
    }

    set number(n) {
        this.setAttribute(ResourceTileElement.numberAttribute, n);
        this.hexImg.setAttribute(NumberImage.numberAttribute, n);
    }
}
;

ResourceTileElement.numberAttribute = "number";
window.customElements.define('resource-tile-element', ResourceTileElement);
module.exports = ResourceTileElement;