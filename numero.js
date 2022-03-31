this.numero = this.numero || {};

this.numero.game = function (retValue) {

  console.log("Welcome to numero");

  // Settings

  var currentSettings = {
    operator: "addition",
    sizeOperand: "one",
  };

  var OPERATTIONS = ["addition", "substraction", "multiplication", "division"];
  var SIZES = ["one", "two", "three", "four"];
  var sizeToInt = { one: 1, two: 2, three: 3, four: 4};

  var currentLevel = 1;
  var bestStats = {};
  var bestLevel = 1;
  var bestTimeSeconds = 0;
  var secondsLapsed = 0;

  var levelMap = new Map(Object.entries({
    1: { sizeOperand: "one", operator: "addition" },
    2: { sizeOperand: "one", operator: "substraction" },
    3: { sizeOperand: "two", operator: "addition" },
    4: { sizeOperand: "one", operator: "multiplication" },
    5: { sizeOperand: "one", operator: "division" },
    6: { sizeOperand: "three", operator: "addition" },
    7: { sizeOperand: "two", operator: "substraction" },
    8: { sizeOperand: "three", operator: "substraction" },
    9: { sizeOperand: "two", operator: "multiplication" },
    10: { sizeOperand: "two", operator: "division" },
    11: { sizeOperand: "three", operator: "multiplication" },
    12: { sizeOperand: "three", operator: "division" },
    13: { sizeOperand: "four", operator: "addition" },
    14: { sizeOperand: "four", operator: "substraction" },
    15: { sizeOperand: "four", operator: "multiplication" },
    16: { sizeOperand: "four", operator: "division" }
  }));
  var levelMenus = new Map(Object.entries({
    1: { title: "Welcome to Numero", description: "You start at LeveL 1.\n" +
    "It starts simple, but gets more complicated.\nFinish 10 additions in a " +
    "row to reach LeveL 2.\nTry to reach level 16. Good luck!" },
    2: { title: "Level 2", description: "Can you substract numbers ?\n" +
    "Let's start with small numbers...\nFinish 10 in a row to reach LeveL 3."},
    3: { title: "LeveL 3", description: "You reached LeveL 3. \nWell done!\n" +
    "Can you add bigger numbers ?\nFinish 10 in a row to reach LeveL 3."},
    4: { title: "LeveL 4", description: "Can you multiply numbers ?\n" +
    "This is the multiplication table up to 100.\nProbably the most important" +
    " exercise in this game!"},
    5: { title: "LeveL 5", description: "Can you divide numbers ?\n" +
    "This is the inverse of the previous LeveL.\nProbably easier to guess, " +
    "since the answer is always a whole number."},
    6: { title: "LeveL 6", description: "Can you add bigger numbers ?\n" +
    "This should already be more challenging.\nBe sure to carry the extra 1 " +
    "correctly."},
    7: { title: "LeveL 7", description: "Can you substract bigger numbers ?\n" +
    "Down below one hundred, very useful for percentages.\n Finish 10 in a " +
    "row to reach LeveL 8."},
    8: { title: "LeveL 8", description: "Let's substract bigger BIGGER " +
    "numbers!\nDown from one thousand."},
    9: { title: "LeveL 9", description: "Can you multiply numbers up to 400 ?" +
    "\nYou have completed half of the LeveLs.\nBut it will get much harder " +
    "from here on."},
    10: { title: "LeveL 10", description: "Can you divide the numbers down " +
    "from 400 ?\nThe inverse of the last LeveL."},
    11: { title: "LeveL 11", description: "Can you multiply numbers up to 900 ?" +
    "\nThat's the 30 by 30 multiplication table.\nGood luck with 29 by 29..."},
    12: { title: "LeveL 12", description: "Can you divide numbers down from " +
    "900 ?\nOnly 5 Levels left to complete, but the numbers will only keep " +
    "getting bigger."},
    13: { title: "LeveL 13", description: "Last LeveL for additions, up to " +
    "20.000\nBe sure to cary all the ones..."},
    14: { title: "LeveL 14", description: "Last LeveL for substractions, down" +
    " from 20.000\n Good luck!"},
    15: { title: "LeveL 15", description: "Last LeveL for multiplication, " +
    " up to 1.600 or 40 by 40.\nBut at this point you should have a good " +
    "grasp of multiplication, right ?"},
    16: { title: "Level 16", description: "Last LeveL!\nDivide numbers down " +
    "from 1.600\nGuessing the second digit can make this Level pretty quick" +
    " though..."},
    17: { title: "WIN !", description: `You've won the game!\nCongratulations` +
    `\nNow try to beat your own time of ${secondsLapsed} seconds.`}
  }));

  // Buttons
  var button = document.createElement("template");
  button.innerHTML = "<button>key</button>";

  var digitsKeyboard = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["⌫", "0", "↩"],
  ];
  var digits = [].concat.apply([], digitsKeyboard);

  // Formatting time to string
  function timeToString(secondsLapsed) {
    // There is no build in function to do this in javascript...
    var retString = "";
    var minutesLapsed = Math.floor(secondsLapsed / 60) ;
    var modSecondsLapsed = secondsLapsed % 60;

    if (minutesLapsed == 0) retString += "00"
    else if (minutesLapsed < 10) retString += "0" + minutesLapsed;
    else retString += minutesLapsed;
    retString += ":";
    if (modSecondsLapsed == 0) retString += "00"
    else if (modSecondsLapsed < 10) retString += "0" + modSecondsLapsed;
    else retString += modSecondsLapsed;
    return retString;
  }

  // Keyboard tag
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
    			height: 55px;
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
        @media (max-height: 600px) {
          button {
            height: 45px;
          }
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

            digitButton.firstElementChild.dataset.key = digit;

            if (digit === "↩") {
              digitButton.firstElementChild.innerHTML = "ENTER";
            } else if (digit === "⌫") {
              digitButton.firstElementChild.innerHTML = "BACK";
            } else {
              digitButton.firstElementChild.textContent = digit;
            }

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
             } else if (s.toLowerCase() === "n") {
               lThis.dispatchKeyPressEvent(s);
             }
           }
         }));
      }
    }, {
      key: "dispatchKeyPressEvent",
      value: function(e) {
        this.dispatchEvent(new CustomEvent("game-key-press", {
          bubbles: !0, // bubbles up the DOM tree, to be catched
          composed: !0, // propagates across the shadow DOM to regular DOM
          detail: {
            key: e // value associated with the event
          }
        }));
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
        flex-direction: column;
      }
      game-keyboard {
  			width: 100%;
  			max-width: var(--game-max-width);
  			margin: 0 auto;
  			height: 250px;
  			display: flex;
  			flex-direction: column;
        font-size: 1.2em;
  		}
      #board {
        width: 5ch; /* to change with the size of the problem */
        font-size: 4em;
        margin-bottom: -2rem;
        display: grid;
        justify-items: right;
        /* border: 1px solid grey; */
      }
      #next-game-container {
        height: 55px;
        margin: 0 0 8px 0;
      }
      @media (max-height: 600px) {
        game-keyboard {
          max-width: 350px;
          height: 220px;
        }
        #next-game-container {
          height: 35px;
          max-width: 350px;
          display: flex;
          margin: 0 auto;
          width: 100%;
          margin-bottom: 8px;
        }
        #board {
          font-size: 2.3em;
        }
      }
      #gridboard {
        font-size: 3rem;
        border: 1px solid grey;
      }
      .line {
        border-bottom: 3px solid grey;
        width: inherit;
      }
      #game-status {
        padding: 0 1em 0;
        display: grid;
        justify-content: center;
      }
      button.icon {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0 4px;
      }
      .toaster {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        pointer-events: none;
        width: fit-content;
      }
      #board-container {
        flex-direction: row;
        justify-content: space-between;
      }
      #progress {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 2rem;
      }
      .progress-count {
        padding: 5px;
        margin: 5px;
        background-color: grey;
        height: 100%;
        border-radius: 1rem;
      }
      #progression {
        position: absolute;
        top: var(--header-height);
        right: 0;
        padding: 8px;
        color: #787c7e;
        font-size: 12px;
      }
      #timer {
        position: absolute;
        top: var(--header-height);
        left: 0;
        padding: 8px;
        color: #787c7e;
        font-size: 12px;
      }
      #next-game-button {
        height: 100%;
        cursor: pointer;
        user-select: none;
        background-color: #d4d7db;
        color: black;
        border: 0;
        border-radius: 4px;

        width: calc(100% - 8px);
        font-family: inherit;
        font-size: inherit;
        font-weight: bold;
      }
      .hidden {
        display: none;
      }
      .shown {
        display: inline-block;
      }
      .underline {
        text-decoration: underline;
      }
      #LeveL-num {
        position: absolute;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 14ex;
        top: var(--header-height);
        padding: 8px;
        color: #787c7e;
        font-size: 12px;
      }
      validation-menu {
        align-content: center;
        display: flex;
        flex-direction: column;
      }
      #best-results-title{
        font-size: 1.5em;
      }
    </style>
    <header>
      <div class="menu-left">
        <button id="game-menu" class="icon">
          <game-icon icon="numero"></game-icon>
        </button>
      </div>
      <div class="title">Numero</div>
      <div class="menu-right">
        <button id="reload-button" class="icon" tabindex="-1">
          <game-icon icon="reload"></game-icon>
        </button>
        <button id="settings-button" class="icon" tabindex="-1">
					<game-icon icon="settings"></game-icon>
				</button>
      </div>
    </header>
    <div id="game">
      <div id="progression">1/10</div>
      <div id="LeveL-num">LeveL 1</div>
      <div id="timer">00:00</div>
      <div id="board-container">
        <div id="right-bar-holder"></div>
        <div id="board">
          <div id="valTop"></div>
          <div id="valBot"></div>
          <div class="line"></div>
          <div id="valRes">?</div>
        </div>
        <div id="progress">
        </div>
      </div>
      <div id="next-game-container">
        <button id="next-game-button">
          <span class="underline">N</span>ext
        </button>
        <!-- <p id="game-status"></p> -->
      </div>
      <game-keyboard></game-keyboard>
      <full-page></full-page>
      <game-modal></game-modal>
    </div>
    <div class="toaster" id="game-toaster"></div>

  `;

  var numeroRoot = function (htmlElement) {
    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });

      addKeyValueToDict(NotInitializedError(e), "valTop", void 0);
      addKeyValueToDict(NotInitializedError(e), "valBot", void 0);
      addKeyValueToDict(NotInitializedError(e), "valSol", void 0);

      addKeyValueToDict(NotInitializedError(e), "valGuess", 0);

      addKeyValueToDict(NotInitializedError(e), "valTopDiv", void 0);
      addKeyValueToDict(NotInitializedError(e), "valBotDiv", void 0);
      addKeyValueToDict(NotInitializedError(e), "valResDiv", void 0);

      addKeyValueToDict(NotInitializedError(e), "gameStatus", void 0);
      addKeyValueToDict(NotInitializedError(e), "gameStatusDiv", void 0);

      addKeyValueToDict(NotInitializedError(e), "nextGameButton", void 0);
      addKeyValueToDict(NotInitializedError(e), "nextGameDiv", void 0);

      addKeyValueToDict(NotInitializedError(e), "currentStreak", 1);
      addKeyValueToDict(NotInitializedError(e), "streakLength", 10);

      addKeyValueToDict(NotInitializedError(e), "intervalID", void 0);
      addKeyValueToDict(NotInitializedError(e), "playTime", 0);
      addKeyValueToDict(NotInitializedError(e), "streakDiv", void 0);

      addKeyValueToDict(NotInitializedError(e), "$boardDiv", void 0);
      addKeyValueToDict(NotInitializedError(e), "gameWidth", 2);

      addKeyValueToDict(NotInitializedError(e), "startTime", void 0);

      return e;
    }

    addKeyFunction(returnFunction , [
      {
        key: "connectedCallback",
        value: function () {
          var rootThis = this;
          currentSettings = loadSettings();

          this.shadowRoot.appendChild(numeroRootElement.content.cloneNode(!0));

          this.shadowRoot.getElementById("settings-button").
             addEventListener("click", (function(e) {
               // this will be the settings button here
               rootThis.showSettingsFullPage();
             }));

          this.shadowRoot.getElementById("reload-button").
            addEventListener("click", function (e) {
              rootThis.showValidationMenuModal();
            });

          this.shadowRoot.getElementById("game-menu").
            addEventListener("click", (function(e) {
              rootThis.showGameMenuModal();
            }))

          this.addEventListener("new-game", function() {
            this.newGame();
          });

          this.valTopDiv = this.shadowRoot.getElementById("valTop");
          this.valBotDiv = this.shadowRoot.getElementById("valBot");
          this.valResDiv = this.shadowRoot.getElementById("valRes");
          this.gameStatusDiv = this.shadowRoot.getElementById("game-status");
          this.nextGameButton = this.shadowRoot.getElementById("next-game-button");
          this.nextGameDiv = this.shadowRoot.getElementById("next-game-container");
          this.$boardDiv = this.shadowRoot.getElementById("board");

          this.streakDiv = this.shadowRoot.getElementById("progression");

          this.nextGameButton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("game-key-press", {
              bubbles: !0, // bubbles up the DOM tree, to be catched
              composed: !0, // propagates across the shadow DOM to regular DOM
              detail: {
                key: "n" // value associated with the event
              }
            }));
          });

          this.addEventListener("game-key-press", (function(e) {
            var numberStr = e.detail.key;
            if (this.gameStatus === "RUNNING") {
              if (numberStr === "⌫" || numberStr === "Backspace") {
                this.removeNumber();
              } else if (numberStr === "↩" || numberStr === "Enter") {
                this.submitGuess();
              } else if (digits.includes(numberStr)) {
                this.addNumber(parseInt(numberStr, 10));
              }
            } else {
              if (numberStr.toLowerCase() === "n") {
                this.newGame();
              }
            }
            if (numberStr === "reload") {
              this.reloadGame();
            }
          }));

          this.addEventListener("startTimer", function() {
            rootThis.startTimer();
          });
          this.addEventListener("stopTimer", function() {
            rootThis.stopTimer();
          })


          this.newGame(1);
          this.showGameMenuModal();
        }
      }, {
        key: "reloadGame",
        value: function () {
          currentLevel = 1;
          secondsLapsed = 0;
          currentSettings = {
            operator: "addition",
            sizeOperand: "one",
          };
          this.startTime = Date.now();
          this.secondsLapsed = 0;
          this.playTime = 0;
          this.newGame(1);
          this.shadowRoot.querySelector("#LeveL-num").innerHTML =
            `LeveL ${currentLevel}`
          this.streakDiv.innerHTML = this.currentStreak + "/" + this.streakLength;
          console.log("Reloaded...");
        }
      }, {
        key: "startTimer",
        value: function () {
          this.startTime = Date.now();
          rootThis = this;
          function updateTimer() {

            secondsLapsed = Math.floor(
              (Date.now() - rootThis.startTime) / 1000) + rootThis.playTime;

            var timerString = timeToString(secondsLapsed);

            rootThis.shadowRoot.querySelector("#timer").innerHTML = timerString;
            if (secondsLapsed > 3600) {
              clearInterval(rootThis.intervalID);
              console.log(`You've left this page open for ${minutesLapsed} ` +
              `minutes, you should close your tabs more often...`);
            }
          };
          this.intervalID = setInterval(updateTimer, 1000);
        }
      }, {
        key: "stopTimer",
        value: function() {
          this.playTime = secondsLapsed;
          if (this.intervalID) {
            clearInterval(this.intervalID);
          }
        }
      }, {
        key: "showSettingsFullPage",
        value: function () {
          var fullPageDiv = this.shadowRoot.querySelector("full-page");
          var s = document.createElement("p");
          s.setAttribute("id", "best-results-title");
          s.innerHTML = "Best results";
          fullPageDiv.appendChild(s);
          var settings = document.createElement("game-settings");
          settings.setAttribute("page", "");
          settings.setAttribute("slot", "content");
          fullPageDiv.appendChild(settings);
          fullPageDiv.setAttribute("open", "");
        }
      }, {
        key: "showValidationMenuModal",
        value: function () {
          var e = this.shadowRoot.querySelector("game-modal");
          a = document.createElement("validation-menu");
          e.appendChild(a);
          e.setAttribute("open", "");
        }
      }, {
        key: "showGameMenuModal",
        value: function() {
          var e = this.shadowRoot.querySelector("game-modal");
          a = document.createElement("game-menu");
          e.appendChild(a);
          e.setAttribute("open", "");
        }
      },{
        key: "removeNumber",
        value: function (n) {
          if (this.valResDiv.innerHTML.length === 1) {
              this.valResDiv.innerHTML = "?";
              return;
          }
          var innerHTML = this.valResDiv.innerHTML.slice(0,
            this.valResDiv.innerHTML.length -1);
          this.valResDiv.innerHTML = innerHTML;
        }
      }, {
        key: "addNumber",
        value: function (n) {
          if (this.valResDiv.innerHTML === "?") {
              this.valResDiv.innerHTML = n;
          } else {
            if (this.valResDiv.innerHTML.length < this.gameWidth) {
              this.valResDiv.innerHTML += n;
            }
          }
        }
      }, {
        key: "submitGuess",
        value: function() {
          if (parseInt(this.valResDiv.innerHTML, 10) === this.valRes) {
            this.gameStatus = "ENDEDRIGHT";
            this.currentStreak += 1;
            if (this.currentStreak < this.streakLength) {
              this.addToast("WIN");
              this.showNextGameButton(true);
            } else {
              console.log(`Reached Level ${currentLevel} in ${secondsLapsed} seconds`);

              if (bestStats.hasOwnProperty(currentLevel)) {
                if (secondsLapsed < bestStats[currentLevel]) {
                  // New best time for this level
                  var previousTime = bestStats[currentLevel];
                  bestStats[currentLevel] = secondsLapsed;
                  console.log(`Reached a new record: `+
                    `LeveL ${currentLevel} in ${secondsLapsed}`);
                }
              } else {
                // First time we reach this level
                bestStats[currentLevel] = secondsLapsed;
              }
              currentLevel += 1;

              this.shadowRoot.querySelector("#LeveL-num").innerHTML =
                `LeveL ${currentLevel}`

              saveSettings();
              this.currentStreak = 1;
              this.showGameMenuModal();
              this.newGame(currentLevel);
            }
          } else {
            this.addToast("WRONG");
            this.currentStreak = 1;
          }
          this.streakDiv.innerHTML = this.currentStreak + "/" + this.streakLength;
        }
      }, {
        key: "newGame",
        value: function (level) {

          this.showNextGameButton(false);

          if (level <= levelMap.size) {
            currentSettings.sizeOperand = levelMap.get(level.toString())["sizeOperand"];
            currentSettings.operator = levelMap.get(level.toString())["operator"];
            console.log(`New level #${level} - ${currentSettings.operator}` +
              ` by ${currentSettings.sizeOperand}`);
          }

          this.gameStatus = "RUNNING";
          var numOf10 = sizeToInt[currentSettings.sizeOperand];

          switch (currentSettings.operator) {
            case "addition":
              this.valTop = Math.ceil(Math.random() * Math.pow(10, numOf10));
              this.valBot = Math.ceil(Math.random() * Math.pow(10 - 1, numOf10));
              this.valRes = this.valTop + this.valBot;
              this.valBotDiv.innerHTML = "+" + this.valBot.toString();
              this.gameWidth = numOf10 + 1;
              break;
            case "substraction":
              this.valBot = Math.ceil(Math.random() * Math.pow(10, numOf10));
              this.valRes = Math.ceil(Math.random() * Math.pow(10, numOf10));
              this.valTop = this.valBot + this.valRes;
              this.valBotDiv.innerHTML = "-" + this.valBot.toString();
              this.gameWidth = numOf10 + 2;
              break;
            case "multiplication":
              this.valTop = Math.ceil(1 + Math.random() * (10 * numOf10 - 1));
              this.valBot = Math.ceil(1 + Math.random() * (10 * numOf10 - 1));
              this.valRes = this.valTop * this.valBot;
              this.valBotDiv.innerHTML = "*" + this.valBot.toString();
              if (numOf10 == 1) {
                this.gameWidth = 3;
              } else {
                this.gameWidth = 4;
              }
              break;
            case "division":
              this.valRes = Math.ceil(1 + Math.random() * (10 * numOf10 - 1));
              this.valBot = Math.ceil(1 + Math.random() * (10 * numOf10 - 1));
              this.valTop =  this.valRes * this.valBot;
              this.valBotDiv.innerHTML = "÷" + this.valBot.toString();
              if (numOf10 == 1) {
                this.gameWidth = 3;
              } else {
                this.gameWidth = 4;
              }
              break;
          }

          this.valTopDiv.innerHTML = this.valTop.toString();
          this.valResDiv.innerHTML = "?";

          console.log(`Result ${this.valRes}`);

          this.resizeBoard();
        }
      }, {
        key: "resizeBoard",
        value: function() {
          var woop = this.$boardDiv;
          woop.style.width = this.gameWidth + "ch";
          var a = 2;
        }
      }, {
        key: "addToast",
        value: function(e, a) {
          var s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          var t = document.createElement("game-toast");
          t.setAttribute("text", e);
          if (s) {
            this.shadowRoot.querySelector("#system-toaster").prepend(t);
          } else {
            this.shadowRoot.querySelector("#game-toaster").prepend(t);
          }
        }
      }, {
        key: "showNextGameButton",
        value: function (isEnabled) {
          if (isEnabled) {
            this.nextGameButton.classList.remove("hidden");
            this.nextGameButton.classList.add("shown");
          } else {
            this.nextGameButton.classList.add("hidden");
            this.nextGameButton.classList.remove("shown");
          }
        }
      }
    ]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("numero-root", numeroRoot);

  // Full page menu
  var fullPageElement = document.createElement("template");
    fullPageElement.innerHTML = `
	<style>
		.overlay {
			display: none;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			justify-content: center;
			background-color: white;
			animation: SlideIn 100ms linear;
			z-index: 2000;
		}
		:host([open]) .overlay {
			display: flex;
		}
		.content {
			position: relative;
			color: black;
			padding: 0 32px;
			max-width: var(--game-max-width);
			width: 100%;
			overflow-y: auto;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.content-container {
			height: 100%;
		}
		.overlay.closing {
			animation: SlideOut 150ms linear;
		}
		header {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		h1 {
			font-weight: 700;
			font-size: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			text-align: center;
			margin-bottom: 10px;
		}
		game-icon {
			position: absolute;
			right: 0;
      top: 10px;
			user-select: none;
			cursor: pointer;
		}
		@media only screen and (min-device-width : 320px)
                       and (max-device-width : 480px) {
			.content {
				max-width: 100%;
				padding: 0;
			}
			game-icon {
				padding: 0 16px;
			}
		}
		@keyframes SlideIn {
			0% {
				transform: translateY(30px);
				opacity: 0;
			}
			100% {
				transform: translateY(0px);
				opacity: 1;
			}
		}
		@keyframes SlideOut {
			0% {
				transform: translateY(0px);
				opacity: 1;
			}
			90% {
				opacity: 0;
			}
			100% {
				opacity: 0;
				transform: translateY(60px);
			}
		}
	</style>
	<div class="overlay">
		<div class="content">
			<header>
				<h1><slot></slot></h1>
				<game-icon icon="close"></game-icon>
			</header>
			<div class="content-container">
				<slot name="content"></slot>
			</div>
		</div>
	</div>`;

  var fullPage = function(htmlElement) {

    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction, [{
      key: "connectedCallback",
      value: function() {
        var e = this;
        this.shadowRoot.appendChild(fullPageElement.content.cloneNode(!0));
				this.shadowRoot.querySelector("game-icon").addEventListener("click",
          function(a) {
            e.shadowRoot.querySelector(".overlay").classList.add("closing");
          });
        this.shadowRoot.addEventListener("animationend", (function(a) {
          "SlideOut" === a.animationName &&
          (e.shadowRoot.querySelector(".overlay").classList.remove("closing"),
          Array.from(e.childNodes).forEach((function(a) {
            e.removeChild(a)
          })), e.removeAttribute("open"));
          saveSettings();
          this.dispatchEvent(new CustomEvent("new-game", {
            bubbles: !0, // bubbles up the DOM tree, to be catched
            composed: !0, // propagates across the shadow DOM to regular DOM
          }));
        }));

      }
    }]);
    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("full-page", fullPage);

  // Settings Menu
  var settingsElement = document.createElement("template");
  settingsElement.innerHTML = `
    <style>
      .setting {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d4d5d9;
        padding: 8px 0;
      }
      .result {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d4d5d9;
        padding: 8px 0;
      }
      @media (max-height: 600px) {
        .result {
          padding: 4px 0;
        }
      }
      .text {
        padding-right: 8px;
        flex-grow: 1;
      }
      .content {
        position: relative;
        color: black;
        padding: 0 32px;
        max-width: var(--game-max-width);
        width: 100%;
        overflow-y: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      section {
        padding: 0 1em 0;
      }
      .title {
        font-size: 18px;
      }
      .description {
        font-size: 12px;
        color: #777b7d;
      }
      a, a:visited {
        color: #787c7e;
      }

      #footnote {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;
        color: #787c7e;
        font-size: 12px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      button {
        border-radius: 10px;
        border: 0;
      }
      .operations {
        display: flex;
        margin-top: 1em;
      }
      .operation {
        flex-grow: 1;
        padding: 1em 0 1em;
        margin: 0 1em 0;
      }
      .selected {
        background-color: LightSkyBlue;
      }
    </style>

    <section id="best-results-container">
    </section>

    <section style="display: none;">
      <div class="setting" >
        <div class="text">
          <div class="title">Operation</div>
          <div class="description">Which operation do you want to play?</div>
          <div class="operations">
            <button class="operation" id="addition">+</button>
            <button class="operation" id="substraction">-</button>
            <button class="operation" id="multiplication">×</button>
            <button class="operation" id="division">÷</button>
          </div>
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">Size</div>
          <div class="description">How many digits in your operands?</div>
          <div class="operations">
            <button class="operation" id="one">1</button>
            <button class="operation" id="two">2</button>
            <button class="operation" id="three">3</button>
            <button class="operation" id="four">4</button>
          </div>
        </div>
      </div>
    </section>
    <section style="margin-bottom: 16px;">
      <div class="setting">
        <div class="text">
          <div class="title">More ?</div>
        </div>
        <div class="control"><a href="./">Link</a></div>
      </div>
    </section>

    <!-- <div id="footnote">
      <div>© Numero 2022</div>
      <div id="puzzle-number">#1</div>
    </div> -->
  `;

  var settings = function(htmlElement) {
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
      value: function() {
        var lThis = this;
        this.shadowRoot.appendChild(settingsElement.content.cloneNode(!0));

        var bestResultsContainer = this.shadowRoot
          .querySelector("#best-results-container");

        if (bestStats[1]) {
          var titleDiv = document.createElement("div");
          titleDiv.innerHTML = `
          <div class="">
            <div class="result">
              <div class="title"></div>
              <div class="title">Best time</div>
            </div>
          </div>
          `;
          bestResultsContainer.append(titleDiv);

          for (var i = 16; i > 0; i--) {
            if (bestStats[i]) {
              var levelResult = document.createElement("div");
              levelResult.innerHTML = `
              <div class="">
                <div class="result">
                  <div class="title">Level ${i}</div>
                  <div class="title">${timeToString(bestStats[i])}</div>
                </div>
              </div>
              `;
              bestResultsContainer.append(levelResult);
            }
          }
        } else {
          var noResultsDiv = document.createElement("div");
          titleDiv.innerHTML = `
          <div class="">
            <div class="result">
              <div class="title">No results yet...</div>
            </div>
          </div>
          `;
        }

        var settingsButtons = this.shadowRoot.querySelectorAll("button");

        settingsButtons.forEach(function(button, i) {
          button.addEventListener("click", function () {
            var b = this;
            if (OPERATTIONS.includes(b.id)) {
              currentSettings.operator = b.id;
            } else if (SIZES.includes(b.id)) {
              currentSettings.sizeOperand = b.id;
            }
            lThis.render();
          });
        });
        this.render();
      }
    }, {
      key: "render",
      value: function() {
        console.log(`New settings: ${currentSettings.operator} ` +
          `by ${currentSettings.sizeOperand}`);

        var settingsButtons = this.shadowRoot.querySelectorAll("button");
        settingsButtons.forEach((item, i) => {
          item.classList.remove("selected");
        });

        var operatorDiv = this.shadowRoot.querySelector(
          "#" + currentSettings.operator);
        operatorDiv.classList.add("selected");

        var operandDiv = this.shadowRoot.querySelector(
          "#" + currentSettings.sizeOperand);
        operandDiv.classList.add("selected");

      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("game-settings", settings);

  // Modal display
  var gameModalElement = document.createElement("template");
	gameModalElement.innerHTML = `
		<style>
			.overlay {
				display: none;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				justify-content: center;
				align-items: center;
				background-color: rgba(255, 255, 255, 0.5);
				z-index: 3000;
			}
			:host([open])
			.overlay { display: flex; }
			.content {
				position: relative;
				border-radius: 8px;
				border: 1px solid #f6f7f8;
				background-color: #ffffff;
				color: #000000;
				box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
				width: 90%;
				max-height: 90%;
				overflow-y: auto;
				animation: SlideIn 200ms;
				max-width: var(--game-max-width);
				padding: 16px;
				box-sizing: border-box;
			}
			.content.closing {
				animation: SlideOut 200ms;
			}
			.close-icon {
				width: 24px;
				height: 24px;
				position: absolute;
				top: 16px;
				right: 16px;
			}
			game-icon {
				position: fixed;
				user-select: none;
				cursor: pointer;
			}
			@keyframes SlideIn {
				0% {
					transform: translateY(30px);
					opacity: 0;
				}
				100% {
					transform: translateY(0px);
					opacity: 1;
				}
			}
			@keyframes SlideOut {
				0% {
					transform: translateY(0px);
					opacity: 1;
				}
				90% {
					opacity: 0;
				}
				100% {
					opacity: 0;
					transform: translateY(60px);
				}
			}
		</style>
		<div class="overlay">
			<div class="content">
				<slot></slot>
				<div class="close-icon">
					<game-icon icon="close"></game-icon>
				</div>
			</div>
		</div>
    `;

  var gameModal = function(htmlElement) {
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
      value: function() {
        var e = this;
        this.shadowRoot.appendChild(gameModalElement.content.cloneNode(!0));
        this.shadowRoot.querySelector(".close-icon").addEventListener("click",
          function () {
            e.shadowRoot.querySelector(".content").classList.add("closing");
        });
        window.addEventListener("keydown", function(a) {
          if (a.key === "Escape") {
            e.shadowRoot.querySelector(".content").classList.add("closing");
          }
        });
        this.addEventListener("close-modal-menu", (function(a) {
          e.shadowRoot.querySelector(".content").classList.add("closing");
        }));
        this.shadowRoot.addEventListener("animationend", (function(a) {
          if ("SlideOut" === a.animationName) {
            e.shadowRoot.querySelector(".content").classList.remove("closing");
            e.removeChild(e.firstChild);
            e.removeAttribute("open");
            this.dispatchEvent(new CustomEvent("startTimer", {
              bubbles: !0, composed: !0 }));
          }
        }));
        this.shadowRoot.addEventListener("click", (function(a) {
          e.shadowRoot.querySelector(".content").classList.add("closing");
        }));
      }
    }]);
    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("game-modal", gameModal);

  // Game Menu
  var gameMenuElement = document.createElement("template");
  gameMenuElement.innerHTML = `
    <style>
      h1 {
        text-align: center;
      }
    </style>
    <div id="menu-container">
    </div>
  `;

  var gameMenu = function(htmlElement) {
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
      value: function() {

        this.dispatchEvent(new CustomEvent("stopTimer", {
          bubbles: !0, composed: !0 }));

        var gameMenuNode = gameMenuElement.content.cloneNode(!0);
        var currentMenu = levelMenus.get(currentLevel.toString());
        var title = document.createElement("h1");
        title.innerHTML = `${currentMenu["title"]}`
        gameMenuNode.append(title);
        currentMenu["description"].split("\n").forEach((sentence) => {
          var p = document.createElement("p");
          p.innerHTML = sentence;
          gameMenuNode.append(p);
        });

        if (currentLevel > 1 && bestStats[currentLevel - 1]) {
          var currentLevelTime = document.createElement("p");
          var seconds = secondsLapsed;
          currentLevelTime.innerHTML =
            `<b>Current Result:</b> Level ${currentLevel - 1} in ${secondsLapsed} seconds`;

          var bestLevelTime = document.createElement("p");
          bestLevelTime.innerHTML = `<b>Best Result:</b> LeveL ${currentLevel - 1} in ` +
          `${bestStats[currentLevel - 1]} seconds`;
          gameMenuNode.append(bestLevelTime);
          gameMenuNode.append(currentLevelTime);
        }

        this.shadowRoot.appendChild(gameMenuNode);
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("game-menu", gameMenu);

  // Validation Menu
  // Game Menu
  var validationMenuElement = document.createElement("template");
  validationMenuElement.innerHTML = `
    <style>
      h1 {
        text-align: center;
      }
      button {
        background-color: black;
        color: white;
        padding: 16px;
        border: none;
        border-radius: 4px;
        font-size: large;
      }
    </style>
    <div id="menu-container">
    </div>
  `;

  var validationMenu = function(htmlElement) {
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
      value: function() {

        this.dispatchEvent(new CustomEvent("stopTimer", {
          bubbles: !0, composed: !0 }));

        var gameMenuNode = validationMenuElement.content.cloneNode(!0);

        var title = document.createElement("h1");
        title.innerHTML = `Restart game?`
        gameMenuNode.append(title);

        var p = document.createElement("div");
        p.innerHTML = `<p>Do you want to restart the game?</p>`+
        `<p>You will loose your progress and start from LeveL 1.</p>`;
        gameMenuNode.append(p);

        var b = document.createElement("button");
        b.innerText = "Restart";
        gameMenuNode.append(b);

        b.addEventListener("click", function () {
          this.dispatchEvent(new CustomEvent("game-key-press", {
            bubbles: !0, composed: !0,
            detail: { key: "reload" }
          }));
        });

        this.shadowRoot.appendChild(gameMenuNode);
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("validation-menu", validationMenu);

  // Toast
  var toastElement = document.createElement("template");
  toastElement.innerHTML = `
  <style>
    .toast {
      position: relative;
      margin: 16px;
      background-color: black;
      color: white;
      padding: 16px;
      border: none;
      border-radius: 4px;
      opacity: 1;
      transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
      font-weight: 700;
    }
    .win {
      background-color: var(--color-correct);
      color: var(--tile-text-color);
    }
    .fade {
      opacity: 0;
    }
  </style>
  <div class="toast"></div>
  `;

  var gameToast = function(htmlElement) {
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
      value: function() {
        var e = this;
        this.shadowRoot.appendChild(toastElement.content.cloneNode(!0));
        var toastDiv = this.shadowRoot.querySelector(".toast");
        toastDiv.textContent = this.getAttribute("text");
        setTimeout((function () {
          toastDiv.classList.add("fade");
        }), 1e3);
        toastDiv.addEventListener("transitionend", (function (a) {
          e.parentNode.removeChild(e);
        }));
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("game-toast", gameToast);

  // Local storage
  function loadSettings() {
    var settings = window.localStorage.getItem("numero-settings") ||
      JSON.stringify(currentSettings);
    bestLevel = parseInt(window.localStorage.getItem(
      "numero-best-level"), 10) || 1;
    bestTimeSeconds = parseInt(window.localStorage.getItem(
      "numero-best-time-seconds"), 10) || 0;
    bestStats = JSON.parse(window.localStorage.getItem("numero-best-stats")) || {};

    return JSON.parse(settings);
  }

  function saveSettings() {
    window.localStorage.setItem("numero-settings", JSON.stringify(currentSettings));
    window.localStorage.setItem("numero-best-level", JSON.stringify(bestLevel));
    window.localStorage.setItem("numero-best-time-seconds", JSON.stringify(bestTimeSeconds));
    window.localStorage.setItem("numero-best-stats", JSON.stringify(bestStats));
  }

  // icons
  var iconSizes = {
    settings: "0 0 45 45",
    reload: "0 0 500 500",
    numero: "100 100 800 700",
    close: "0 0 22 22",
  };

  var iconPaths = {
    settings: `
    M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756
    c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773
    l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815
    C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52
    h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607  c-1.766,0.431-3.38,1.104
    -4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,
    8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,
    1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,
    18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438
    c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,
    1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,
    0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,
    3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128
    c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869
    -1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301
    -0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772
    c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,
    2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,
    44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928
    -7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85
    C30.906,27.334,27.355,30.85,22.976,30.85z
    `,
    reload: `
    M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2
    -239.1v-57.6c0-3.2-4-4.9-6.7-2.9 l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1
    c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6c-5.1,76.9-67.8
    ,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2
    -24.7c-17.9,0-31.9,15.9-29.1,33.6 C49.575,418.961,150.875,501.261,268.175
    ,488.161z`,
    numero: `
    M508 280h-63.3c-3.3 0-6 2.7-6 6v340.2H433L197.4 282.6c-1.1-1.6-3-2.6-4.9
    -2.6H126c-3.3 0-6 2.7-6 6v464c0 3.3 2.7 6 6 6h62.7c3.3 0 6-2.7 6-6V405.1
    h5.7l238.2 348.3c1.1 1.6 3 2.6 5 2.6H508c3.3 0 6-2.7 6-6V286c0-3.3-2.7-6
    -6-6zM886 693H582c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8
    v-48c0-4.4-3.6-8-8-8zM733.8 630c52.9 0 95.2-17.2 126.2-51.7 29.4-32.9 44
    -75.8 44-128.8 0-53.1-14.6-96.5-44-129.3-30.9-34.8-73.2-52.2-126.2-52.2
    -53.7 0-95.9 17.5-126.3 52.8-29.2 33.1-43.4 75.9-43.4 128.7 0 52.4 14.3
    95.2 43.5 128.3 30.6 34.7 73 52.2 126.2 52.2z m-71.5-263.7c16.9-20.6 40.3
    -30.9 71.4-30.9 31.5 0 54.8 9.6 71 29.1 16.4 20.3 24.9 48.6 24.9 84.9 0
    36.3-8.4 64.1-24.8 83.9-16.5 19.4-40 29.2-71.1 29.2-31.2 0-55-10.3-71.4
    -30.4-16.3-20.1-24.5-47.3-24.5-82.6 0.1-35.8 8.2-63 24.5-83.2z`,
    close: `
    M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42
    1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3
    a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z
    `
  };

  var iconElement = document.createElement("template");
  iconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24"
         viewBox="0 0 50 50" width="24">
      <path fill=black />
    </svg>
  `;

  var icon = function(htmlElement) {
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
      value: function() {
        this.shadowRoot.appendChild(iconElement.content.cloneNode(!0));
        var e = this.getAttribute("icon");
        this.shadowRoot.querySelector("path").setAttribute("d", iconPaths[e]);
        this.shadowRoot.querySelector("svg").setAttribute("viewBox", iconSizes[e]);
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-icon", icon);

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

  retValue.levelMap = levelMap;
  return retValue;
}({});
