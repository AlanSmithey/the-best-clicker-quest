/*-----------------------*
 #DEFER RESOURCES
 *-----------------------*/
(function() {
    'use strict';
    var counter = 0;
    var elements = {
        styles: [
            'css/styles.min.css',
            'https://fonts.googleapis.com/css?family=Griffy|Indie+Flower'
        ],
        images: document.getElementsByTagName('img'),
        iframes: document.getElementsByTagName('iframe'),
        videos: document.getElementsByTagName('video'),
        audios: document.getElementsByTagName('audio'),

        getTotalLength: function() {
            return this.styles.length + this.images.length + this.iframes.length + this.videos.length + this.audios.length;
        }
    };

    function count() {
        counter++;
        if (counter === elements.getTotalLength()) {
            setInterval(function(){
                document.documentElement.classList.remove('html-loading');
                document.body.classList.remove('body-pause');
            }, 500);
        }
    }

    function stylesLoader() {
        for (var i = 0, len = elements.styles.length; i < len; i++) {
            var style = document.createElement('link');

            style.href = elements.styles[i];
            style.rel = 'stylesheet';
            style.addEventListener('load', count);

            document.head.appendChild(style);
        }
    }

    function imagesLoader() {
        for (var i = 0, len = elements.images.length; i < len; i++) {

            elements.images[i].addEventListener('load', count);
            elements.images[i].removeAttribute('srcset');
        }
    }
    
    function iframesLoader() {
        for (var i = 0, len = elements.iframes.length; i < len; i++) {
            var src = elements.iframes[i].getAttribute('data-src');

            elements.iframes[i].addEventListener('load', count);
            elements.iframes[i].setAttribute('src', src);
        }
    }

    function videosLoader() {
        for (var i = 0, len = elements.videos.length; i < len; i++) {
            var src = elements.videos[i].getAttribute('data-src');

            elements.videos[i].addEventListener('canplay', count);
            elements.videos[i].setAttribute('src', src);
        }
    }

    function audiosLoader() {
        for (var i = 0, len = elements.audios.length; i < len; i++) {
            var src = elements.audios[i].getAttribute('data-src');

            elements.audios[i].setAttribute('src', src);
            count();
        }
    }

    stylesLoader();
    imagesLoader();
    iframesLoader();
    videosLoader();
    audiosLoader();
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
        startPoint = progress.value,
        endPoint = progress.max,
        changeValue = endPoint - startPoint,
        x = startPoint;

    function clickHandler(e) {
        button.classList.add('clicked');

        if(progress.value < progress.max) {
            Math.easeOutQuad = function (t, b, c, d) {
                t /= d;
                return -c * t*(t-2) + b;
            };

            progress.value = Math.easeOutQuad(++x, startPoint, changeValue, endPoint);
            
        } else {
            label.setAttribute('data-percent', ++percent);
            label.classList.add('completed');
            progress.value = startPoint;
            x = startPoint;
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