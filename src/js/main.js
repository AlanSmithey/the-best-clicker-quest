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
        medias: document.querySelectorAll('[data-src]'),

        getLength: function() {
            return this.styles.length + this.images.length + this.medias.length;
        }
    };

    function count() {
        counter++;
        if (counter === elements.getLength()) {
            setInterval(function(){
                document.documentElement.classList.add('loaded'); // optional
                document.body.classList.remove('pause');
            }, 500);
            
        }
    }

    function stylesLoader() {

        for (var i = 0, len = elements.styles.length; i < len; i++) {
            var style = document.createElement('link');

            style.href = elements.styles[i];
            style.rel = 'stylesheet';
            style.onload = count;

            document.head.appendChild(style);
        }
    }

    function imagesLoader() {

        for (var i = 0, len = elements.images.length; i < len; i++) {

            elements.images[i].onload = count;
            elements.images[i].removeAttribute('srcset');
        }
    }

    function mediasLoader() {

        for (var i = 0, len = elements.medias.length; i < len; i++) {
            var mediaAttr = elements.medias[i].getAttribute('data-src');

            elements.medias[i].onload = count;
            elements.medias[i].setAttribute('src', mediaAttr);
        }
    };

    stylesLoader();
    imagesLoader();
    mediasLoader();
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