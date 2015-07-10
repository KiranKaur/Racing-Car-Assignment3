module objects {
    // Stone Class ++++++++++++++++++++++++++++++++++++++
    export class Stone extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);

            this.name = "stone";
            this.sound = "thunder";

            this.reset();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        private checkBounds(): void {

            // check if stone has left screen
            if (this.x < 0 ) {
                this.reset();
            }
        }


        private reset(): void {
            this.y =  Math.floor(Math.random() * 300); // start stone at random location
            this.x = 640 ; // start stone off stage
            this.dx = Math.floor(Math.random() * 5) + 5;
            this.dy = Math.floor(Math.random() * 4) - 2;
        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {

            this.x -= this.dx; // moves stone down the stage
           // this.y += this.dy; // drifts stone right and left
            this.checkBounds();
        }
    }
}  