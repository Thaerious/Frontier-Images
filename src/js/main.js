"use strict";
const $ = window.$ ? window.$ : require("jquery");
window.nidget = require("@thaerious/nidget");

//const NidgetElement = require("@thaerious/nidget").NidgetElement;
//const ButtonNidget = require("@thaerious/nidget").NigetButton;

require("./HexAnchor");
const HexElement = require("./HexElement");
require("./HexAnchor");
require("./RadialHexCollection");
require("./TileElement");
const ResourceTileElement = require("./ResourceTileElement");
require("./PortTileElement");
require("./custom-elements/Bank");
require("./custom-elements/Road");
const CircleMarker = require("./custom-elements/CircleMarker");
const Controller = require("./controller/Controller");

window.addEventListener("load", () => {
    let main = new Main();
    main.start();
});

class Main {
    async start() {
        console.log("start");
        let q = document.querySelector("#mapBoundingBox");
//        q.onResize = resizeMap.bind(q);
        this.attachTargetAnchors();
        new Controller();
    }
    
    attachTargetAnchors(){
        let mapAnchor = window.mapAnchor = document.querySelector("#mapAnchor");
        let axials = mapAnchor.filter((ax, el)=>el instanceof ResourceTileElement).axials;
        for (let ax of axials){
            let img = new CircleMarker();
            img.axial = ax;
            mapAnchor.append(img);
        }
    }
}

const MAP_RATIO = 1.103;
const HEX_RATIO = 1.15384615384615;
function resizeMap(nidg, prev) {
    let targetHeight = nidg.height;
    if (nidg.width * MAP_RATIO < nidg.height) {
        targetHeight = nidg.width * MAP_RATIO;
    }
    resizeMapVertDominant(targetHeight, prev.height);
}

function resizeMapVertDominant(targetHeight, prevHeight) {
    let hexHeight = targetHeight / 7;
    let hexWidth = hexHeight * HEX_RATIO;

    hexHeight = Math.trunc(hexHeight * 1000, 3) / 1000;
    hexWidth = Math.trunc(hexWidth * 1000, 3) / 1000;

    let mapAnchor = document.querySelector("#mapAnchor");
    mapAnchor.hexWidth = hexWidth;
    mapAnchor.hexHeight = hexHeight;

    for (let e of mapAnchor.children) {
        e.scale(targetHeight / prevHeight);
        if (!e instanceof HexElement) continue;
    }
    
    $("#mapAnchor").css("top", `${targetHeight / 2}px`);
}