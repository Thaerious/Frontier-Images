"use strict";
const NidgetElement = require("@thaerious/nidget").NidgetElement;

class Bank extends NidgetElement{
    
    set ore(value){
        this.text('[data-cat="ore"]', value);
    }
    
    get ore(){
        return this.text('[data-cat="ore"]');
    }
    
    set wheat(value){
        this.text('[data-cat="wheat"]', value);
    }
    
    get wheat(){
        return this.text('[data-cat="wheat"]');
    }
    
    set wood(value){
        this.text('[data-cat="wood"]', value);
    }
    
    get wood(){
        return this.text('[data-cat="wood"]');
    }
    
    set wool(value){
        this.text('[data-cat="wool"]', value);
    }
    
    get wool(){
        return this.text('[data-cat="wool"]');
    }
    
    set brick(value){
        this.text('[data-cat="brick"]', value);
    }
    
    get brick(){
        return this.text('[data-cat="brick"]');
    }    
    
};

window.customElements.define('frontier-bank', Bank);
module.exports = Bank;