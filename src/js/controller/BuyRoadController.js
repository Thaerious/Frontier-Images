"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const Road = require("../custom-elements/Road");

class BuyRoadController{
    constructor(owner){        
        this.map = document.querySelector("#mapAnchor");
        this.bank = document.querySelector("#bank");
        this.store = document.querySelector("#store");
        this.owner = owner;
    }
    
    start(){
        this.bank.brick = this.bank.brick - 1;
        this.bank.wood = this.bank.wood - 1;
        
        this.road = new Road();
        window.road = this.road;
        document.body.appendChild(this.road);
        this.road.owner = this.owner;
        this.road.style.transform = "translate(-50%, -50%)";        
        MouseUtilities.attachElement(this.road);        
                       
        this.map.query("tile-element,port-tile-element,resource-tile-element", (ele)=>ele.addEventListener("mouseenter", ()=>{
            this.hex = ele.axial;
        }));
        
        this.map.query("[marker='edge']", (e)=>e.show());
        this.map.query("[marker='edge']", (ele)=>ele.addEventListener("mouseenter", (event)=>{
                let c = this.hex.cardinality(ele.axial);
                if (c){
                    this.road.cardinality = c;
                    this.road.style.transform = "translate(-50%, -50%) " + this.road.style.transform;   
                }                
            }
        ));

        this.map.query("[marker='edge']", (ele)=>ele.addEventListener("mouseup", (event)=>{
            ele.detach();
            let road = new Road();
            this.map.appendChild(road);     
            road.owner = this.owner;
            road.axial = ele.axial;   
            
            let hex = road.axial.hexes().toArray()[0];
            let c = hex.cardinality(road.axial, true);
            road.cardinality = c;
            console.log(road.style.transform);
            window.road = road;
        }));        
    }
}

module.exports = BuyRoadController;