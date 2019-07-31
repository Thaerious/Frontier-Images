"use strict";
const NidgetAxialImage = require("./NidgetAxialImage");
const Cardinality = require("../utility/Cardinality");

class Road extends NidgetAxialImage {
    constructor() {      
        super();
    }

    connectedCallback(){     
        super.connectedCallback();
        this.src = "assets/images/pieces/road-p0.png";
        this.setAttribute("is", "frontier-road");
        this.setAttribute("class", "frontier-road");
    }

    static get observedAttributes() {
        return [Road.cardinalityAttribute, Road.ownerAttribute].concat(super.observedAttributes);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case Road.cardinalityAttribute:
                this.updateCardinality(this.getAttribute(Road.cardinalityAttribute));
                break;
            case Road.ownerAttribute:
                this.updateOwner(this.getAttribute(Road.ownerAttribute));
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

    updateOwner(owner){
        if (owner < 0 || owner > 3) throw new Error("Invalid owner value");
        this.src = "assets/images/pieces/road-p" + owner + ".png";        
    }

    updateCardinality(value, clearTransformer = true) {
        if (clearTransformer) this.transformer.clear();        
        
        switch (value) {
            case Cardinality.north:
            case Cardinality.south:
                this.transformer.append().push("rotate(0deg)");
                break;
            case Cardinality.northEast:
            case Cardinality.southWest:
                this.transformer.append().push("rotate(60deg)");
                break;
            case Cardinality.northWest:
            case Cardinality.southEast:
                this.transformer.append().push("rotate(-60deg)");
                break;
            default:
                throw new Error("Invalid cardinality value: " + value);
        }
    }
}

Road.axialAttribute = "axial";
Road.cardinalityAttribute = "cardinality";
Road.ownerAttribute = "owner";

window.customElements.define('frontier-road', Road, {extends: "img"});
module.exports = Road;