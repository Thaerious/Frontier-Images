"use strict";
const NidgetAxialImage = require("./NidgetAxialImage");

class Village extends NidgetAxialImage {
    constructor() {      
        super();
    }

    connectedCallback(){     
        super.connectedCallback();
        this.src = "assets/images/pieces/village-p0.png";
        this.setAttribute("is", "frontier-village");
        this.setAttribute("class", "frontier-village");
    }

    static get observedAttributes() {
        return [Village.ownerAttribute].concat(super.observedAttributes);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case Village.ownerAttribute:
                this.updateOwner(this.getAttribute(Village.ownerAttribute));
                break;                
        }
    } 
    
    get owner(){
        return this.getAttribute(Village.ownerAttribute);
    }

    set owner(value){
        return this.setAttribute(Village.ownerAttribute, value);
    }    

    updateOwner(owner){
        if (owner < 0 || owner > 3) throw new Error("Invalid owner value");
        this.src = "assets/images/pieces/village-p" + owner + ".png";        
    }
}

Village.axialAttribute = "axial";
Village.ownerAttribute = "owner";

window.customElements.define('frontier-village', Village, {extends: "img"});
module.exports = Village;