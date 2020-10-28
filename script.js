let originalURL = window.location.href.split('?')[0];
let urlQueryString = window.location.search;
let seedFromURL = new URLSearchParams(urlQueryString);
let hashh = window.location.hash.substr(1);

const startLights = document.querySelector("#startLights");
const trackSelectionDiv = document.querySelector("#trackSelection");
const trackSelector = document.querySelector("#trackSel");
const trackSelectorItem = document.querySelector("#trackSelectorItem");
const randomWordDiv = document.querySelector("#randomWord");
const timeLeftDiv = document.querySelector("#timeLeft");
const scoreDiv = document.querySelector("#score");
const lapTimeDiv = document.querySelector("#lapTime");
const wordInput = document.querySelector("#wordInput");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const gameArea = document.querySelector("#gameArea");
const trackFlag = document.querySelector("#trackFlag");
const trackMap = document.querySelector("#trackMap");
const trackName = document.querySelector("#trackName");
const trackLength = document.querySelector("#trackLength");
const gameOverModal = document.querySelector("#gameOverModal");
const gameOverReasonTitle = document.querySelector("#gameOverReasonTitle");
const gameOverReason = document.querySelector("#gameOverReason");
const gameOverLapTime = document.querySelector("#gameOverLapTime");
const gameOverPercentage = document.querySelector("#gameOverPercentage");
const gameOverIcon = document.querySelector("#gameOverIcon");
const modalTrack = document.querySelector("#modalTrack");
const modalSeed = document.querySelector("#modalSeed");
const seedInput = document.querySelector("#seed");
const percentageBar = document.querySelector("#percentageBar");
const copyBtn = document.querySelector("#copyBtn");
const textToCopy = document.querySelector("#textToCopy");
const playerIcon = document.querySelector("#playerIcon");
const playerGhost = document.querySelector("#playerGhost");
const opponentGhost = document.querySelector("#opponentGhost");
const crashFinishContent = document.querySelector("#CrashFinishContent");
const versusContent = document.querySelector("#VersusContent");
const firstPlIcon = document.querySelector("#firstPlIcon");
const firstPlName = document.querySelector("#firstPlName");
const firstPlGap = document.querySelector("#firstPlGap");
const firstPlLaptime = document.querySelector("#firstPlLaptime");
const secondPlIcon = document.querySelector("#secondPlIcon");
const secondPlName = document.querySelector("#secondPlName");
const secondPlGap = document.querySelector("#secondPlGap");
const secondPlLaptime = document.querySelector("#secondPlLaptime");

let startLightsTime = 7000;
let startTime = 6000;
let currentDistance = 0;
let currentWord;
let maxTime = 3000;
let timeLeft;
let lapTimeTimer;
let lapTime = 0;
let lightsTimer;
let lightsStartTimer;
let selectedTrack;
let distancePerWord = 0;
let lapTimeScale = 1;
let seededRng;
let finishLapTime;
let URLString;
let shortURL;
let percentage = 0;
let listeningForKeys = true;
let isGameOver = false;
let isVersusMode = false;

let msg = "Big 4x!";
let data = {
  seed: null,
  track: null,
  laptime: null,
  playername: null
}
let receivedData = data;

let jsonboxEndpoint = "https://jsonbox.io/box_48878c90c848885a43f5";

