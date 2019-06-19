"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const ButtonNidget = require("@thaerious/nidget").NigetButton;

require("./HexAnchor");
const HexElement = require("./HexElement");
require("./HexAnchor");
require("./RadialHexCollection");
require("./TileElement");
require("./ResourceTileElement");
require("./PortTileElement");

window.Axial = require("./Axial");

window.addEventListener("load", () => {
    let main = new Main();
    main.start();
});

const MAP_RATIO = 1.103;
const HEX_RATIO = 1.15384615384615;
function resizeMap(nidg, prev) {
    nidg.height = nidg.width * MAP_RATIO;
    resizeMapVertDominant(nidg, prev);
}

function resizeMapVertDominant(nidg, prev) {
    let hexHeight = nidg.height / 7;
    let hexWidth = hexHeight * HEX_RATIO;
    window.e = nidg;

    hexHeight = Math.trunc(hexHeight * 1000, 3) / 1000;
    hexWidth = Math.trunc(hexWidth * 1000, 3) / 1000;

    let mapAnchor = document.querySelector("#mapAnchor");
    mapAnchor.hexWidth = hexWidth;
    mapAnchor.hexHeight = hexHeight;

    for (let e of mapAnchor.children) {
        if (!e instanceof HexElement) continue;
        e.width = hexWidth;
        e.height = hexHeight;
    }
}

function resizeMapHorzDominant(nidg, prev) {
    console.log("horz");
    let hexHeight = nidg.height / 7;
    let hexWidth = hexHeight * HEX_RATIO;

    hexHeight = Math.trunc(hexHeight * 1000, 3) / 1000;
    hexWidth = Math.trunc(hexWidth * 1000, 3) / 1000;

    let mapAnchor = document.querySelector("#mapAnchor");
    mapAnchor.hexWidth = hexWidth;
    mapAnchor.hexHeight = hexHeight;

    for (let e of mapAnchor.children) {
        if (!e instanceof HexElement) continue;
        e.width = hexWidth;
        e.height = hexHeight;
    }
}

function checkWindowDims() {
    if (window.innerHeight > window.innerWidth) {
        $("body").removeClass("landscape");
        $("body").addClass("portrait");
    } else {
        $("body").removeClass("portrait");
        $("body").addClass("landscape");
    }
}

class Main {
    async start() {
        console.log("start");
        let q = document.querySelector("#mapBoundingBox");
        q.onResize = resizeMap.bind(q);

        checkWindowDims();
        $(window).resize(()=>checkWindowDims());
    }
}

