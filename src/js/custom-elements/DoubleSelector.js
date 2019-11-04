"use strict";
const NidgetElement = require("@thaerious/nidget").NidgetElement;

class DoubleSelector extends NidgetElement{
    constructor() {      
        super();
        console.log("frontier-selector");        
    }

    connectedCallback(){    
        window.addEventListener("load", ()=>this.ready());
        this.visible = false;
    }
    
    show(callback){
        this.visible = true;
        this.callback = callback;
    }
    
    ready(){
        this.query("[data-cat]", (ele)=>ele.addEventListener("click", (event)=>this.onSelect(event)));
        this.query(".accept")[0].addEventListener("click", (event)=>this.accept());
        this.query(".cancel")[0].addEventListener("click", (event)=>this.cancel());
    }
    
    accept(){
        this.visible = false;
        this.callback({result: "accept", resource: this.selected});
    }
    
    cancel(){
        this.visible = false;
        this.callback({result: "cancel", resource: this.selected});
    }    
    
    onSelect(event){
        let src = event.srcElement.closest("[data-cat]");
        let resource = src.getAttribute("data-cat");
        let targetGroup = event.srcElement.closest(".targets");
        
        targetGroup.query("[data-cat]", e=>e.setAttribute("selected", false));
        targetGroup.query(`[data-cat='${resource}']`, e=>e.setAttribute("selected", true));        
    }
    
    get selected(){
        let elements = this.query("[selected='true']");
        if (elements.length === 0) return null;
        return [
            elements[0].getAttribute("data-cat"),
            elements[1].getAttribute("data-cat")
        ];
    }
}

window.customElements.define('frontier-double-selector', DoubleSelector);
module.exports = DoubleSelector;