let tracks = [
  { name: "Test Track", circuitLength: 1000, intendedLapTime: 20, flag: "./svg/flag-portugal.svg", trackmap: "./svg/testtrack.svg", path: "testtrack" },
  {
    name: "Circuit de Spa-Francorchamps",
    circuitLength: 7004,
    intendedLapTime: 137,
    flag: "./svg/flag-belgium.svg",
    trackmap: "./svg/spa.svg",
    path: "spa"
  },
  { name: "Nordschleife", circuitLength: 20832, intendedLapTime: 428, flag: "./svg/flag-germany.svg", trackmap: "./svg/nordschleife.svg", path: "nordschleife" },
  { name: "Silverstone", circuitLength: 5891, intendedLapTime: 120, flag: "./svg/flag-uk.svg", trackmap: "./svg/silverstone.svg", path: "silverstone" },
  { name: "Lime Rock Park", circuitLength: 2410, intendedLapTime: 58, flag: "./svg/flag-usa.svg", trackmap: "./svg/limerockpark.svg", path: "limerockpark" },
  {
    name: "Circuit 24 Hours of Le Mans",
    circuitLength: 13626,
    intendedLapTime: 173,
    flag: "./svg/flag-france.svg",
    trackmap: "./svg/lemans.svg",
    path: "lemans"
  },
  {
    name: "Circuit Gilles Villeneuve",
    circuitLength: 4361,
    intendedLapTime: 97,
    flag: "./svg/flag-canada.svg",
    trackmap: "./svg/gillesvilleneuve.svg",
    path: "gillesvilleneuve"
  },
  { name: "Hockenheimring", circuitLength: 4574, intendedLapTime: 105, flag: "./svg/flag-germany.svg", trackmap: "./svg/hockenheimring.svg", path: "hockenheimring" },
  {
    name: "Autodromo Nazionale di Monza",
    circuitLength: 5793,
    intendedLapTime: 110,
    flag: "./svg/flag-italy.svg",
    trackmap: "./svg/monza.svg",
    path: "monza"
  },
  { name: "Circuit Zolder", circuitLength: 4011, intendedLapTime: 91, flag: "./svg/flag-belgium.svg", trackmap: "./svg/zolder.svg", path: "zolder" },
  { name: "Circuit de Monaco", circuitLength: 3337, intendedLapTime: 100, flag: "./svg/flag-monaco.svg", trackmap: "./svg/monaco.svg", path: "monaco" },
  {
    name: "Suzuka International Racing Course",
    circuitLength: 5807,
    intendedLapTime: 125,
    flag: "./svg/flag-japan.svg",
    trackmap: "./svg/suzuka.svg",
    path: "suzuka"
  },
  { name: "Fuji Speedway", circuitLength: 1475, intendedLapTime: 107, flag: "./svg/flag-japan.svg", trackmap: "./svg/fujispeedway.svg", path: "fujispeedway" },
  { name: "Autódromo Internacional do Algarve (Portimao)", circuitLength: 4692, intendedLapTime: 115, flag: "./svg/flag-portugal.svg", trackmap: "./svg/portimao.svg", path: "portimao" },
  { name: "Autódromo do Estoril", circuitLength: 4182, intendedLapTime: 110, flag: "./svg/flag-portugal.svg", trackmap: "./svg/estoril.svg", path: "estoril" }
];

let icons = { 
  "crash": "./svg/icon-crash.svg",
  "finish": "./svg/icon-finish.svg",
  "versus": "./svg/icon-versus.svg",
  "class": {
    "player": "player-01",
    "opponent": "player-02"
  }
}

