"use strict";
const $ = window.$ ? window.$ : require("jquery");
window.nidget = require("@thaerious/nidget");

/* custom dom elements */
require("./custom-elements/PortTileElement");
require("./custom-elements/HexElement");
require("./custom-elements/HexAnchor");
require("./custom-elements/RadialHexCollection");
require("./custom-elements/TileElement");
require("./custom-elements/ResourceTileElement");
require("./custom-elements/Store");
require("./custom-elements/Bank");
require("./custom-elements/Road");


const CircleMarker = require("./custom-elements/CircleMarker");
/* ------------------- */

window.addEventListener("load", () => {
    let main = new Main();
    main.start();
    window.mapanchor = document.querySelector("#mapAnchor");
});

class Main {
    async start() {
        console.log("start");
        let q = document.querySelector("#mapBoundingBox");
        this.attachTargetAnchors();
    }
    
    attachTargetAnchors(){
        let mapAnchor = window.mapAnchor = document.querySelector("#mapAnchor");
        let axials = mapAnchor.filter("[playable]").axials;        
        window.axials = axials;
        for (let ax of axials.corners()){
            let img = new CircleMarker();
            img.axial = ax;
            mapAnchor.append(img);
            img.setAttribute("marker", "corner");
        }
        for (let ax of axials.edges()){
            let img = new CircleMarker();
            img.axial = ax;
            mapAnchor.append(img);
            img.setAttribute("marker", "edge");
        }        
    }
}