function getScripts(scripts, onScript, onComplete) {
    this.async = true;
    this.cache = false;
    this.data = null;
    this.complete = function () { $.scriptHandler.loaded(); };
    this.scripts = scripts;
    this.onScript = onScript;
    this.onComplete = onComplete;
    this.total = scripts.length;
    this.progress = 0;
};

getScripts.prototype.fetch = function () {
    $.scriptHandler = this;
    var src = this.scripts[this.progress];
    console.log('%cFetching:', 'color:#ffbc2e;', src+'?_sess='+Date.now());

    $.ajax({
        crossDomain: true,
        async: this.async,
        cache: this.cache,
        type: 'GET',
        url: src,
        data: this.data,
        statusCode: {
            200: this.complete
        },
        dataType: 'script'
    });
};

getScripts.prototype.loaded = function () {
    this.progress++;
    if (this.progress >= this.total) {
        if (this.onComplete) this.onComplete();
    } else {
        this.fetch();
    };
    if (this.onScript) this.onScript();
};
var scripts = new getScripts([
    // load dependencies
    'plugins/crypto-js.js',
    'lib/strings/text.js',
    'api.js',
    
    // load library
    'lib/phaserjs/phaser.min.js',

    // load game
    'game/scenes/preload.js',
    'game/scenes/play.js',
    'game/index.js',
],
    function () {
        /* Optional - Executed each time a script has loaded (Use for Progress updates?) */
    },
    function () {
        /* Optional - Executed when the entire list of scripts has been loaded */
    }
);
scripts.fetch(); 