const words = [
  "the",
  "of",
  "to",
  "and",
  "in",
  "is",
  "it",
  "you",
  "that",
  "he",
  "was",
  "for",
  "on",
  "are",
  "with",
  "as",
  "his",
  "they",
  "be",
  "at",
  "one",
  "have",
  "this",
  "from",
  "or",
  "had",
  "by",
  "not",
  "word",
  "but",
  "what",
  "some",
  "we",
  "can",
  "out",
  "other",
  "were",
  "all",
  "there",
  "when",
  "up",
  "use",
  "your",
  "how",
  "said",
  "an",
  "each",
  "she",
  "which",
  "do",
  "their",
  "time",
  "if",
  "will",
  "way",
  "about",
  "many",
  "then",
  "them",
  "write",
  "would",
  "like",
  "so",
  "these",
  "her",
  "long",
  "make",
  "thing",
  "see",
  "him",
  "two",
  "has",
  "look",
  "more",
  "day",
  "could",
  "go",
  "come",
  "did",
  "number",
  "sound",
  "no",
  "most",
  "people",
  "my",
  "over",
  "know",
  "water",
  "than",
  "call",
  "first",
  "who",
  "may",
  "down",
  "side",
  "been",
  "now",
  "find",
  "any",
  "new",
  "work",
  "part",
  "take",
  "get",
  "place",
  "made",
  "live",
  "where",
  "after",
  "back",
  "little",
  "only",
  "round",
  "man",
  "year",
  "came",
  "show",
  "every",
  "good",
  "me",
  "give",
  "our",
  "under",
  "name",
  "very",
  "through",
  "just",
  "form",
  "sentence",
  "great",
  "think",
  "say",
  "help",
  "low",
  "line",
  "differ",
  "turn",
  "cause",
  "much",
  "mean",
  "before",
  "move",
  "right",
  "boy",
  "old",
  "too",
  "same",
  "tell",
  "does",
  "set",
  "three",
  "want",
  "air",
  "well",
  "also",
  "play",
  "small",
  "end",
  "put",
  "home",
  "read",
  "hand",
  "port",
  "large",
  "spell",
  "add",
  "even",
  "land",
  "here",
  "must",
  "big",
  "high",
  "such",
  "follow",
  "act",
  "why",
  "ask",
  "men",
  "change",
  "went",
  "light",
  "kind",
  "off",
  "need",
  "house",
  "picture",
  "try",
  "us",
  "again",
  "animal",
  "point",
  "mother",
  "world",
  "near",
  "build",
  "self",
  "earth",
  "father",
  "head",
  "stand",
  "own",
  "page",
  "should",
  "country",
  "found",
  "answer",
  "school",
  "grow",
  "study",
  "still",
  "learn",
  "plant",
  "cover",
  "food",
  "sun",
  "four",
  "between",
  "state",
  "keep",
  "eye",
  "never",
  "last",
  "let",
  "thought",
  "city",
  "tree",
  "cross",
  "farm",
  "hard",
  "start",
  "might",
  "story",
  "saw",
  "far",
  "sea",
  "draw",
  "left",
  "late",
  "run",
  "don't",
  "while",
  "press",
  "close",
  "night",
  "real",
  "life",
  "few",
  "north",
  "open",
  "seem",
  "together",
  "next",
  "white",
  "children",
  "begin",
  "got",
  "walk",
  "example",
  "ease",
  "paper",
  "group",
  "always",
  "music",
  "those",
  "both",
  "mark",
  "often",
  "letter",
  "until",
  "mile",
  "river",
  "car",
  "feet",
  "care",
  "second",
  "book",
  "carry",
  "took",
  "science",
  "eat",
  "room",
  "friend",
  "began",
  "idea",
  "fish",
  "mountain",
  "stop",
  "once",
  "base",
  "hear",
  "horse",
  "cut",
  "sure",
  "watch",
  "color",
  "face",
  "wood",
  "main",
  "enough",
  "plain",
  "girl",
  "usual",
  "young",
  "ready",
  "above",
  "ever",
  "red",
  "list",
  "though",
  "feel",
  "talk",
  "bird",
  "soon",
  "body",
  "dog",
  "family",
  "direct",
  "pose",
  "leave",
  "song",
  "measure",
  "door",
  "product",
  "black",
  "short",
  "numeral",
  "class",
  "wind",
  "question",
  "happen",
  "complete",
  "ship",
  "area",
  "half",
  "rock",
  "order",
  "fire",
  "south",
  "problem",
  "piece",
  "told",
  "knew",
  "pass",
  "since",
  "top",
  "whole",
  "king",
  "space",
  "heard",
  "best",
  "hour",
  "better",
  "true",
  "during",
  "hundred",
  "five",
  "remember",
  "step",
  "early",
  "hold",
  "west",
  "ground",
  "interest",
  "reach",
  "fast",
  "verb",
  "sing",
  "listen",
  "six",
  "table",
  "travel",
  "less",
  "morning",
  "ten",
  "simple",
  "several",
  "vowel",
  "toward",
  "war",
  "lay",
  "against",
  "pattern",
  "slow",
  "center",
  "love",
  "person",
  "money",
  "serve",
  "appear",
  "road",
  "map",
  "rain",
  "rule",
  "govern",
  "pull",
  "cold",
  "notice",
  "voice",
  "unit",
  "power",
  "town",
  "fine",
  "certain",
  "fly",
  "fall",
  "lead",
  "cry",
  "dark",
  "machine",
  "note",
  "wait",
  "plan",
  "figure",
  "star",
  "box",
  "noun",
  "field",
  "rest",
  "correct",
  "able",
  "pound",
  "done",
  "beauty",
  "drive",
  "stood",
  "contain",
  "front",
  "teach",
  "week",
  "final",
  "gave",
  "green",
  "oh",
  "quick",
  "develop",
  "ocean",
  "warm",
  "free",
  "minute",
  "strong",
  "special",
  "mind",
  "behind",
  "clear",
  "tail",
  "produce",
  "fact",
  "street",
  "inch",
  "multiply",
  "nothing",
  "course",
  "stay",
  "wheel",
  "full",
  "force",
  "blue",
  "object",
  "decide",
  "surface",
  "deep",
  "moon",
  "island",
  "foot",
  "system",
  "busy",
  "test",
  "record",
  "boat",
  "common",
  "gold",
  "possible",
  "plane",
  "stead",
  "dry",
  "wonder",
  "laugh",
  "thousand",
  "ago",
  "ran",
  "check",
  "game",
  "shape",
  "equate",
  "hot",
  "miss",
  "brought",
  "heat",
  "snow",
  "tire",
  "bring",
  "yes",
  "distant",
  "fill",
  "east",
  "paint",
  "language",
  "among",
  "grand",
  "ball",
  "yet",
  "wave",
  "drop",
  "heart",
  "am",
  "present",
  "heavy",
  "dance",
  "engine",
  "position",
  "arm",
  "wide",
  "sail",
  "material",
  "size",
  "vary",
  "settle",
  "speak",
  "weight",
  "general",
  "ice",
  "matter",
  "circle",
  "pair",
  "include",
  "divide",
  "syllable",
  "felt",
  "perhaps",
  "pick",
  "sudden",
  "count",
  "square",
  "reason",
  "length",
  "represent",
  "art",
  "subject",
  "region",
  "energy",
  "hunt",
  "probable",
  "bed",
  "brother",
  "egg",
  "ride",
  "cell",
  "believe",
  "fraction",
  "forest",
  "sit",
  "race",
  "window",
  "store",
  "summer",
  "train",
  "sleep",
  "prove",
  "lone",
  "leg",
  "exercise",
  "wall",
  "catch",
  "mount",
  "wish",
  "sky",
  "board",
  "joy",
  "winter",
  "sat",
  "written",
  "wild",
  "instrument",
  "kept",
  "glass",
  "grass",
  "cow",
  "job",
  "edge",
  "sign",
  "visit",
  "past",
  "soft",
  "fun",
  "bright",
  "gas",
  "weather",
  "month",
  "million",
  "bear",
  "finish",
  "happy",
  "hope",
  "flower",
  "clothe",
  "strange",
  "gone",
  "jump",
  "baby",
  "eight",
  "village",
  "meet",
  "root",
  "buy",
  "raise",
  "solve",
  "metal",
  "whether",
  "push",
  "seven",
  "paragraph",
  "third",
  "shall",
  "held",
  "hair",
  "describe",
  "cook",
  "floor",
  "either",
  "result",
  "burn",
  "hill",
  "safe",
  "cat",
  "century",
  "consider",
  "type",
  "law",
  "bit",
  "coast",
  "copy",
  "phrase",
  "silent",
  "tall",
  "sand",
  "soil",
  "roll",
  "temperature",
  "finger",
  "industry",
  "value",
  "fight",
  "lie",
  "beat",
  "excite",
  "natural",
  "view",
  "sense",
  "ear",
  "else",
  "quite",
  "broke",
  "case",
  "middle",
  "kill",
  "son",
  "lake",
  "moment",
  "scale",
  "loud",
  "spring",
  "observe",
  "child",
  "straight",
  "consonant",
  "nation",
  "dictionary",
  "milk",
  "speed",
  "method",
  "organ",
  "pay",
  "age",
  "section",
  "dress",
  "cloud",
  "surprise",
  "quiet",
  "stone",
  "tiny",
  "climb",
  "cool",
  "design",
  "poor",
  "lot",
  "experiment",
  "bottom",
  "key",
  "iron",
  "single",
  "stick",
  "flat",
  "twenty",
  "skin",
  "smile",
  "crease",
  "hole",
  "trade",
  "melody",
  "trip",
  "office",
  "receive",
  "row",
  "mouth",
  "exact",
  "symbol",
  "die",
  "least",
  "trouble",
  "shout",
  "except",
  "wrote",
  "seed",
  "tone",
  "join",
  "suggest",
  "clean",
  "break",
  "lady",
  "yard",
  "rise",
  "bad",
  "blow",
  "oil",
  "blood",
  "touch",
  "grew",
  "cent",
  "mix",
  "team",
  "wire",
  "cost",
  "lost",
  "brown",
  "wear",
  "garden",
  "equal",
  "sent",
  "choose",
  "fell",
  "fit",
  "flow",
  "fair",
  "bank",
  "collect",
  "save",
  "control",
  "decimal",
  "gentle",
  "woman",
  "captain",
  "practice",
  "separate",
  "difficult",
  "doctor",
  "please",
  "protect",
  "noon",
  "whose",
  "locate",
  "ring",
  "character",
  "insect",
  "caught",
  "period",
  "indicate",
  "radio",
  "spoke",
  "atom",
  "human",
  "history",
  "effect",
  "electric",
  "expect",
  "crop",
  "modern",
  "element",
  "hit",
  "student",
  "corner",
  "party",
  "supply",
  "bone",
  "rail",
  "imagine",
  "provide",
  "agree",
  "thus",
  "capital",
  "won't",
  "chair",
  "danger",
  "fruit",
  "rich",
  "thick",
  "soldier",
  "process",
  "operate",
  "guess",
  "necessary",
  "sharp",
  "wing",
  "create",
  "neighbor",
  "wash",
  "bat",
  "rather",
  "crowd",
  "corn",
  "compare",
  "poem",
  "string",
  "bell",
  "depend",
  "meat",
  "rub",
  "tube",
  "famous",
  "dollar",
  "stream",
  "fear",
  "sight",
  "thin",
  "triangle",
  "planet",
  "hurry",
  "chief",
  "colony",
  "clock",
  "mine",
  "tie",
  "enter",
  "major",
  "fresh",
  "search",
  "send",
  "yellow",
  "gun",
  "allow",
  "print",
  "dead",
  "spot",
  "desert",
  "suit",
  "current",
  "lift",
  "rose",
  "continue",
  "block",
  "chart",
  "hat",
  "sell",
  "success",
  "company",
  "subtract",
  "event",
  "particular",
  "deal",
  "swim",
  "term",
  "opposite",
  "wife",
  "shoe",
  "shoulder",
  "spread",
  "arrange",
  "camp",
  "invent",
  "cotton",
  "born",
  "determine",
  "quart",
  "nine",
  "truck",
  "noise",
  "level",
  "chance",
  "gather",
  "shop",
  "stretch",
  "throw",
  "shine",
  "property",
  "column",
  "molecule",
  "select",
  "wrong",
  "gray",
  "repeat",
  "require",
  "broad",
  "prepare",
  "salt",
  "nose",
  "plural",
  "anger",
  "claim",
  "continent",
  "oxygen",
  "sugar",
  "death",
  "pretty",
  "skill",
  "women",
  "season",
  "solution",
  "magnet",
  "silver",
  "thank",
  "branch",
  "match",
  "suffix",
  "especially",
  "fig",
  "afraid",
  "huge",
  "sister",
  "steel",
  "discuss",
  "forward",
  "similar",
  "guide",
  "experience",
  "score",
  "apple",
  "bought",
  "led",
  "pitch",
  "coat",
  "mass",
  "card",
  "band",
  "rope",
  "slip",
  "win",
  "dream",
  "evening",
  "condition",
  "feed",
  "tool",
  "total",
  "basic",
  "smell",
  "valley",
  "nor",
  "double",
  "seat",
  "arrive",
  "master",
  "track",
  "parent",
  "shore",
  "division",
  "sheet",
  "substance",
  "favor",
  "connect",
  "post",
  "spend",
  "chord",
  "fat",
  "glad",
  "original",
  "share",
  "station",
  "dad",
  "bread",
  "charge",
  "proper",
  "bar",
  "offer",
  "segment",
  "slave",
  "duck",
  "instant",
  "market",
  "degree",
  "populate",
  "chick",
  "dear",
  "enemy",
  "reply",
  "drink",
  "occur",
  "support",
  "speech",
  "nature",
  "range",
  "steam",
  "motion",
  "path",
  "liquid",
  "log",
  "meant",
  "quotient",
  "teeth",
  "shell",
  "neck"
];

