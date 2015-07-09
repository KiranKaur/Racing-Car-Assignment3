var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Island Class ++++++++++++++++++++++++++++++++++++++
    var Island = (function (_super) {
        __extends(Island, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        function Island(imageString) {
            _super.call(this, imageString);
            this.name = "island";
            this.sound = "yay";
            this.dx = 5;
            this.reset();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        Island.prototype.checkBounds = function () {
            // check if island has left screen
            if (this.x < 0) {
                this.reset();
            }
        };
        Island.prototype.reset = function () {
            this.y = Math.floor(Math.random() * 380); // start island at random location
            this.x = 600; // start island off stage
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        Island.prototype.update = function () {
            this.x -= this.dx; // moves island down the stage
            this.checkBounds();
        };
        return Island;
    })(objects.GameObject);
    objects.Island = Island;
})(objects || (objects = {}));
//# sourceMappingURL=island.js.map