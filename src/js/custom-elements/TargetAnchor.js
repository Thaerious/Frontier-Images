"use strict";
const NidgetImage = require("@thaerious/nidget").NidgetImage;
const Axial = require("../Axial");

class TargetAnchor extends NidgetImage {
    constructor() {
        super("assets/images/new/circle.png");
    }

    connectedCallback(){       
        if (!this.axial){
            this.axial = "0, 0, 0";
        }
        super.connectedCallback();
    }

    static get observedAttributes() {
        return [TargetAnchor.cardinalityAttribute, TargetAnchor.ownerAttribute];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case TargetAnchor.cardinalityAttribute:
                this.updateCardinality();
                break;
            case TargetAnchor.ownerAttribute:
                this.updateOwner();
                break;                
        }
    } 

    get cardinality(){
        return this.getAttribute(TargetAnchor.cardinalityAttribute);
    }

    set cardinality(value){
        return this.setAttribute(TargetAnchor.cardinalityAttribute, value);
    }
    
    get owner(){
        return this.getAttribute(TargetAnchor.ownerAttribute);
    }

    set owner(value){
        return this.setAttribute(TargetAnchor.ownerAttribute, value);
    }    

    updateOwner(){
        let owner = this.getAttribute(TargetAnchor.ownerAttribute);
        if (owner < 0 || owner > 3) throw new Error("Invalid owner value");
        this.src = "assets/images/pieces/road-p" + owner + ".png";        
    }

    updateCardinality() {
        switch (this.getAttribute(TargetAnchor.cardinalityAttribute)) {
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

    /**
     * Accepts either a string or an axial object.
     */
    set axial(ax){
        if (typeof(ax) === "string"){
            this.setAttribute(TargetAnchor.axialAttribute, ax);
        } else {
            this.setAttribute(TargetAnchor.axialAttribute, `${ax.x}, ${ax.y}, ${ax.z}`);
        }
    }
    
    /**
     * Returns an axial object.
     */
    get axial(){
        let axialString = this.getAttribute(TargetAnchor.axialAttribute);
        if (!axialString) return undefined;
        return new Axial(axialString);
    }    
}

TargetAnchor.axialAttribute = "axial";
TargetAnchor.cardinalityAttribute = "cardinality";
TargetAnchor.ownerAttribute = "owner";

window.customElements.define('frontier-road', TargetAnchor);
module.exports = TargetAnchor;