prepareGame();

wordInput.addEventListener("input", typeWord);
startBtn.addEventListener("click", startLightsSequence);
restartBtn.addEventListener("click", preGame);
copyBtn.addEventListener("click", copyUrlToClipboard);
trackSelector.addEventListener("change", updateCircuitInfo);
document.addEventListener("keydown", handleKeys);

function handleKeys(e) {
  if (listeningForKeys && (e.code === "Space" || e.code === "Enter")) {
    if (isGameOver) {
      preGame();
    } else {
      if (seedInput === document.activeElement && e.code === "Space") {
        return;
      }
      
      startLightsSequence();
    }
  }
}

function getRandom() {
    var randomString = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
    return randomString;
}

function shortenURL(){
    let longURL = URLString;
    let rndURL = getRandom();
    shortURL = originalURL + "#" + rndURL;
    sendRequest(longURL, rndURL);
}

function prepareGame() {
    if (window.location.hash != "") {
        // get long URL
        originalURL = window.location.href.split('#')[0];
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(this.responseText);
                history.pushState({ id: 'typer' }, 'TypeR', res[0].data);
                urlQueryString = window.location.search;
                seedFromURL = new URLSearchParams(urlQueryString);

                generateTrackSelection();
                preGame();
                updateCircuitInfo();
            }
        }
        xmlhttp.open("GET", jsonboxEndpoint + "/" + hashh, true);
        xmlhttp.send();
    } else {
        generateTrackSelection();
        preGame();
        updateCircuitInfo();
    }
}

