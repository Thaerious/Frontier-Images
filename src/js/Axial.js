"use strict";
const $ = window.$ ? window.$ : require("jquery");

class AxialMap extends Map {

    constructor() {
        super();
    }

    add(axial) {
        if (this.has(axial.toString())) return;
        this.set(axial.toString(), axial);
    }
}

class Axial {
    constructor(x, y, z) {
        if (typeof x === "object") {
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

    is(that) {
        if (this.x !== that.x) return false;
        if (this.y !== that.y) return false;
        if (this.z !== that.z) return false;
        return true;
    }

    toString() {
        return this.x + "," + this.y + "," + this.z;
    }

    sum() {
        return this.x + this.y + this.z;
    }

    static toAxial(x, y, z) {
        if (typeof x === "Axial") return x;
        return new Axial(x, y, z);
    }

    /**
     * True if location is a hex.
     * @param {type} x int or object with {x, y, z}
     * @param {type} y int
     * @param {type} z int
     * @return {undefined}
     */
    static isHex(x, y, z) {
        let ax = new Axial(x, y, z);
        return ax.x + ax.y + ax.z === 0;
    }

    /**
     * True if location is a corner.
     * @param {type} x int or object with {x, y, z}
     * @param {type} y int
     * @param {type} z int
     * @return {undefined}
     */
    static isCorner(x, y, z) {
        let ax = new Axial(x, y, z);
        return ax.x + ax.y + ax.z === 1 || ax.x + ax.y + ax.z === 2;
    }

    /**
     * True if location is an edge.
     * @param {type} x int or object with {x, y, z}
     * @param {type} y int
     * @param {type} z int
     * @return {undefined}
     */
    static isEdge(x, y, z) {
        let ax = new Axial(x, y, z);
        return Math.floor(ax.x + ax.y + ax.z) !== (ax.x + ax.y + ax.z);
    }

    /**
     * Retrieve a list of axials for corners on this location.  If the location
     * is a hex, 6 will be returned, with the 0 location being the top left.  If 
     * the location is an edge two will be returned, order undefined.  If the
     * location is a corner, it will be returned.
     * @param {type} x int or object with {x, y, z}
     * @param {type} y int
     * @param {type} z int
     * @return {undefined}
     */
    static getCornerAxials(x, y = 0, z = 0, map = new AxialMap()) {
        if (x instanceof Array) {
            for (let axial of x) {
                this.getCornerAxials(axial, 0, 0, map);
            }
            return Array.from(map.values());
        }

        let ax = new Axial(x, y, z);
        console.log(ax);

        if (this.isHex(ax)) {
            map.add(new Axial(ax.x, ax.y, ax.z + 1));
            map.add(new Axial(ax.x + 1, ax.y, ax.z + 1));
            map.add(new Axial(ax.x + 1, ax.y, ax.z));
            map.add(new Axial(ax.x + 1, ax.y + 1, ax.z));
            map.add(new Axial(ax.x, ax.y + 1, ax.z));
            map.add(new Axial(ax.x, ax.y + 1, ax.z + 1));
        } else if (this.isEdge(ax)) {
            if (Math.floor(ax.x) !== ax.x) {
                map.add(new Axial(Math.floor(ax.x), ax.y, ax.z));
                map.add(new Axial(Math.ceil(ax.x), ax.y, ax.z));
            } else if (Math.floor(ax.y) !== ax.y) {
                map.add(new Axial(ax.x, Math.floor(ax.y), ax.z));
                map.add(new Axial(ax.x, Math.ceil(ax.y), ax.z));
            } else if (Math.floor(ax.z) !== ax.z) {
                map.add(new Axial(ax.x, ax.y, Math.floor(ax.z)));
                map.add(new Axial(ax.x, ax.y, Math.ceil(ax.z)));
            }
        } else {
            map.add(ax);
        }

        return Array.from(map.values());
    }

    static getEdgeAxials(x, y = 0, z = 0, map = new AxialMap()) {
        if (x instanceof Array) {
            for (let axial of x) {
                this.getEdgeAxials(axial, 0, 0, map);
            }
            return Array.from(map.values());
        }
        let ax = new Axial(x, y, z);

        if (this.isHex(ax)) {
            map.add(new Axial(ax.x + 0.5, ax.y, ax.z + 1));
            map.add(new Axial(ax.x + 1, ax.y, ax.z + 0.5));
            map.add(new Axial(ax.x + 1, ax.y + 0.5, ax.z));
            map.add(new Axial(ax.x + 0.5, ax.y + 1, ax.z));
            map.add(new Axial(ax.x, ax.y + 1, ax.z + 0.5));
            map.add(new Axial(ax.x, ax.y + 0.5, ax.z + 1));
        } else if (this.isCorner(ax)) {
            if (ax.sum() === 1) {
                map.add(new Axial(ax.x + 0.5, ax.y, ax.z));
                map.add(new Axial(ax.x, ax.y + 0.5, ax.z));
                map.add(new Axial(ax.x, ax.y, ax.z + 0.5));
            } else {
                map.add(new Axial(ax.x - 0.5, ax.y, ax.z));
                map.add(new Axial(ax.x, ax.y - 0.5, ax.z));
                map.add(new Axial(ax.x, ax.y, ax.z - 0.5));
            }
        } else {
            map.add(ax);
        }
        return Array.from(map.values());
    }
}

module.exports = Axial;