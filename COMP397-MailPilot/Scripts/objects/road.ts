module objects {
    // Road Class ++++++++++++++++++++++++++++++++++++++
    export class Road extends createjs.Bitmap {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++
        width: number;
        height: number;
        dx: number = 5;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.reset();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        private checkBounds(): void {

            //  road has left screen
            if (this.x == -1280) {
                this.reset();
            }
        }


        private reset(): void {
            this.x = 0;
            this.y = 0; // reset road off screen
        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {

            this.x -= this.dx; // moves road left the stage
            this.checkBounds();
        }
    }
}  