"use strict";
const NidgetElement = require("@thaerious/nidget").NidgetElement;

class CardHolder extends NidgetElement{

};

window.customElements.define('frontier-cardholder', CardHolder);
module.exports = CardHolder;