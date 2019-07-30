"use strict";
const NidgetAxialImage = require("./NidgetAxialImage");

class CircleMarker extends NidgetAxialImage {
    constructor() {      
        super();
    }

    connectedCallback(){     
        super.connectedCallback();
        this.src = "assets/images/new/circle.png";
        this.setAttribute("is", "frontier-circle-marker");
        this.setAttribute("class", "frontier-circle-marker");
    }
}

window.customElements.define('frontier-circle-marker', CircleMarker, {extends: "img"});
module.exports = CircleMarker;