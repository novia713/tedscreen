/*
 * Tedscreen
 * (c) leandro@leandro.org
 * MIT license
 * v. 20151026
 */
// i did this because i liked the characted,
// i have not relation and not own anything related to Ted
// Universal Pictures, please, don't sue me :)
requirejs.config({
    appDir: ".",
    baseUrl: "js",
    paths: {
        'jQuery': ['jquery-2.1.4.min'],
        'jquery-ui': ['jquery-ui.min'],
        'underscore': ['underscore-min']
    },
    shim: {
        "jquery-ui": {
            exports: "$",
            deps: ['jQuery']
        },
        'underscore': {
            exports: '_',
            deps: ['jQuery']
        }
    }
});
require(["jQuery", 'underscore', 'jquery-ui'], function(jQuery, _) {
    // basic vars
    var parent = $('#apps');
    var iconMap = new WeakMap();
    /* CONFIG */
    var x = 2; //default icon columns key value
    var config = {};
    config.columns = [];
    config.columns[2] = 65;
    config.columns[3] = 35;
    /* END CONFIG */
    //Ted tile
    var ted = function() {
            var tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = 'pill';
            tile.innerHTML =
                "<img src='/style/icons/ted.png'/ id='ted_img'>";
            $('#apps')
                .prepend(tile);
        }
        //colors
    var get_color = function(app) {
        var obj_color = {};
        obj_color.Communications = "#B2F2FF"; //green 5F9B0A
        obj_color.Calendar = "#FF4E00"; //orange
        obj_color['E-Mail'] = "#FF4E00"; //orange
        obj_color['FM Radio'] = "#2C393B"; //grey
        obj_color.Camera = "#00AACC"; //blue
        obj_color.Clock = "#333333"; //warm grey
        obj_color.Gallery = "#00AACC"; //blue
        obj_color.Marketplace = "#00AACC"; //blue
        obj_color.Browser = "#00AACC"; //blue
        obj_color.Messages = "#5F9B0A"; //green
        obj_color.Video = "#CD6723"; //brick
        obj_color.Music = "#CD6723"; //brick
        obj_color.Settings = "#EAEAE7"; //ivory
        if (obj_color[app]) {
            return obj_color[app];
        } else {
            //random hex color;
            return '#' + Math.floor(Math.random() * 16777215)
                .toString(16);
        }
    };
    /**
     * Renders the icon to the container.
     */
    var render = function(icon) {
            var name = icon.app.manifest.name;
            //console.log(name);
            var wordname = name.split(" ");
            var firstchar = name.charAt(0);
            var tile_bg = ('violet' == config.selected_theme) ? config.pink_tile_bg :
                config.green_tile_bg;
            /* tile generation*/
            var tile = document.createElement('div');
            tile.className = 'tile';
            tile.className += ' icon_' + wordname[0];
            var str_tile = (config.color_tile) ? ", " + tile_bg : "";
            tile.style.background = get_color(name) + ' url(' + icon.icon +
                ') 49% no-repeat';
            $('#apps')
                .append(tile);
            iconMap.set(tile, icon);
            /* end tile generation*/
        }
        /* fires up the painting */
    var start = function() {
            //clean up to redraw
            $('.tile')
                .remove();
            // end clean up
            /**
             * Fetch all apps and render them.
             */
            FxosApps.all()
                .then(icons => {
                    icons.forEach(render);
                });
            //TED
            ted();
        } //end start
        /**
         * Add an event listener to launch the app on click.
         */
    window.addEventListener('click', e => {
        console.log(e);
        var i = iconMap.get(e.target);
        if (i) i.launch();
        //TED animation
        if (e.explicitOriginalTarget.id == "ted_img") {
            $(".tile")
                .effect("shake");
        }
    }); //end window event 'click'
    // 3, 2, 1 ...
    start();
});
