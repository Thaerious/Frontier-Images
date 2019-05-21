"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget").Nidget;
const Axial = require("./Axial");

class HexAnchor extends Nidget {

    constructor(element, width, height) {
        super(element);
        console.log("here");
        this.width = width;
        this.height = height;
        this.map = new Map();
    }

    connectedCallback(){
        super.connectedCallback();
        if (!this.hasAttribute(HexAnchor.widthAttribute)) throw new Error(`missing attribute on hex-anchor: ${HexAnchor.widthAttribute}`);
        if (!this.hasAttribute(HexAnchor.heightAttribute)) throw new Error(`missing attribute on hex-anchor: ${HexAnchor.heightAttribute}`);        
        this.width = this.getAttribute(HexAnchor.widthAttribute);
        this.height = this.getAttribute(HexAnchor.heightAttribute);
    }

    /**
     * Center element around the row,col hex.
     * See axial co-ordinates https://www.redblobgames.com/grids/hexagons/
     * @param {type} element
     * @param {type} x
     * @param {type} y
     * @return {undefined}
     */
    appendChild(nidget, x, y, z) {
        super.appendChild(nidget);     
        $(nidget).css("position", "absolute");
        $(nidget).css("transform", "translate(-50%, -50%)");
        
        let ax = Axial.toAxial(x, y, z);

        if (Axial.isHex(ax)) this.__appendHex(nidget, ax);
        else if (Axial.isEdge(ax)) this.__appendEdge(nidget, ax);
        else this.__appendCorner(nidget, ax);

        this.map.set(nidget, ax);
    }

    /**
     * Generate catesian co-ordinates from axial.
     * @param {type} x
     * @param {type} y
     */
    hexLoc(x, y, z) {
        let ax = Axial.toAxial(x, y, z);

        let left = 3 / 4 * ax.x * this.width;
        let top = ax.y * this.height;
        top += this.height / 2 * ax.x;
        return {x: left, y: top};
    }

    /**
     * Generate catesian co-ordinates from axial.
     * @param {type} x
     * @param {type} y
     * @param {type} z
     */
    cornerLoc(x, y, z) {
        let ax = Axial.toAxial(x, y, z);

        let hexLoc = null;
        if (ax.x + ax.y + ax.z === 1) {
            hexLoc = this.hexLoc(ax.x - 1, ax.y);
            hexLoc.x += 0.5 * this.width;
        } else {
            hexLoc = this.hexLoc(ax.x, ax.y - 1);
            hexLoc.x -= 0.5 * this.width;
        }
        return hexLoc;
    }

    /**
     * Generate catesian co-ordinates from axial.  One of the x, y, z co-ords
     * must have a decimal value.  If more than one has a decimal value only
     * one will be used, which one is undefined.
     * @param {type} x
     * @param {type} y
     * @param {type} z
     */
    edgeLoc(x, y, z) {
        let ax = Axial.toAxial(x, y, z);
        let loc = this.cornerLoc(Math.floor(ax.x), Math.floor(ax.y), Math.floor(ax.z));

        if (Math.floor(ax.x) !== ax.x) {
            loc.x += this.width / 4;
        } else if (Math.floor(ax.y) !== ax.y) {
            loc.x -= this.width / 8;
            loc.y += this.height / 4;
        } else if (Math.floor(ax.z) !== ax.z) {
            loc.x -= this.width / 8;
            loc.y -= this.height / 4;
        }

        return loc;
    }

    __appendEdge(nidget, x, y, z) {
        let ax = Axial.toAxial(x, y, z);
        let loc = this.edgeLoc(ax);
        nidget.top(loc.y);
        nidget.left(loc.x);
    }

    __appendCorner(nidget, x, y, z) {
        let ax = Axial.toAxial(x, y, z);
        let loc = this.cornerLoc(ax);
        nidget.top(loc.y);
        nidget.left(loc.x);
    }

    __appendHex(nidget, x, y, z) {
        let ax = Axial.toAxial(x, y, z);
        let loc = this.hexLoc(ax);
        nidget.top(loc.y);
        nidget.left(loc.x);
    }

    getAxial(nidget) {
        return this.map.get(nidget);
    }
}

HexAnchor.widthAttribute = "hexWidth";
HexAnchor.heightAttribute = "hexHeight";

const NidgetProto = window.customElements.define('hex-anchor', HexAnchor);
module.exports = HexAnchor;
