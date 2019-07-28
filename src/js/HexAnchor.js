"use strict";
const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const HexElement = require("./HexElement");
const Axial = require("./Axial");
const AxialCollection = require("./utility/AxialCollection");
const ReversableMap = require("./utility/ReversableMap");

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
            attributeFilter: [HexAnchor.ratioAttribute, HexAnchor.axialAttribute, HexAnchor.heightAttribute, HexAnchor.widthAttribute]
        };
        this.observer = new MutationObserver((mutationRecord, obs) => this.onMutation(mutationRecord, obs));
        this.observer.observe(this, config);
    }

    onMutation(mutationRecords, observer) {
        for (let mutationRecord of mutationRecords) {
            this._onMutation(mutationRecord);
        }
    }

    _onMutation(mutationRecord) {
        if (mutationRecord.type === "childList"){
            this.childListAdded(mutationRecord.addedNodes);
            this.childListRemoved(mutationRecord.removedNodes);
        }
        
        if (mutationRecord.type === "attributes"){               
            this.attributeChangedCallback(mutationRecord.attributeName, mutationRecord.target);
        }
    }

    childListAdded(added){
        for (let i = 0; i < added.length; i++) {
            if (added[i] instanceof HexElement) {
                this.onAdd(added[i]);
            }
        }        
    }
    
    childListRemoved(removed){
        for (let i = 0; i < removed.length; i++) {
            if (removed[i] instanceof HexElement) {
                this.onRemove(removed[i]);
            }
        }        
    }    

    attributeChangedCallback(name, target) {
        switch (name) {
            case HexAnchor.ratioAttribute:
                this.checkRatio(target);
            break;
            case HexAnchor.axialAttribute:
                this.locate(target);
            break;
            case HexAnchor.widthAttribute:
            case HexAnchor.heightAttribute:
                this.relocate();
            break;
        }
    }

    get hexWidth(){
        return $(this).attr(HexAnchor.widthAttribute);
    }

    get hexHeight(){
        return $(this).attr(HexAnchor.heightAttribute);
    }
    
    set hexWidth(v){
        return $(this).attr(HexAnchor.widthAttribute, v);
    }

    set hexHeight(v){
        return $(this).attr(HexAnchor.heightAttribute, v);
    }    

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute(HexAnchor.widthAttribute)) throw new Error(`missing attribute on hex-anchor: ${HexAnchor.widthAttribute}`);
        if (!this.hasAttribute(HexAnchor.heightAttribute)) throw new Error(`missing attribute on hex-anchor: ${HexAnchor.heightAttribute}`);
        this.hexWidth = this.getAttribute(HexAnchor.widthAttribute);
        this.hexHeight = this.getAttribute(HexAnchor.heightAttribute);
    }

    onAdd(hexElement){
        this.locate(hexElement);
        this.checkRatio(hexElement);
    }
    
    onRemove(hexElement){
        this.map.delete(hexElement);
    }

    relocate(){
        console.log("relocate");
        for (let e of this.children) this.locate(e);
    }

    /**
     * Look for a space/comma/colon deliminated string that will bind this elements
     * size to the current hex width or hex height.  The format is
     * binding-dimension, width-ratio, height-ratio.  binding-dimension = {"hex-width", "hex-height"}.
     * @param {type} hexElement
     * @return {undefined}
     */
    checkRatio(hexElement){
        if (!hexElement.hasAttribute(HexAnchor.ratioAttribute)) return;
        let string = hexElement.getAttribute(HexAnchor.ratioAttribute);
        let settings = string.split(/[ ,]+/g);
        
        let widthRatio = settings[1];
        let heightRatio = settings[2] ? settings[2] : settings[1];
        
        console.log(this.hexWidth + ", " + this.hexWidth);
        
        if (settings[0] === "hex-width"){
            hexElement.width = this.hexWidth * widthRatio;
            hexElement.height = this.hexWidth * heightRatio;
        }else{
            hexElement.width = this.hexHeight * widthRatio;
            hexElement.height = this.hexHeight * heightRatio;
        }        
    }

    locate(hexElement) {  
        if (hexElement.axial === undefined){
            throw `Only elements with axial attributes can be located on HexAnchor elements, found: ${hexElement.constructor.name}`;
        }

        $(hexElement).css("position", "absolute");
        $(hexElement).css("transform", "translate(-50%, -50%)");

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
        let left = 3 / 4 * ax.x * this.hexWidth;
        let top = ax.y * this.hexHeight;
        top += this.hexHeight / 2 * ax.x;
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
            hexLoc.x += 0.5 * this.hexWidth;
        } else {
            hexLoc = this.hexLoc(new Axial(ax.x, ax.y - 1));
            hexLoc.x -= 0.5 * this.hexWidth;
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
            loc.x += this.hexWidth / 4;
        } else if (Math.floor(ax.y) !== ax.y) {
            loc.x -= this.hexWidth / 8;
            loc.y += this.hexHeight / 4;
        } else if (Math.floor(ax.z) !== ax.z) {
            loc.x -= this.hexWidth / 8;
            loc.y -= this.hexHeight / 4;
        }

        return loc;
    }

    getAxial(hexElement) {
        return this.map.get(hexElement);
    }
    
    getAxials(condition = ()=>{return true;}){
        let rvalue = new AxialCollection;
        for (let axial of this.map.values()){
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
    getElements(axialCollection){
        let rvalue = [];
        for (let axial of axialCollection){
            rvalue.push(this.map.getKey(axial));
        }
        return rvalue;
    }
    
    /**
     * Return an array of all elements that satisfy the filter condition.
     * @param {type} AxialCollection
     * @return {undefined}
     */    
    filter(condition = (ax, el)=>{return true;}){
        let elements = [];
        let axials = [];
        for (let entry of this.map.entries()){
            if (condition(entry[1], entry[0])){
                elements.push(entry[0]);
                axials.push(entry[1]);
            }
        }
        return {elements: elements, axials: axials};
    }
            
    scale(w, h){
        if (!h) h = w;
        super.scale(w, h);
        this.hexHeight = this.hexHeight * h;
        this.hexWidth = this.hexWidth * w;
        
    }
}

HexAnchor.axialAttribute = "axial";
HexAnchor.widthAttribute = "hex-width";
HexAnchor.heightAttribute = "hex-height";
HexAnchor.ratioAttribute = "hex-ratio";

const NidgetProto = window.customElements.define('hex-anchor', HexAnchor);
module.exports = HexAnchor;
