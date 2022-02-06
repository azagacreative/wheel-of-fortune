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
    //console.log('%cFetching %s', 'color:#ffbc2e;', src);

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
    // LOAD LIBRARY
    'lib/phaserjs/phaser.min.js',

    // load dependencies
    'media/strings/text.js',

    // load game
    'game/dev.js'
],
    function () {
        /* Optional - Executed each time a script has loaded (Use for Progress updates?) */
    },
    function () {
        /* Optional - Executed when the entire list of scripts has been loaded */
    }
);
scripts.fetch(); 