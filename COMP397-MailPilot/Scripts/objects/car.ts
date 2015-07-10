module objects {
    // Car Class ++++++++++++++++++++++++++++++++++++++
    export class Car extends objects.GameObject {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);

            this.sound = "engine";

            this.x = 50;

            createjs.Sound.play(this.sound, {"loop": -1});
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {
            this.y = stage.mouseY; // position car under mouse
        }
    }
} 