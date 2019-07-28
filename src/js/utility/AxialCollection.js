/* global Symbol */
"use strict";
const HashMap = require("./HashMap");

/**
 * A map to contain objects with hexes(), edges(), and corners() methods.
 */

class AxialCollection {

    constructor() {
        this.map = new HashMap();
    }

    add(axial) {
        this.map.set(axial, axial);
    }

    /**
     * Create a new map of all corners connected to all axials in this collection.
     * Will append to a passed in map if provided.
     */
    corners(map = new AxialCollection()) {
        for (let ax of this.map.values()) {
            map.add(ax.corners());
        }
        return map;
    }

    /**
     * Create a new map of all edges connected to all axials in this collection.
     * Will append to a passed in map if provided.
     */
    edges(map = new AxialCollection()) {
        for (let ax of this.map.values()) {
            map.add(ax.edges());
        }
        return map;
    }

    /**
     * Create a new map of all hexes connected to all axials in this collection.
     * Will append to a passed in map if provided.
     */
    hexes(map = new AxialCollection()) {
        for (let ax of this.map.values()) {
            map.add(ax.hexes());
        }
        return map;
    }

    /**
     * Create a new map all axials that pass 'test'.
     * Will append to a passed in map if provided.
     * @return {undefined}
     */
    filter(test, map = new AxialCollection()) {
        for (let ax of this.map.values()) {
            if (test(ax)) {
                map.add(ax.hexes());
            }
        }
        return map;
    }

    /**
     * Add all axials from external map.
     * @param {type} map
     * @return {undefined}
     */
    union(that, map = new AxialCollection()) {
        for (let ax of this.map.values) {
            map.add(ax);
        }
        for (let ax of that) {
            map.add(ax);
        }
        return map;
    }

    [Symbol.iterator] () {
        return this.map.values();
    }
}

module.exports = AxialCollection;