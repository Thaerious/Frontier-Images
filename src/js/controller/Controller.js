"use strict";
const MouseUtilities = require("@thaerious/nidget").MouseUtilities;
const NidgetImage = require("@thaerious/nidget").NidgetImage;

class Controller{
    constructor(){
        this.bank = document.querySelector("#bank");
        document.querySelector("#bRoad").addEventListener("click", ()=>this.buyRoad());
        document.querySelector("#bVillage").addEventListener("click", ()=>this.buyVillage());
        document.querySelector("#bCity").addEventListener("click", ()=>this.buyCity());
        document.querySelector("#bCard").addEventListener("click", ()=>this.buyCard());
    }
    
    buyRoad(){
        this.bank.brick = this.bank.brick - 1;
        this.bank.wood = this.bank.wood - 1;
//        let road = new NidgetImage("assets/images/road/roadEW-p0.png");
        
        let road = document.createElement("img");
        road.setAttribute("src", "assets/images/pieces/road/roadEW-p0.png"); 
        
        document.body.appendChild(road);
        console.log(road);
        MouseUtilities.attachElement(road);
    }
    
    buyVillage(){        
        this.bank.wood = this.bank.wood - 1;
        this.bank.wheat = this.bank.wheat - 1;
        this.bank.wool = this.bank.wool - 1;
        this.bank.brick = this.bank.brick - 1;        
    }
    
    buyCity(){
        this.bank.wheat = this.bank.wheat - 2;
        this.bank.ore = this.bank.ore - 3;
    }
    
    buyCard(){
        this.bank.wheat = this.bank.wheat - 1;
        this.bank.wool = this.bank.wool - 1;
        this.bank.ore = this.bank.ore - 1;
    }
}


module.exports = Controller;