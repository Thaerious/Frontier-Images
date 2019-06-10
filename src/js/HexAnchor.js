"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const HexElement = require("./HexElement");
const Axial = require("./Axial");

class HexAnchor extends NidgetElement {

    constructor(element, width, height) {
        super(element);
        this.map = new Map();

        /* see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver */
        let config = {attributes: true, childList: true, subtree: true, attributeFilter: ["axial", "hexwidth", "hexheight"]};
        this.observer = new MutationObserver((mr, obs) => this.onMutation(mr, obs));
        this.observer.observe(this, config);
    }

    get width(){
        return $(this).attr(HexAnchor.widthAttribute);
    }

    get height(){
        return $(this).attr(HexAnchor.heightAttribute);
    }
    
    set width(v){
        return $(this).attr(HexAnchor.widthAttribute, v);
    }

    set height(v){
        return $(this).attr(HexAnchor.heightAttribute, v);
    }    

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute(HexAnchor.widthAttribute)) throw new Error(`missing attribute on hex-anchor: ${HexAnchor.widthAttribute}`);
        if (!this.hasAttribute(HexAnchor.heightAttribute)) throw new Error(`missing attribute on hex-anchor: ${HexAnchor.heightAttribute}`);
        this.width = this.getAttribute(HexAnchor.widthAttribute);
        this.height = this.getAttribute(HexAnchor.heightAttribute);
    }

    onMutation(mutationRecords, observer) {
        for (let mutationRecord of mutationRecords) {
            this._onMutation(mutationRecord);
        }
    }

    onAdd(hexElement){
        this.locate(hexElement);
    }

    _onMutation(mutationRecord) {
        let added = mutationRecord.addedNodes;
        for (let i = 0; i < added.length; i++) {
            if (added[i] instanceof HexElement) {
                this.onAdd(added[i]);
            }
        }
        
        if (mutationRecord.attributeName === "axial"){
            this.locate(mutationRecord.target);
        }
        else if (mutationRecord.attributeName === "hexwidth"){
            this.relocate();
        }
        else if (mutationRecord.attributeName === "hexheight"){
            this.relocate();
        }
    }

    relocate(){
        $(this).find("hex-element").each((i, e)=>this.locate(e));
    }

    locate(hexElement) {
        if (hexElement instanceof HexElement === false) {
            throw "Only HexElement elements can be located on HexAnchor elements";
        }

        $(hexElement).css("position", "absolute");
        $(hexElement).css("transform", "translate(-50%, -50%)");

        let ax = hexElement.axial;
        let loc = null;

        if (Axial.isHex(ax)) {
            loc = this.hexLoc(ax);
        } else if (Axial.isEdge(ax)) {
            loc = this.edgeLoc(ax);
        } else if (Axial.isCorner(ax)) {
            loc = this.cornerLoc(ax);
        } else {
            throw "Invalid axial: " + ax;
        }

        hexElement.top(loc.y);
        hexElement.left(loc.x);
        this.map.set(hexElement, ax);
    }

    /**
     * Generate catesian co-ordinates from axial.
     * @param {type} x
     * @param {type} y
     */
    hexLoc(ax) {
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
    cornerLoc(ax) {
        let hexLoc = null;

        if (ax.x + ax.y + ax.z === 1) {
            hexLoc = this.hexLoc(new Axial(ax.x - 1, ax.y));
            hexLoc.x += 0.5 * this.width;
        } else {
            hexLoc = this.hexLoc(new Axial(ax.x, ax.y - 1));
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
    edgeLoc(ax) {
        let loc = this.cornerLoc(new Axial(Math.floor(ax.x), Math.floor(ax.y), Math.floor(ax.z)));

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

    getAxial(hexElement) {
        return this.map.get(hexElement);
    }
}

HexAnchor.widthAttribute = "hexWidth";
HexAnchor.heightAttribute = "hexHeight";

const NidgetProto = window.customElements.define('hex-anchor', HexAnchor);
module.exports = HexAnchor;
