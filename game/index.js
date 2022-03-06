let game;
let element;
const config = {
    
    type: Phaser.CANVAS,
    mode: Phaser.Scale.RESIZE,
    parent: "game-container",

    // game width, in pixels
    width: window.innerWidth,

    // game height, in pixels
    height: window.innerHeight,

    // game background color
    backgroundColor: 0x880044,
    dom: {
        createContainer: true
    },
    // scenes used by the game
    scene: [
        preload,
        play,

    ],
};

// game constructor
game = new Phaser.Game(config);