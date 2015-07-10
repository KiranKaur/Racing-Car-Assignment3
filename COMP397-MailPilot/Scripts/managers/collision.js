var managers;
(function (managers) {
    var Collision = (function () {
        //CONSTRUCTOR +++++++++++++++++++++++++++
        function Collision() {
        }
        //PUBLIC METHODS ++++++++++++++++++++++++
        // check the distance between car and any other game object
        Collision.prototype.check = function (gameObject) {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = car.x;
            p1.y = car.y;
            p2.x = gameObject.x;
            p2.y = gameObject.y;
            if (utility.distance(p1, p2) < ((car.height * 0.5) + (gameObject.height * 0.5))) {
                if (gameObject.isColliding == false) {
                    createjs.Sound.play(gameObject.sound);
                    if (gameObject.name == "stone") {
                        scoreboard.lives--;
                        if (scoreboard.lives < 0) {
                            game.removeChild(fuelcan);
                            game.removeChild(car);
                            for (var stone = 0; stone < 3; stone++) {
                                game.removeChild(stones[stone]);
                            }
                            scoreboard.lives = 5;
                            scoreboard.score = 0;
                            game.addChild(gameover);
                            game.addChild(tryagain);
                            x = 0;
                        }
                    }
                    if (gameObject.name == "fuelcan") {
                        scoreboard.score += 100;
                    }
                }
                gameObject.isColliding = true;
            }
            else {
                gameObject.isColliding = false;
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map