function sendRequest(url, randomURL) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", jsonboxEndpoint + "/" + randomURL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({data: url }));
}

function populateDataFromCookiesAndURL() {
    playerGhost.hidden = true;

    if (seedFromURL.has("s")) {
        let encryptedDataString = decodeURIComponent(urlQueryString.substring(3));
        receivedData = Object.decrypt(encryptedDataString, msg);
        seedInput.value = receivedData.seed;
        trackSelector.value = receivedData.track;
    } else {
        opponentGhost.hidden = true;
    }
}

function updateCircuitInfo() {
  trackFlag.src = tracks[trackSelector.value].flag;
  trackMap.src = tracks[trackSelector.value].trackmap;
  trackName.textContent = tracks[trackSelector.value].name;
  trackLength.textContent = tracks[trackSelector.value].circuitLength;
  modalTrack.textContent = tracks[trackSelector.value].name;
  playerIcon.className = "";
  playerIcon.classList.add("path");
  playerIcon.classList.add(tracks[trackSelector.value].path);
  opponentGhost.classList.add(tracks[trackSelector.value].path);

  if (receivedData && receivedData.track === trackSelector.value) {
      opponentGhost.hidden = false;
      if (receivedData.laptime) {
        isVersusMode = true;
      } else {
        isVersusMode = false;
      }
  } else {
      opponentGhost.hidden = true;
      isVersusMode = false;
  }
}

