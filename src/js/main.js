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
require("./ResourceTileElement");
require("./PortTileElement");

window.addEventListener("load", () => {
    let main = new Main();
    main.start();
});

class Main {
    async start() {
        console.log("start");
        let q = document.querySelector("#mapBoundingBox");
        q.onResize = resizeMap.bind(q);
    }
}

const MAP_RATIO = 1.103;
const HEX_RATIO = 1.15384615384615;
function resizeMap(nidg, prev) {
    let targetHeight = nidg.height;
    if (nidg.width * MAP_RATIO < nidg.height) {
        targetHeight = nidg.width * MAP_RATIO;
    }
    resizeMapVertDominant(targetHeight);
}

function resizeMapVertDominant(targetHeight) {
    let hexHeight = targetHeight / 7;
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
    
    $("#mapAnchor").css("top", `${targetHeight / 2}px`);
}
//
//function resizePlayerDialog(nidg, prev){
//    let outers = $(".outerPlayerDialog");
//    
//    let targetHeight = nidg.height;
//    if (nidg.width / 4 < nidg.height){
//        targetHeight = nidg.width / 4;
//    }
//    
//    $(".outerPlayerDialog").css("width", `${targetHeight}px`);
//    $(".outerPlayerDialog").css("height", `${targetHeight}px`);
//    
//    $(".outerPlayerDialog[data-pid='1'").css("left", `${nidg.width / 4 * 0}px`);
//    $(".outerPlayerDialog[data-pid='2'").css("left", `${nidg.width / 4 * 1}px`);
//    $(".outerPlayerDialog[data-pid='3'").css("left", `${nidg.width / 4 * 2}px`);
//    $(".outerPlayerDialog[data-pid='4'").css("left", `${nidg.width / 4 * 3}px`);
//}
//
//function checkWindowDims() {
//    if (window.innerHeight > window.innerWidth && !$("body").hasClass("portrait")) {
//        console.log("portrait");
//        $("body").removeClass("landscape");
//        $("body").addClass("portrait");
//    } else if (window.innerHeight < window.innerWidth && !$("body").hasClass("landscape")){
//        console.log("landscape");
//        $("body").removeClass("portrait");
//        $("body").addClass("landscape");
//    }
//}
//
////class Main {
////    async start() {
////        console.log("start");
////        let q = document.querySelector("#mapBoundingBox");
////        q.onResize = resizeMap.bind(q);
////        
////        q = document.querySelector("#playerDialogContainer");
////        q.onResize = resizePlayerDialog.bind(q);
////
////        checkWindowDims();
////        $(window).resize(()=>checkWindowDims());
////        
////    }
////}
//
//class Main {
//    async start() {
//        $(window).resize(() => this.checkWindowDims());
//        this.checkWindowDims();
//        $("nidget-container").each((i,e)=>e.doLayout("manual"));
//    }
//
//    checkWindowDims() {
//        if (window.innerHeight > window.innerWidth && !$("body").hasClass("portrait")) {
//            console.log("portrait");
//            $("body").removeClass("landscape");
//            $("body").addClass("portrait");            
//            $("#playerDialogContainer").attr("layout", "row");
//        } else if (window.innerHeight < window.innerWidth && !$("body").hasClass("landscape")) {
//            console.log("landscape");
//            $("body").removeClass("portrait");
//            $("body").addClass("landscape");
//            $("#playerDialogContainer").attr("layout", "column");
//        }
//    }
//}