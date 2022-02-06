let game;

$.when(
    $.getScript('./game/scenes/preload.js'),
    $.getScript('./game/scenes/play.js'),
    $.Deferred(function (deferred) {
        $(deferred.resolve);
    })
).done(function () {
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

            ]
        };

        // game constructor
        game = new Phaser.Game(config);

});