function generateTrackSelection() {
  //sort tracks array
  tracks.sort((a, b) => (a.name > b.name ? 1 : -1));
  trackSelector.innerHTML = "";

  tracks.forEach(function (track, index) {
    trackSelector.innerHTML += `<option value="${index}">${track.name}: ${track.circuitLength}m</option>`;
  });

  selectedTrack = tracks[trackSelector.value];
}

function copyUrlToClipboard() {
  textToCopy.select();
  document.execCommand("copy");
  copyBtn.disabled = true;
  copyBtn.textContent = "Copied!";
}

function updateWord() {
  if (currentDistance >= selectedTrack.circuitLength) {
    gameOver(true);
  } else {
    let randomWordIndex = seededRng() * words.length;
    currentWord = words[Math.floor(randomWordIndex)];
    randomWordDiv.textContent = currentWord;

    let date = new Date();
    let now = date.getTime();
    let origTime = now + maxTime;

    timeLeftDiv.textContent = maxTime / 1000;

    timeLeft = setInterval(function () {
      date = new Date();
      now = date.getTime();

      let time = Math.round((origTime - now) / 1000);

      timeLeftDiv.textContent = time;

      if (time <= 0) {
        gameOver(false);
      }
    }, 1000);
  }

  percentage = Math.floor(
    (currentDistance * 100) / selectedTrack.circuitLength
  );
  scoreDiv.textContent = percentage;
  gameOverPercentage.textContent = percentage;
  percentageBar.style["width"] = percentage + "%";
  
  updateTrackPosition();
}

function typeWord() {
  let str = wordInput.value.replace(/\s/g, '');
  wordInput.value = str;

  if (wordInput.value.toLowerCase() === currentWord) {
    wordInput.value = "";
    clearInterval(timeLeft);

    //----- NOTE TO SELF: HIGHLIGHT WORD LETTERS AS THEY'RE TYPED   -----

    currentDistance += Math.floor(distancePerWord + currentWord.length);

    if (currentDistance > selectedTrack.circuitLength) {
      currentDistance = selectedTrack.circuitLength;
    }

    updateWord();
  }
}

