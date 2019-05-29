"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const ButtonNidget = require("@thaerious/nidget").NigetButton;
const HexAnchor = require("./HexAnchor");
const HexElement = require("./HexElement");
require("./RadialHexCollection");

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
    }    
}
