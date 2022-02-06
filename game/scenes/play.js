// the game itself
var gameOptions = {

    // slices (prizes) placed in the wheel
    slices: 8,

    // prize names, starting from 12 o'clock going clockwise
    

    // wheel rotation duration, in milliseconds
    rotationTime: 8000
}

// PlayGame scene
class play extends Phaser.Scene{
    

    // constructor
    constructor(){
        super("play");
    }

    // method to be executed once the scene has been created
    create(){
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // adding the wheel in the middle of the canvas
        this.wheel = this.add.sprite(screenCenterX, screenCenterY - 75, "wheel");

        // adding the pin in the middle of the canvas
        this.pin = this.add.sprite(screenCenterX, screenCenterY - 75, "pin");

        // adding the text field
        this.prizeText = this.add.text(screenCenterX, screenCenterY * 1.75, _STRINGS.GamePlay.btnSpin, _STRINGS.StyleText.prizeText);

        // center the text
        this.prizeText.setOrigin(0.5);

        // the game has just started = we can spin the wheel
        this.canSpin = true;

        // waiting for your input, then calling "spinWheel" function
        this.prizeText.setInteractive({
            useHandCursor: true
        });
        this.prizeText.on("pointerdown", this.spinWheel, this);

        // adding the watermark
        this.add.text(screenCenterX , screenCenterY * 1.94, _STRINGS.Branding.watermark, _STRINGS.StyleText.watermark).setOrigin(0.5, 0);

    }

    // function to spin the wheel
    spinWheel(){
        var wofBgm = this.sound.add('wof');
        wofBgm.stop();

        // can we spin the wheel?
        if(this.canSpin){

            wofBgm.play();

            // resetting text field
            this.prizeText.setText("");

            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 4);

            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0, 360);

            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            var prize = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));

            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;

            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            this.tweens.add({

                // adding the wheel to tween targets
                targets: [this.wheel],

                // angle destination
                angle: 360 * rounds + degrees,

                // tween duration
                duration: gameOptions.rotationTime,

                // tween easing
                ease: "Cubic.easeOut",

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function(tween){

                    // displaying prize text
                    this.prizeText.setText(_STRINGS.GamePlay.slicePrizes[prize]);

                    // player can spin again
                    this.canSpin = true;
                    wofBgm.stop();
                }
            });
        }
    }
}
