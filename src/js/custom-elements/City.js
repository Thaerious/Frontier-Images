"use strict";
const NidgetAxialImage = require("./NidgetAxialImage");

class City extends NidgetAxialImage {
    constructor() {      
        super();
    }

    connectedCallback(){     
        super.connectedCallback();
        this.src = "assets/images/cards/card-monopoly.png";
        this.setAttribute("is", "frontier-card");
        this.setAttribute("class", "frontier-card");
    }

    static get observedAttributes() {
        return [City.ownerAttribute].concat(super.observedAttributes);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case City.ownerAttribute:
                this.updateOwner(this.getAttribute(City.ownerAttribute));
                break;                
        }
    } 
    
    get owner(){
        return this.getAttribute(City.ownerAttribute);
    }

    set owner(value){
        return this.setAttribute(City.ownerAttribute, value);
    }    

    updateOwner(owner){
        if (owner < 0 || owner > 3) throw new Error("Invalid owner value");
        this.src = "assets/images/pieces/city-p" + owner + ".png";        
    }
}

City.axialAttribute = "axial";
City.ownerAttribute = "owner";

window.customElements.define('frontier-city', City, {extends: "img"});
module.exports = City;