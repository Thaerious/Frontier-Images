const $ = window.$ ? window.$ : require("jquery");
const NidgetElement = require("@thaerious/nidget").NidgetElement;
const FileOperations = require("@thaerious/nidget").FileOperations;

class Store extends NidgetElement{
    constructor(){
        super();
    }
    
    async load(){
        let element = await FileOperations.loadDOMElement("assets/fragments/store.frag.html");
        this.setElement(element);
       
        this.road = $(this.getElement()).find(".road");
        this.village = $(this.getElement()).find(".village");
        this.city = $(this.getElement()).find(".city");
        this.card = $(this.getElement()).find(".card");

        this.setupEvents();
        return this;
    }
    
    setupEvents(){
       this.road.on("click", (event)=>{
            this.notifyListeners("clickRoad");
        });
        
        this.village.on("click", (event)=>{       
            this.notifyListeners("clickVillage");
        });
        
        this.city.on("click", (event)=>{       
            this.notifyListeners("clickCity");
        });
        
        this.card.on("click", (event)=>{       
            this.notifyListeners("clickCard");
        });        
    }
}

module.exports = Store;