function generateRandomWithSeed() {
  if (seedInput.value) {
    let rndSeed = seedInput.value + trackSelector.value;
    seededRng = new Math.seedrandom(rndSeed);

    data.seed = seedInput.value;
    data.track = trackSelector.value;

    //history.pushState({ id: 'typer' }, 'TypeR', originalURL + '?s=' + seedInput.value + '&t=' + trackSelector.value)

    modalSeed.textContent = seedInput.value;
  } else {
    let rndNum = Math.round(Math.random() * 999999999999999);
    let rndSeed = rndNum + trackSelector.value;
    seededRng = new Math.seedrandom(rndSeed);
    //history.pushState({ id: 'typer' }, 'TypeR', originalURL)

    data.seed = rndNum;
    data.track = trackSelector.value;

    modalSeed.textContent = rndNum;
  }
}

function generateURL() {
    let encryptedDataString = data.encrypt(msg)['encrypted-data'];
    URLString = originalURL + "?s=" + encodeURIComponent(encryptedDataString);
    //history.pushState({ id: 'typer' }, 'TypeR', URLString);
    shortenURL();
}

function updateTrackPosition() {
  playerIcon.style["offset-distance"] = percentage + "%";
}

function startLightsSequence() {
  generateRandomWithSeed();

  startLights.classList.add("show");
  randomWordDiv.hidden = false;
  randomWordDiv.textContent = "Get ready!";
  trackSelectorItem.classList.remove("show");
  //trackSelectorItem.hidden = true;
  //startBtn.hidden = true;
  //startBtn.style["display"] = "none";
  startBtn.classList.remove("show");
  gameArea.hidden = false;
  gameArea.scrollIntoView(false);
  wordInput.disabled = true;
  wordInput.hidden = false;
  wordInput.value = "";
  trackSelector.disabled = true;
  seedInput.disabled = true;

  listeningForKeys = false;

  percentage = 0;
  updateTrackPosition();

  lightsTimer = setTimeout(function () {
    startLights.classList.remove("show");
    clearTimeout(lightsTimer);
  }, startLightsTime);

  lightsStartTimer = setTimeout(function () {
    startGame();
    clearTimeout(lightsStartTimer);
  }, startTime);
}

function startGame() {
  wordInput.disabled = false;
  wordInput.focus();

  currentDistance = 0;

  selectedTrack = tracks[trackSelector.value];
  //calculate distance per word
  distancePerWord = Math.ceil(
    (lapTimeScale * selectedTrack.circuitLength) / selectedTrack.intendedLapTime
  );

  updateWord();

  if (receivedData.laptime) {
    opponentGhost.classList.add("player-time-02");
    opponentGhost.style["animation-duration"] = receivedData.laptime + "ms";
    isVersusMode = true;
  } else {
    opponentGhost.hidden = true;
  }

  let start = new Date().getTime();

  lapTimeTimer = setInterval(function () {
    let now = new Date().getTime();
    let lapTime = now - start;
    let currentLapTime = textifyLapTime(lapTime);

    lapTimeDiv.textContent = currentLapTime;
    gameOverLapTime.textContent = currentLapTime;

    finishLapTime = lapTime;
  }, 1);
}

