/*-----------------------*
 #DEFER RESOURCES
 *-----------------------*/
(function() {
    'use strict';
    var counter = 0;
    var STYLES = [
        'css/styles.min.css',
        'https://fonts.googleapis.com/css?family=Griffy|Indie+Flower'
    ];

    var IMAGES = [];

    function count() {
        counter++;
        if (counter === STYLES.length + IMAGES.length) {
            document.body.classList.remove('pause');
        }
    }

    function stylesLoader(url) {
        var element = document.createElement('link');

        element.href = url;
        element.rel = 'stylesheet';
        element.onload = count;

        document.head.appendChild(element);
    }

    function imagesLoader() {
        var images = document.getElementsByTagName('img');

        if (images) {
            for (var i = 0, len = images.length; i < len; i++) {
                IMAGES.push(i);

                images[i].onload = count;
                images[i].removeAttribute('srcset');
            }
        }
    }

    for (var i = 0, len = STYLES.length; i < len; i++) {
        stylesLoader(STYLES[i]);
    }

    imagesLoader();
})();

/*-----------------------*
 #iOS ACTIVE STATE HACK
 *-----------------------*/
(function() {
    'use strict';
    document.addEventListener("touchstart", function() {
    });
})();

/*-----------------------*
 #LOGIC
 *-----------------------*/
(function() {
    'use strict';
    var button = document.getElementById('button'),
        progress = document.getElementById('progress'),
        label = document.getElementById('label');

    var percent = 0,
        x = 0;

    function clickHandler(e) {
        button.classList.add('clicked');

        if(progress.value < progress.max) {
            progress.value = Math.sqrt(++x);
        } else {
            label.setAttribute('data-percent', ++percent);
            label.classList.add('completed');
            progress.value = 0;
            x = 0;
        }
    }

    if (button && progress) {
        button.addEventListener('click', clickHandler);
    }
})();

/*-----------------------*
 #GOOGLE ANALYTICS
 *-----------------------*/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-96475293-1', 'auto');
ga('send', 'pageview');