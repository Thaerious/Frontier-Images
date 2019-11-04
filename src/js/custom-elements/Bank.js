"use strict";
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const ExchangeController = require("../controller/ExchangeController");

class Bank extends NidgetElement {

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", (event) => this.discardClick(event));
        this.exchangeController = new ExchangeController();
    }

    onReady() {
        this.query("[data-cat]", (e) => e.addEventListener("mousedown", (event) => this.mousedown(event)));
    }

    mousedown(event) {
        if (this.discard) return;
        if (!this.exchangeController.isRunning) this.exchangeController.start(event.srcElement);
    }

    discardClick(event) {
        if (!this.discard) return;
        let src = event.srcElement;
        if (!src.hasAttribute(["data-cat"])) return;
        let resource = src.getAttribute("data-cat");
        this[resource] = this[resource] - 1;
    }

    set ore(value) {
        this.query('nidget-text[data-cat="ore"]')[0].text("" + value);
    }

    get ore() {
        return parseInt(this.query('nidget-text[data-cat="ore"]')[0].text());
    }

    set wheat(value) {
        this.query('nidget-text[data-cat="wheat"]')[0].text("" + value);
    }

    get wheat() {
        return parseInt(this.query('nidget-text[data-cat="wheat"]')[0].text());
    }

    set wood(value) {
        this.query('nidget-text[data-cat="wood"]')[0].text("" + value);
    }

    get wood() {
        return parseInt(this.query('nidget-text[data-cat="wood"]')[0].text());
    }

    set wool(value) {
        this.query('nidget-text[data-cat="wool"]')[0].text("" + value);
    }

    get wool() {
        return parseInt(this.query('nidget-text[data-cat="wool"]')[0].text());
    }

    set brick(value) {
        this.query('nidget-text[data-cat="brick"]')[0].text("" + value);
    }

    get brick() {
        return parseInt(this.query('nidget-text[data-cat="brick"]')[0].text());
    }    

    set discard(value) {
        this.setAttribute("discard", value);
    }

    get discard() {
        return this.getAttribute("discard") === "true";
    }    

}
;

window.customElements.define('frontier-bank', Bank);
module.exports = Bank;