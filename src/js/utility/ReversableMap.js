/* global Symbol */
"use strict";

class ReversableMap{    
    constructor(){
        this.map = new Map();
        this.reverse = new Map();
    }
    
    clear(){
        this.map.clear();
        this.reverse.clear();
    }
    delete(key){
        let value = this.map.get(key);
        this.map.delete(key);
        this.reverse.delete(value);
    }
    entries(){
        return this.map.entries();
    }
    forEach(func){
        this.map.forEeach(func);
    }
    get(key){
        if (key.hashCode) key = key.hashCode();
        return this.map.get(key);
    }
    getKey(value){
        if (value.hashCode) value = value.hashCode();
        return this.reverse.get(value);
    }
    has(key){
        if (key.hashCode) key = key.hashCode();
        return this.map.get(key);
    }
    hasValue(value){
        if (value.hashCode) value = value.hashCode();
        return this.reverse.has(value);
    }
    keys(){
        return this.map.keys();
    }
    
    /**
     * Set or update the key with the value.  If the value is already contained,
     * the previous key-value pair will be unset.
     * @param {type} key
     * @param {type} value
     * @return {undefined}
     */
    set(key, value){
        if (this.reverse.has(value.hashCode ? value.hashCode() : value)){
            let rKey = this.reverse.get(value);
            if (rKey) this.map.delete(rKey.hashCode ? rKey.hashCode() : rKey);
            this.reverse.delete(value.hashCode ? value.hashCode() : value);
        }
        
        this.map.set(key.hashCode ? key.hashCode() : key, value);
        this.reverse.set(value.hashCode ? value.hashCode() : value, key);        
    }
    values(){
        return this.map.values();
    }
    [Symbol.iterator](){
        return this.map[Symbol.iterator];
    }    
}

module.exports = ReversableMap;