class preload extends Phaser.Scene {


    // constructor
    constructor() {
        super("preload");
    }

    // method to be executed when the scene preloads
    preload() {

        // loading assets
        this.load.image("wheel", "media/images/wheel.png");
        this.load.image("pin", "media/images/pin.png");

        // loading audio
        this.load.audio('wof', "media/audio/wof.ogg");

        this.load.once('complete', () => {
            this.scene.start('play');
        });
    }
}