function gameOver(isWin) {
  clearInterval(timeLeft);
  clearInterval(lapTimeTimer);

  showModalContent();

  if (isVersusMode) {
    gameOverIcon.src = icons.versus;
    
    if (isWin) {  
      if (finishLapTime < receivedData.laptime) {
        gameOverReasonTitle.textContent = "FINISH";
        gameOverReason.innerHTML = "You finished <span class=\"txt-m txt-hl\">1</span><sup class=\"txt-hl\">st</sup>";

        firstPlIcon.className = "";
        firstPlIcon.classList.add(icons.class.player);
        firstPlName.textContent = "You";
        firstPlGap.textContent = "-";
        firstPlLaptime.textContent = textifyLapTime(finishLapTime);

        secondPlIcon.className = "";
        secondPlIcon.classList.add(icons.class.opponent);
        secondPlName.textContent = "Anonymous";
        secondPlGap.textContent = "+" + textifyLapTime(receivedData.laptime - finishLapTime);
        secondPlLaptime.textContent = textifyLapTime(receivedData.laptime);
        
        data.laptime = finishLapTime;
      } else if (finishLapTime > receivedData.laptime) {
        gameOverReasonTitle.textContent = "FINISH";
        gameOverReason.innerHTML = "You finished <span class=\"txt-m txt-hl\">2</span><sup class=\"txt-hl\">nd</sup>";

        firstPlIcon.className = "";
        firstPlIcon.classList.add(icons.class.opponent);
        firstPlName.textContent = "Anonymous";
        firstPlGap.textContent = "-";
        firstPlLaptime.textContent = textifyLapTime(receivedData.laptime);

        secondPlIcon.className = "";
        secondPlIcon.classList.add(icons.class.player);
        secondPlName.textContent = "You";
        secondPlGap.textContent = "+" + textifyLapTime(finishLapTime - receivedData.laptime);
        secondPlLaptime.textContent = textifyLapTime(finishLapTime);
      } else {
        gameOverReasonTitle.textContent = "PHOTO FINISH";
        gameOverReason.textContent = "You finished at the same time!";

        firstPlIcon.className = "";
        firstPlIcon.classList.add(icons.class.player);
        firstPlName.textContent = "You";
        firstPlGap.textContent = "-";
        firstPlLaptime.textContent = textifyLapTime(finishLapTime);

        secondPlIcon.className = "";
        secondPlIcon.classList.add(icons.class.opponent);
        secondPlName.textContent = "Anonymous";
        secondPlGap.textContent = "+" + textifyLapTime(receivedData.laptime - finishLapTime);
        secondPlLaptime.textContent = textifyLapTime(receivedData.laptime);
      }
    } else {
      gameOverReasonTitle.textContent = "CRASH";
      gameOverReason.textContent = "You've got wheel damage!";
      gameOverIcon.src = icons.crash;

      firstPlIcon.className = "";
      firstPlIcon.classList.add(icons.class.opponent);
      firstPlName.textContent = "Anonymous";
      firstPlGap.textContent = "-";
      firstPlLaptime.textContent = textifyLapTime(receivedData.laptime);

      secondPlIcon.className = "";
      secondPlIcon.classList.add(icons.class.player);
      secondPlName.textContent = "You";
      secondPlGap.textContent = "-";
      secondPlLaptime.textContent = "DNF";
    }
  } else if (isWin) {
    gameOverReasonTitle.textContent = "FINISH";
    gameOverReason.textContent = "Congratulations!";
    gameOverIcon.src = icons.finish;
    
    data.laptime = finishLapTime;
  } else {
    gameOverReasonTitle.textContent = "CRASH";
    gameOverReason.textContent = "You've got wheel damage!";
    gameOverIcon.src = icons.crash;
  }

  generateURL();
  
  gameOverModal.classList.add("show");
  textToCopy.value = shortURL;
  copyBtn.textContent = "Copy to clipboard";
  copyBtn.disabled = false;
  wordInput.disabled = true;
  wordInput.hidden = true;
  randomWordDiv.hidden = true;
  isGameOver = true;
  
  setTimeout(function () {
    restartBtn.classList.add("show");
    listeningForKeys = true;
  }, 3000);
}

function preGame() {
  populateDataFromCookiesAndURL();

  hideModalContent();

  percentage = 0;
  percentageBar.style["width"] = percentage + "%";
  isGameOver = false;
  listeningForKeys = true;
  updateTrackPosition();
  if (opponentGhost.classList.contains("player-time-02")) {
    opponentGhost.classList.remove("player-time-02");
  }
  
  history.pushState({ id: 'typer' }, 'TypeR', originalURL);
  lapTimeDiv.textContent = "00:00.000";
  timeLeftDiv.textContent = "3";
  scoreDiv.textContent = "0";

  trackSelectorItem.classList.add("show");
  restartBtn.classList.remove("show");
  startBtn.classList.add("show");
  trackSelector.disabled = false;
  seedInput.disabled = false;
  gameArea.hidden = true;
  gameOverModal.classList.remove("show");
}

function showModalContent() {
  if (isVersusMode) {
    versusContent.classList.add("show");
  } else {
    crashFinishContent.classList.add("show");
  }
}

function hideModalContent() {
  if (isVersusMode) {
    versusContent.classList.remove("show");
  } else {
    crashFinishContent.classList.remove("show");
  }
}

function textifyLapTime(lt) {
  return new Date(lt).toISOString().slice(14, -1);
}