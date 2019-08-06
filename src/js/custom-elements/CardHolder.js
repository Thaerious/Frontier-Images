/* global HTMLElement */

"use strict";
const NidgetElement = require("@thaerious/nidget").NidgetElement;

class CardHolder extends NidgetElement {
    constructor(element) {
        super(element);

        /* see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver */
        let config = {
            childList: true
        };
        this.observer = new MutationObserver((mutationRecord, obs) => this.onMutation(mutationRecord, obs));
        this.observer.observe(this, config);
    }    

    onResize(){
        let rect = document.querySelector("#mapAnchor").getBoundingClientRect();
        this.left = rect.left;
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
    }

    childListAdded(added) {
        for (let i = 0; i < added.length; i++) {
            if (added[i] instanceof HTMLElement) {
                this.onAdd(added[i]);
            }
        }
    }

    childListRemoved(removed) {
        for (let i = 0; i < removed.length; i++) {
            if (removed[i] instanceof HTMLElement) {
                this.onRemove(removed[i]);
            }
        }
    }

    onAdd(element) {
        this.relocate();
    }

    onRemove(element) {
    }
    
    relocate(){
        let cards = this.query(".frontier-card");
        let dx = this.width * .4;
        let n = cards.length;
        let m = n / 2;
        let curx = -1 * m * dx;
        
        for (let i = 0; i < cards.length; i++){
            let card = cards[i];
            card.left = curx;
            curx = curx + dx;
        }
    }
}
;

window.customElements.define('frontier-cardholder', CardHolder);
module.exports = CardHolder;