"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;
const ResourceImage = require("./ResourceImage");
const TileElement = require("./TileElement");

class PortTileElement extends TileElement {
    constructor() {
        super();
        this.resourceImg = new ResourceImage();
    }

    static get observedAttributes() {
        return [PortTileElement.facingAttribute, PortTileElement.resourceAttribute].concat(super.observedAttributes);
    }

    connectedCallback() {
        super.connectedCallback();
        $(this).append(this.resourceImg);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);

        switch (name) {
            case PortTileElement.facingAttribute:
                this._update();
                break;
            case PortTileElement.resourceAttribute:
                this.resourceImg.setAttribute(ResourceImage.resourceAttribute, newValue);
                break;
        }
    }

    get facing() {
        return $(this).attr(PortTileElement.facingAttribute);
    }

    set facing(direction) {
        $(this).attr(PortTileElement.facingAttribute, direction);
    }

    _update() {
        let direction = this.getAttribute(PortTileElement.facingAttribute);

        switch (direction.toUpperCase()) {
            case "N":
                this.hexType = "port3";
                break;
            case "NE":
                this.hexType = "port4";
                break;
            case "SE":
                this.hexType = "port5";
                break;
            case "S":
                this.hexType = "port0";
                break;
            case "SW":
                this.hexType = "port1";
                break;
            case "NW":
                this.hexType = "port2";
                break;
        }
    }
}
;

PortTileElement.resourceAttribute = "resource";
PortTileElement.facingAttribute = "facing";
window.customElements.define('port-tile-element', PortTileElement);
module.exports = PortTileElement;