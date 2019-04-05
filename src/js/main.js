"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;
const FileOperations = require("@thaerious/nidget").FileOperations;
const HexLayoutManager = require("./HexLayoutManager");

window.onload = function(){
    let main = new Main();
    main.start();
};

class Main{
    
    constructor(){
        
    }
    
    async start(){
        console.log("main.start");     
        
        await FileOperations.loadNidget("assets/fragments/hex.frag.html");        
        this.mapAnchor = new HexLayoutManager(document.querySelector("#mapAnchor"), 120, 104);
        
        let hex = await FileOperations.loadNidget("assets/fragments/hex.frag.html");
        this.mapAnchor.appendChild(hex, 0, 0);
        hex.setText(".left", "q:0");
        hex.setText(".right", "r:0");
        hex = await FileOperations.loadNidget("assets/fragments/hex.frag.html");
        this.mapAnchor.appendChild(hex, 1,0);
        hex.setText(".left", "q:1");
        hex.setText(".right", "r:0");
        hex = await FileOperations.loadNidget("assets/fragments/hex.frag.html");
        this.mapAnchor.appendChild(hex, 2,0);
        hex.setText(".left", "q:2");
        hex.setText(".right", "r:0");
        hex = await FileOperations.loadNidget("assets/fragments/hex.frag.html");
        this.mapAnchor.appendChild(hex, 2,1);
        hex.setText(".left", "q:2");
        hex.setText(".right", "r:1");
        
    }    
}