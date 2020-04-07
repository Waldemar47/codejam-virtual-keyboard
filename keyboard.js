var choice = 0;

const Keyboard_virtual = {
   
    elements: {
        keys: [],
        keysContainer: null,
        main: null,
    },

    eventHandlers: {
        oninput: null,
        onclose: null,
    },

    properties:{
        capsLock: false,
         value: "",
    },

    init() {

        //create elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // processing of basic elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // need to add elements to the tree
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        

       //  use physical keyboard for elements.
       document.querySelectorAll(".use-keyboard-input").forEach(element => {
        element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
                element.value = currentValue;
            });
        });
    });
},

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const key_view = [[
            "!", "$", "%", "&", "/", "(", ")", "[", "]", "{", "}",
            "tab","1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "translate", "z", "x", "c", "v", "b", "n", "m", ",", ".", "#",
            "blank"
        ],
        [
            "!", "$", "%", "&", "/", "(", ")", "[", "]", "{", "}",
            "tab","1", "2","3", "4", "5", "6", "7", "8", "9", "0",
            "а", "б", "в", "г", "д", "е", "ж", "з", "и", "к", "backspace",
            "caps", "л", "м", "н", "о", "п", "р", "с", "т", "у", "enter",
            "translate", "ф", "х", "ц", "ч", "ш", "ь", "э", "ю", "я", "#",
            "blank"
        ]];

       
        // connect icons from google page to HTML 
            const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        key_view[choice].forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["}","0", "backspace", "enter", "#"].indexOf(key) !== -1;

            // adding attributes and classes to elements
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key_wide");
                    keyElement.innerHTML = createIconHTML("keyboard_backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key_wide", "keyboard__key_activatable");
                    keyElement.innerHTML = createIconHTML("spellcheck");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key_active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key_wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "blank":
                    keyElement.classList.add("keyboard__key_extra_wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                    case "tab":
                    keyElement.classList.add("keyboard__key_wide");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "    ";
                        this._triggerEvent("oninput");
                    }); 

                    break;

                case "translate":
                    keyElement.classList.add("keyboard__key_wide");
                    keyElement.innerHTML = createIconHTML("translate");

                    keyElement.addEventListener("click", () => {
                        this._openRu_En();
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
      
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
        
    //function to replace uppercase and lowercase letters

    _toggleCapsLock() {
    
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    //function to replace "En" and "Ru" letters

    _openRu_En(){
        this.properties.capsLock = !this.properties.capsLock;
        this.properties.capsLock ? choice = 1 :  choice = 0;
        Keyboard_virtual.init();
       
       
    },
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard_virtual.init();
});
