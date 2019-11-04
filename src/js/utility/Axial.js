"use strict";
const $ = window.$ ? window.$ : require("jquery");
const AxialCollection = require("./AxialCollection");
const Cardinality = require("./Cardinality");

//
//        (z)------
//       /   \      \
//      /     \      \
//     <       o-----(x)
//      \     /      /
//       \   /      /
//        (y)------
// - when inwards, + when outwards
//
// Hexes co-ords sum to 0
// Corners co-orgs sum to 1 or 2
// - 1 indicates x,y,z corner axial
// - 2 indicates non-x,y,z corner axial (2 hops from center)
// Edges have a fractional value on the shared axis.

class Axial {
    constructor(x, y, z) {
        if (typeof x === "string") {
            this.parseFrom(x);
        } else if (typeof x === "object") {
            if (typeof x.getAxial !== "undefined") {
                return x.getAxial();
            } else {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            }
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        if (this.z === undefined) this.z = -this.x - this.y;
    }

    parseFrom(string) {
        if (string !== "" && string !== null) {
            let axialArray = string.split(/[ ,]+/g);
            this.x = axialArray.length >= 1 ? parseFloat(axialArray[0]) : 0;
            this.y = axialArray.length >= 2 ? parseFloat(axialArray[1]) : 0;
            this.z = axialArray.length >= 3 ? parseFloat(axialArray[2]) : 0;
        } else {
            throw new Error("Invalid axial string");
        }
    }

    is(that) {
        if (this.x !== that.x) return false;
        if (this.y !== that.y) return false;
        if (this.z !== that.z) return false;
        return true;
    }

    sum() {
        return this.x + this.y + this.z;
    }

    /**
     * True if location is a hex.
     * @param {type} x int or object with {x, y, z}
     * @param {type} y int
     * @param {type} z int
     * @return {undefined}
     */
    isHex() {
        return this.x + this.y + this.z === 0;
    }

    /**
     * True if location is a corner.
     * @param {type} x int or object with {x, y, z}
     * @param {type} y int
     * @param {type} z int
     * @return {undefined}
     */
    isCorner() {
        return this.x + this.y + this.z === 1 || this.x + this.y + this.z === 2;
    }

    /**
     * True if location is an edge.
     * @param {type} x int or object with {x, y, z}
     * @param {type} y int
     * @param {type} z int
     * @return {undefined}
     */
    isEdge() {
        return Math.floor(this.x + this.y + this.z) !== (this.x + this.y + this.z);
    }

    /**
     * Return an array of all edges from this axial.  If this axial is an edge
     * only this is added.  If map provided all axials are appended to the map, then
     * an array from the map's values is returned.
     */
    edges(map = new AxialCollection()) {
        if (this.isHex()) {
            map.add(new Axial(this.x + 0.5, this.y, this.z + 1));
            map.add(new Axial(this.x + 1, this.y, this.z + 0.5));
            map.add(new Axial(this.x + 1, this.y + 0.5, this.z));
            map.add(new Axial(this.x + 0.5, this.y + 1, this.z));
            map.add(new Axial(this.x, this.y + 1, this.z + 0.5));
            map.add(new Axial(this.x, this.y + 0.5, this.z + 1));
        } else if (this.isCorner()) {
            if (this.sum() === 1) {
                map.add(new Axial(this.x + 0.5, this.y, this.z));
                map.add(new Axial(this.x, this.y + 0.5, this.z));
                map.add(new Axial(this.x, this.y, this.z + 0.5));
            } else {
                map.add(new Axial(this.x - 0.5, this.y, this.z));
                map.add(new Axial(this.x, this.y - 0.5, this.z));
                map.add(new Axial(this.x, this.y, this.z - 0.5));
            }
        } else {
            map.add(this);
        }
        return map;
    }

    /**
     * Direction from this axial to target axial.
     * @returns {undefined}
     */
    cardinality(target) {
        let diff = this.diff(target);
        
        switch(diff.toString()){
            /* from hex to edge */
            case "0.5 0 1": return Cardinality.north;
            case "1 0 0.5": return Cardinality.northEast;
            case "1 0.5 0": return Cardinality.southEast;
            case "0.5 1 0": return Cardinality.south;
            case "0 1 0.5": return Cardinality.southWest;
            case "0 0.5 1": return Cardinality.northWest;
            
            /* from edge to hex */
            case "-0.5 0 -1": return Cardinality.south;
            case "-1 0 -0.5": return Cardinality.southWest;
            case "-1 -0.5 0": return Cardinality.northWest;
            case "-0.5 -1 0": return Cardinality.north;
            case "0 -1 -0.5": return Cardinality.northEast;
            case "0 -0.5 -1": return Cardinality.southEast;            
            
            /* from hex to corner */
            case "1 0 0": return Cardinality.east;
            case "1 1 0": return Cardinality.southEast;
            case "0 1 0": return Cardinality.southWest;
            case "0 1 1": return Cardinality.west;
            case "0 0 1": return Cardinality.northWest;
            case "1 0 1": return Cardinality.northEast;
            
            /* from corner to hex */
            case "-1 0 0": return Cardinality.west;
            case "-1 -1 0": return Cardinality.northWest;
            case "0 -1 0": return Cardinality.northEast;
            case "0 -1 -1": return Cardinality.east;
            case "0 0 -1": return Cardinality.southEast;
            case "-1 0 -1": return Cardinality.southWest;            
            
            default: return null;
        }
    }

    /**
     * Return an array of all corners from this axial.  If this axial is a corner
     * only this is added.  If map provided all axials are appended to the map, then
     * an array from the map's values is returned.
     */
    corners(map = new AxialCollection()) {
        if (this.isHex()) {
            map.add(new Axial(this.x, this.y, this.z + 1));
            map.add(new Axial(this.x + 1, this.y, this.z + 1));
            map.add(new Axial(this.x + 1, this.y, this.z));
            map.add(new Axial(this.x + 1, this.y + 1, this.z));
            map.add(new Axial(this.x, this.y + 1, this.z));
            map.add(new Axial(this.x, this.y + 1, this.z + 1));
        } else if (this.isEdge()) {
            if (Math.floor(this.x) !== this.x) {
                map.add(new Axial(Math.floor(this.x), this.y, this.z));
                map.add(new Axial(Math.ceil(this.x), this.y, this.z));
            } else if (Math.floor(this.y) !== this.y) {
                map.add(new Axial(this.x, Math.floor(this.y), this.z));
                map.add(new Axial(this.x, Math.ceil(this.y), this.z));
            } else if (Math.floor(this.z) !== this.z) {
                map.add(new Axial(this.x, this.y, Math.floor(this.z)));
                map.add(new Axial(this.x, this.y, Math.ceil(this.z)));
            }
        } else {
            map.add(this);
        }

        return map;
    }

    hexes(map = new AxialCollection()) {
        if (this.isEdge()) {
            if (Math.floor(this.x) !== this.x) {
                map.add(new Axial(Math.floor(this.x), this.y, this.z - 1));
                map.add(new Axial(Math.floor(this.x), this.y - 1, this.z));
            } else if (Math.floor(this.y) !== this.y) {
                map.add(new Axial(this.x - 1, Math.floor(this.y), this.z));
                map.add(new Axial(this.x, Math.floor(this.y), this.z - 1));
            } else if (Math.floor(this.z) !== this.z) {
                map.add(new Axial(this.x - 1, this.y, Math.floor(this.z)));
                map.add(new Axial(this.x, this.y - 1, Math.floor(this.z)));
            }
        } else if (this.isCorner()) {
            if (this.sum() === 1) {
                map.add(new Axial(this.x - 1, this.y, this.z));
                map.add(new Axial(this.x, this.y - 1, this.z));
                map.add(new Axial(this.x, this.y, this.z - 1));
            } else {
                map.add(new Axial(this.x - 1, this.y - 1, this.z));
                map.add(new Axial(this.x, this.y - 1, this.z - 1));
                map.add(new Axial(this.x - 1, this.y, this.z - 1));
            }
        } else {
            map.add(this);
        }
        return map;
    }

    toString() {
        return this.x + " " + this.y + " " + this.z;
    }

    hashCode() {
        return this.toString();
    }
    
    /**
     * This axial - that axial
     * @returns {undefined}
     */
    diff(that){
        return new Axial(this.x - that.x, this.y - that.y, this.z - that.z);
    }
    
    equals(that){
        if (this.x !== that.x) return false;
        if (this.y !== that.y) return false;
        if (this.z !== that.z) return false;
        return true;
    }
}

module.exports = Axial;