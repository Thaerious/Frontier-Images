/* global NodeList */

"use strict";

class DisposableController {
    constructor(owner) {
        this.eventListeners = [];
    }

    addEventListener(element, name, method){
        if (element instanceof NodeList){
            for (let node of element) this.addEventListener(node, name, method);
        } else {
            let callback = (event)=>this[method](event);
            this.eventListeners.push({element: element, name: name, callback: callback});
            element.addEventListener(name, callback);            
        }
    }

    cleanup() {
        for (let object of this.eventListeners) {
            object.element.removeEventListener(object.name, object.callback);
        }
        this.eventListeners = [];
    }
}

module.exports = DisposableController;