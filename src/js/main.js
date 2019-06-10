"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const ButtonNidget = require("@thaerious/nidget").NigetButton;

require("./HexAnchor");
require("./HexElement");
require("./HexAnchor");
require("./RadialHexCollection");
require("./ResourceTileElement");

window.Axial = require("./Axial");

window.addEventListener("load", ()=>{
    let main = new Main();
    main.start();
});

class Main{ 
    async start(){
        $("#bRoad").click((event)=>{
            console.log("bRoad");
        });
        $("#bVillage").click((event)=>{
            console.log("bVillage");
        });
        
        let hexes = document.querySelectorAll("#mapAnchor hex-element");
    }    
}
