/* global Symbol */
"use strict";

/**
 * A map that looks for an objects hashCode function.  Will use that function
 * to replace the key if available.
 */
class HashMap {    
    constructor(){
        this.map = new Map();
        this.hashMap = new Map();
    }
    
    clear(){
        this.map.clear();
        this.hashMap.clear();
    }
    delete(key){
        this.map.delete(key.hashCode ? key.hashCode() : key);
        this.hashMap.delete(key.hashCode ? key.hashCode() : key);
    }
    *entries(){
        for (let hash of this.hashMap.keys()){
            let key = this.hashMap.get(hash);
            let value = this.map.get(hash);
            yield [key, value];
        }
    }
    *hashes(){
        for (let hash of this.hashMap.keys()){
            let key = this.hashMap.get(hash);
            let value = this.map.get(hash);
            yield [hash, key, value];
        }
    }
    forEach(func){
        this.map.forEeach(func);
    }
    get(key){
        return this.map.get(key.hashCode ? key.hashCode() : key);
    }
    has(key){
        return this.map.has(key.hashCode ? key.hashCode() : key);
    }
    keys(){
        return this.hashMap.values();
    }
    
    /**
     * Set or update the key with the value.  If the value is already contained,
     * the previous key-value pair will be unset.
     * @param {type} key
     * @param {type} value
     * @return {undefined}
     */
    set(key, value){
        this.map.set(key.hashCode ? key.hashCode() : key, value);
        this.hashMap.set(key.hashCode ? key.hashCode() : key, key);
    }
    values(){
        return this.map.values();
    }
    [Symbol.iterator](){
        return this.entries();
    }    
}

module.exports = HashMap;