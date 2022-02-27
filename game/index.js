let game;
const config = {
    
    type: Phaser.CANVAS,
    mode: Phaser.Scale.RESIZE,

    // game width, in pixels
    width: window.innerWidth / 1.5,

    // game height, in pixels
    height: window.innerHeight / 1.5,

    // game background color
    backgroundColor: 0x880044,

    // scenes used by the game
    scene: [
        preload,
        play,

    ],
    dom: {
        createContainer: true
    },
};

// game constructor
game = new Phaser.Game(config);