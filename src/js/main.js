/*-----------------------*
 #DEFER LINKS
 *-----------------------*/
(function() {
    'use strict';
    var counter = 0;
    var elements = [
        'css/styles.min.css',
        'https://fonts.googleapis.com/css?family=Griffy|Indie+Flower'
    ];

    function count() {
        counter++;
        if (counter === elements.length) {
            document.body.classList.remove('pause');
        }
    }

    function controller(url) {

        var element = document.createElement('link');

        element.href = url;
        element.rel = 'stylesheet';
        element.onload = count;

        document.head.appendChild(element);
    }

    for (var i = 0, len = elements.length; i < len; i++) {
        controller(elements[i]);
    }
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
 #DEFER IMAGES
 *-----------------------*/
(function() {
    'use strict';
    var images = document.getElementsByTagName('img');

    if (images) {
        for (var i = 0, len = images.length; i < len; i++) {
            images[i].removeAttribute('srcset');
        }
    }
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