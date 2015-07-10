/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="utility/utility.ts" />

/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/road.ts" />
/// <reference path="objects/car.ts" />
/// <reference path="objects/button.ts" />

/// <reference path="objects/fuelcan.ts" />
/// <reference path="objects/stone.ts" />


/// <reference path="objects/scoreboard.ts" />


/// <reference path="managers/collision.ts" />


// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;
var game: createjs.Container;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "road", src: "assets/images/road track.png" },
    { id: "car", src: "assets/images/car7.png" },
    { id: "fuelcan", src: "assets/images/gaspump.png" },
    { id: "start", src: "assets/images/instructions.png" },
    { id: "gameover", src: "assets/images/gameover.png" },
    { id: "startbutton", src: "assets/images/startbutton.png" },
    { id: "tryagain", src: "assets/images/tryagain.png" },
    { id: "stone", src: "assets/images/stone.png" },
    { id: "yay", src: "assets/audio/fuelcansound.wav" },
    { id: "thunder", src: "assets/audio/stonesound.wav" },
    { id: "engine", src: "assets/audio/cardriving.wav" }
];


// Game Variables
var road: objects.Road;
var car: objects.Car;
var fuelcan: objects.FuelCan;
var stones: objects.Stone[] = [];

var x: number = 0;

var scoreboard: objects.ScoreBoard;

// Game Managers
var collision: managers.Collision;
var start: createjs.Bitmap;
var gameover: createjs.Bitmap;
var startbutton: objects.Button;
var tryagain: objects.Button;


// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    road.update();
    car.update();
    fuelcan.update();
    
    for (var stone = 0; stone < 3; stone++) {
        stones[stone].update();
        collision.check(stones[stone]);
    }

    collision.check(fuelcan);
    if (x == 1) {

        scoreboard.update();
    }

    stage.update();

    stats.end(); // end measuring
}

function startButtonClicked(event: createjs.MouseEvent) {
    game.addChild(fuelcan);
    game.addChild(car);
    // add 3 stone objects to stage
    for (var stone = 0; stone < 3; stone++) {
       
        game.addChild(stones[stone]);
    }
   // game.addChild(scoreboard.lives);
   // game.addChild(scoreboard.score);
    //add scoreboard
    game.removeChild(start);
    game.removeChild(startbutton);
    game.removeChild(tryagain);
    game.removeChild(gameover);
    
    x = 1;
    

}

function tryagainButtonClicked(event: createjs.MouseEvent) {

    game.addChild(fuelcan);
    game.addChild(car);
    // add 3 stone objects to stage
    for (var stone = 0; stone < 3; stone++) {

        game.addChild(stones[stone]);
    }
    // game.addChild(scoreboard.lives);
    // game.addChild(scoreboard.score);
    //add scoreboard
    game.removeChild(start);
    game.removeChild(startbutton);
    game.removeChild(tryagain);
    game.removeChild(gameover);
    x = 1;
    
    
}

// Our Main Game Function
function main() {
    // instantiate game conatainer
    x = 0;
    game = new createjs.Container();

    

    //add car object to stage
    road = new objects.Road(assets.getResult("road"));
    game.addChild(road);

    //add fuelcan object to stage
    fuelcan = new objects.FuelCan(assets.getResult("fuelcan"));

    for (var stone = 0; stone < 3; stone++) {
        stones[stone] = new objects.Stone(assets.getResult("stone"));

               
    }
   

    // add car object to stage
    car = new objects.Car(assets.getResult("car"));
      

    start = new createjs.Bitmap(assets.getResult("start"));
    game.addChild(start);

    startbutton = new objects.Button(assets.getResult("startbutton"), 440, 320);
    game.addChild(startbutton);
    startbutton.on("click", startButtonClicked);

    gameover = new createjs.Bitmap(assets.getResult("gameover"));

    tryagain = new objects.Button(assets.getResult("tryagain"), 440, 340);
    tryagain.on("click", tryagainButtonClicked);


    scoreboard = new objects.ScoreBoard();
   

    //add collision manager
    collision = new managers.Collision();

    

    //add game conatiner to stage
    stage.addChild(game);

    console.log(game);

}