"use strict";
const NidgetAxialImage = require("../NidgetAxialImage");

class Road extends NidgetAxialImage {
    constructor() {      
        super();
    }

    connectedCallback(){     
        super.connectedCallback();
        this.src = "assets/images/pieces/road-white.png";
        this.setAttribute("is", "frontier-road");
    }

    static get observedAttributes() {
        return [Road.cardinalityAttribute, Road.ownerAttribute].concat(super.observedAttributes);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case Road.cardinalityAttribute:
                this.updateCardinality();
                break;
            case Road.ownerAttribute:
                this.updateOwner();
                break;                
        }
    } 

    get cardinality(){
        return this.getAttribute(Road.cardinalityAttribute);
    }

    set cardinality(value){
        return this.setAttribute(Road.cardinalityAttribute, value);
    }
    
    get owner(){
        return this.getAttribute(Road.ownerAttribute);
    }

    set owner(value){
        return this.setAttribute(Road.ownerAttribute, value);
    }    

    updateOwner(){
        let owner = this.getAttribute(Road.ownerAttribute);
        if (owner < 0 || owner > 3) throw new Error("Invalid owner value");
        this.src = "assets/images/pieces/road-p" + owner + ".png";        
    }

    updateCardinality() {
        switch (this.getAttribute(Road.cardinalityAttribute)) {
            case "E":
            case "W":
                this.style.transform = "rotate(0deg)";
                break;
            case "NE":
            case "SW":
                this.style.transform = "rotate(-60deg)";
                break;
            case "NW":
            case "SE":
                this.style.transform = "rotate(60deg)";
                break;
            default:
                throw new Error("Invalid cardinality value");
        }
    }
}

Road.axialAttribute = "axial";
Road.cardinalityAttribute = "cardinality";
Road.ownerAttribute = "owner";

window.customElements.define('frontier-road', Road, {extends: "img"});
module.exports = Road;