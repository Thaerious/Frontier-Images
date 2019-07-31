"use strict";
const $ = window.$ ? window.$ : require("jquery");
const Nidget = require("@thaerious/nidget");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const HexElement = require("./HexElement");
const Axial = require("../utility/Axial");
const AxialCollection = require("../utility/AxialCollection");
const ReversableMap = require("../utility/ReversableMap");

/**
 * A HexAnchor is an element that has child elements with the axial attribute.
 * It will position all child elements relative to it's self according to the
 * value of the child axial.
 * 
 * An axial attribute is a comma or space delimated value with the name "axial".
 * An axial has three integers {x, y, z} which determine the location of the 
 * element in 2d space.
 */
class HexAnchor extends NidgetElement {
    constructor(element) {
        super(element);
        this.map = new ReversableMap();

        /* see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver */
        let config = {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: [HexAnchor.layoutManagerAttribute, HexAnchor.ratioAttribute, HexAnchor.axialAttribute, HexAnchor.heightAttribute, HexAnchor.widthAttribute]
        };
        this.observer = new MutationObserver((mutationRecord, obs) => this.onMutation(mutationRecord, obs));
        this.observer.observe(this, config);
    }

    connectedCallback() {
        super.connectedCallback();
    }

    onResize(prev) {
        this.relocate();
    }

    onMutation(mutationRecords, observer) {
        for (let mutationRecord of mutationRecords) {
            this._onMutation(mutationRecord);
        }
    }

    _onMutation(mutationRecord) {
        if (mutationRecord.type === "childList") {
            this.childListAdded(mutationRecord.addedNodes);
            this.childListRemoved(mutationRecord.removedNodes);
        }

        if (mutationRecord.type === "attributes") {
            this.attributeChangedCallback(mutationRecord.attributeName, mutationRecord.target);
        }
    }

    childListAdded(added) {
        for (let i = 0; i < added.length; i++) {
            if (added[i] instanceof HTMLElement && added[i].hasAttribute("axial")) {
                this.onAdd(added[i]);
            }
        }
    }

    childListRemoved(removed) {
        for (let i = 0; i < removed.length; i++) {
            if (removed[i].hasAttribute("axial")) {
                this.onRemove(removed[i]);
            }
        }
    }

    attributeChangedCallback(name, target) {
        switch (name) {
            case HexAnchor.axialAttribute:
                this.locate(target);
                break;
            case HexAnchor.layoutManagerAttribute:
                if (this.hasAttribute("layout-manager")) {
                    let mgrName = this.getAttribute("layout-manager");
                    this.layoutManager = new Nidget.layouts[mgrName]();
                } else {
                    this.layoutManager = undefined;
                }
                break;
        }
    }

    onAdd(hexElement) {
        if (this.layoutManager) this.layoutManager.onAdd(hexElement);
        this.locate(hexElement);
    }

    onRemove(hexElement) {
        this.map.delete(hexElement);
        if (this.layoutManager) this.layoutManager.onRemove(hexElement);
    }

    relocate() {
        for (let e of this.children) this.locate(e);
    }

    locate(hexElement) {
        if (hexElement.axial === undefined) {
            throw `Only elements with axial attributes can be located on HexAnchor elements, found: ${hexElement.constructor.name}`;
        }

        $(hexElement).css("position", "absolute");

        let ax = hexElement.axial;
        let loc = null;

        if (ax.isHex()) {
            loc = this.hexLoc(ax);
        } else if (ax.isEdge()) {
            loc = this.edgeLoc(ax);
        } else if (ax.isCorner()) {
            loc = this.cornerLoc(ax);
        } else {
            throw "Invalid axial: " + ax;
        }

        hexElement.locate(loc.x, loc.y);
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
        let loc = null;

        if (ax.x + ax.y + ax.z === 1) {
            loc = this.hexLoc(new Axial(ax.x - 1, ax.y));
            loc.x += 0.5 * this.width;
        } else {
            loc = this.hexLoc(new Axial(ax.x, ax.y - 1));
            loc.x -= 0.5 * this.width;
        }

        loc.x += this.width / 2;
        loc.y += this.height / 2;

        return loc;
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

//        loc.x += this.width / 2;
//        loc.y += this.height / 2;

        return loc;
    }

    getAxial(hexElement) {
        return this.map.get(hexElement);
    }

    getAxials(condition = () => {return true; }){
        let rvalue = new AxialCollection;
        for (let axial of this.map.values()) {
            if (condition(axial)) rvalue.add(axial);
        }
        return rvalue;
    }

    /**
     * Return an array of all elements associated with an axial map.  Will ignore
     * axials for which there is no element.
     * @param {type} AxialCollection
     * @return {undefined}
     */
    getElements(axialCollection) {
        let rvalue = [];
        for (let axial of axialCollection) {
            rvalue.push(this.map.getKey(axial));
        }
        return rvalue;
    }

    /**
     * Return an array of all axial elements that satisfy the filter condition.
     * @param {type} AxialCollection
     * @return {undefined}
     */
    filter(condition = (ax, el) => {return true; }){
        let elements = [];
        let axials = new AxialCollection();

        if (typeof condition === "string") {
            let queryResult = this.query(condition);
            for (let element of queryResult) {
                if (element.hasAttribute("axial")) {
                    elements.push(element);
                    axials.add(element.axial);
                }
            }
        } else {
            for (let entry of this.map.entries()) {
                if (condition(entry[1], entry[0])) {
                    elements.push(entry[0]);
                    axials.add(entry[1]);
                }
            }
        }
        return {elements: elements, axials: axials};
    }

    scale(w, h) {
        if (!h) h = w;
        super.scale(w, h);
        this.height = this.height * h;
        this.width = this.width * w;
    }
}

HexAnchor.axialAttribute = "axial";
HexAnchor.widthAttribute = "hex-width";
HexAnchor.heightAttribute = "hex-height";
HexAnchor.ratioAttribute = "hex-ratio";
HexAnchor.layoutManagerAttribute = "layout-manager";

const NidgetProto = window.customElements.define('hex-anchor', HexAnchor);
module.exports = HexAnchor;
