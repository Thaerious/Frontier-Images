"use strict";
const NidgetHTMLImage = require("@thaerious/nidget").NidgetHTMLImage;

class Card extends NidgetHTMLImage {
    constructor() {      
        super();
    }

    connectedCallback(){     
        this.src = "assets/images/cards/card-monopoly.png";
        this.setAttribute("is", "frontier-card");
        this.setAttribute("class", "frontier-card");
    }

    static get observedAttributes() {
        return [Card.typeAttribute].concat(super.observedAttributes);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case Card.typeAttribute:
                this.updateType(this.getAttribute(Card.typeAttribute));
                break;                
        }
    }
    
    get type(){
        return this.getAttribute(Card.typeAttribute);
    }

    set type(value){
        return this.setAttribute(Card.typeAttribute, value);
    }    

    updateOwner(type){
        this.src = `assets/images/cards/card-${type}.png`;
    }
}

Card.typeAttribute = "type";

window.customElements.define('frontier-card', Card, {extends: "img"});
module.exports = Card;