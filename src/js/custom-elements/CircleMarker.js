"use strict";
const NidgetAxialImage = require("../NidgetAxialImage");

class CircleMarker extends NidgetAxialImage {
    constructor() {      
        super();
    }

    connectedCallback(){     
        super.connectedCallback();
        this.src = "assets/images/new/circle.png";
        this.setAttribute("is", "frontier-circle-marker");
//        this.setAttribute("hex-ratio", "hex-width 0.5");
        this.width = 32;
        this.height = 32;
    }
}

window.customElements.define('frontier-circle-marker', CircleMarker, {extends: "img"});
module.exports = CircleMarker;