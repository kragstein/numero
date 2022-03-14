this.numero = this.numero || {};

this.numero.game = function (retValue) {

  console.log("hello from numero");

  // Keyboard tag

  // Buttons
  var button = document.createElement("template");
  button.innerHTML = "<button>key</button>";

  var digitsKeyboard = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "↩", "⌫"],
  ];
  var digits = [].concat.apply([], digitsKeyboard);

  var keyboardHTMLElement = document.createElement("template");

  keyboardHTMLElement.innerHTML = `
    <style>
      .row {
  			display: flex;
  			width: 100%;
  			margin: 0 auto 8px;
  			touch-action: manipulation;
  		}
      button {
          font-family: inherit;
          font-size: inherit;
  			  font-weight: bold;
    			border: 0;
    			padding: 0;
    			margin: 0 6px 0 0;
    			height: 58px;
    			border-radius: 4px;
    			cursor: pointer;
    			user-select: none;
    			background-color: #d4d7db;
    			color: black;
    			flex: 1;
    			display: flex;
    			justify-content: center;
    			align-items: center;
    			text-transform: uppercase;
    			-webkit-tap-highlight-color: rgba(0,0,0,0.3);
        }
    </style>
    <div id="keyboard"></div>
  `;

  var keyboard = function(htmlElement) {

    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction , [{
      key: "connectedCallback",
      value: function () {
        var lThis = this;

        this.shadowRoot.appendChild(keyboardHTMLElement.content.cloneNode(!0));
        this.$keyboard = this.shadowRoot.getElementById("keyboard");

        digitsKeyboard.forEach(function (line) {

          var row = document.createElement("div");
          row.classList.add("row");
          line.forEach(function (digit) {
            var digitButton = button.content.cloneNode(!0);
            digitButton.firstElementChild.textContent = digit;
            digitButton.firstElementChild.dataset.key = digit;
            row.appendChild(digitButton);
          });
          lThis.$keyboard.appendChild(row);
        });

        this.$keyboard.addEventListener("click", function(a) {
          var target = a.target.closest("button");
          if (target) {
            if (lThis.$keyboard.contains(target)) {
              lThis.dispatchKeyPressEvent(target.dataset.key);
            }
          }
        });
        window.addEventListener("keydown", (function(a) {
           if (!0 !== a.repeat) {
             var s = a.key;
             if (digits.includes(s) || "Backspace" === s || "Enter" === s) {
               lThis.dispatchKeyPressEvent(s);
             }
           }
         }));
      }
    }, {
      key: "dispatchKeyPressEvent",
      value: function(e) {
        console.log(e);
        // this.dispatchEvent(new CustomEvent("game-key-press", {
        //   bubbles: !0,
        //   composed: !0,
        //   detail: {
        //     key: e
        //   }
        // }));
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("game-keyboard", keyboard);


  // Numero Root

  var numeroRootElement = document.createElement("template");
  numeroRootElement.innerHTML = `
    <style>
      header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: 0 16px;
        height: var(--header-height);

        border-bottom: 1px solid grey;
      }
      header .title {
        font-weight: 700;
        font-size: 37px;
        line-height: 100%;
        letter-spacing: 0.01em;
        text-align: center;
        left: 0;
        right: 0;
        pointer-events: none;
      }
      #game {
        width: 100%;
        max-width: var(--game-max-width);
        margin: 0 auto;
        height: calc(100% - var(--header-height));
        display: flex;
        flex-direction: column;
      }
      #board-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        overflow: hidden;
      }
      game-keyboard {
  			width: 100%;
  			max-width: var(--game-max-width);
  			margin: 0 auto;
  			height: var(--keyboard-height);
  			display: flex;
  			flex-direction: column;
        font-size: large;
  		}
      #board {
        width: 4ch; /* to change with the size of the problem */
        font-size: xxx-large;

        display: grid;
        justify-items: right;
      }

      .line {
        border-bottom: 3px solid grey;
        width: inherit;
      }
    </style>
    <header>
      <div class="menu-left">
        N
      </div>
      <div class="title">Numero</div>
      <div class="menu-right">
        ⚙️
      </div>
    </header>
    <div id="game">
      <div id="board-container">
        <div id="board">
          <div id="valTop">1000</div>
          <div id="valBot">-323</div>
          <div class="line"></div>
          <div id="valRes">?</div>
        </div>
      </div>
      <game-keyboard></game-keyboard>
    </div>

  `;

  var numeroRoot = function (htmlElement) {
    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction , [
      {
        key: "connectedCallback",
        value: function () {
          console.log("Connected numeroRoot");
          this.shadowRoot.appendChild(numeroRootElement.content.cloneNode(!0));

          this.valtop = this.shadowRoot.querySelector("#valTop");
          this.valtop.innerHTML = 1000;

          this.valBot = this.shadowRoot.querySelector("#valBot");
          this.valBot.innerHTML = "-" + Math.floor(Math.random() * 1000);
        }
      }
    ]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("numero-root", numeroRoot);

  // Function magic to make new tags

  function addKeyFunction(e, a, s) {
    return a && addDictToElement(e.prototype, a),
    s && addDictToElement(e, s), e;
  }

  function addDictToElement(elementToBuild, functionDict) {
    for (var s = 0; s < functionDict.length; s++) {
      var t = functionDict[s];
      t.enumerable = t.enumerable || !1,
      t.configurable = !0,
      "value" in t && (t.writable = !0),
      Object.defineProperty(elementToBuild, t.key, t)
    }
  }

  function addKeyValueToDict(e /* dict */, a /* string */, s /* integer */) {
        return a in e ? Object.defineProperty(e, a, {
            value: s,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[a] = s, e
    }

  function NotInitializedError(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function isReflectAvailable() {
    if ("undefined" == typeof Reflect || !Reflect.construct) {
      // Only undefined in Internet explorer
      // https://developer.mozilla.org/en-US/docs/
      // Web/JavaScript/Reference/Global_Objects/Reflect
      return !1; // false
    }
    if (Reflect.construct.sham) {
      return !1; // false
    }

    if ("function" == typeof Proxy) return !0; // True

    try {
      return Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], (function() {}))), !0
    } catch (e) {
      return !1 // False
    }
  }

  function set__proto__(returnFunction, htmlElement) {
    return function (returnFunction, htmlElement) {
      return returnFunction.__proto__ = htmlElement, returnFunction;
    }(returnFunction, htmlElement);
  }

  function setPrototype(returnFunction, htmlElement) {
    if ("function" != typeof htmlElement && null !== htmlElement)
    throw new TypeError("Super expression must either be null or a function");

    returnFunction.prototype = Object.create(htmlElement.prototype, {
      constructor: {
        value: returnFunction,
        writable: !0, // true
        configurable: !0 // true
      }
    });
    set__proto__(returnFunction, htmlElement)
  }

  function ReflectConstructApply(e, a, s) {
    var res = Reflect.construct.apply(null, arguments);
    return res;
  }

  function isInstanceOf(e, a) {
    if (!(e instanceof a))
    throw new TypeError("Cannot call a class as a function")
  }

  function getPrototypeOf(returnFunction) {
    if (Object.setPrototypeOf) {
      return Object.getPrototypeOf (returnFunction);
    } else {
      return function(returnFunction) {
        return returnFunction.__proto__ || Object.getPrototypeOf(returnFunction);
      } (returnFunction);
    }
  }

  function constructElement(returnFunction) {
    return function() {
      var htmlElement;
      addDictToElement = getPrototypeOf(returnFunction);
      if (isReflectAvailable()) {
        var n = getPrototypeOf(this).constructor;
        htmlElement = Reflect.construct(
          addDictToElement, /* target */
          arguments, /* argument list */
          n /* new target, constructor whose prototype is going to be used */ )
      } else htmlElement = addDictToElement.apply(this, arguments);

      isInitialized(this, htmlElement)
      return htmlElement;
    }
  }

  function isInitialized(e, a) {
    var result = (!a || "object" != typeof a && "function" != typeof a ? NotInitializedError(e) : a);
    return result;
  }

  function SomethingElement(e) {
    var returnElement = function (htmlElement) {
      function t() {
        return ReflectConstructApply(
          htmlElement, arguments, getPrototypeOf(this).constructor);
        }
        t.prototype = Object.create(htmlElement.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })
        return set__proto__(t, e);
    }(e);
    return returnElement;
  }

  return retValue;
}({});
