/*-----------------------*
 #DEFER LINKS
 *-----------------------*/
(function() {
    'use strict';
    var counter = 0;
    var elements = [
        'css/styles.min.css'
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
    var images = document.querySelectorAll('[data-srcset]');

    if (images) {
        for (var i = 0, len = images.length; i < len; i++) {

            var imgAttr = images[i].getAttribute('data-srcset');

            images[i].setAttribute('srcset', imgAttr);
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
        label = progress.labels.item(0);

    var step = 100,
        percent = 1;

    function clickHandler(e) {
        if(progress.value < progress.max) {
            progress.value += (step - percent);
        } else {
            label.setAttribute('data-percent', percent++);
            label.classList.add('completed');
            progress.value = 0;
        }
    }

    if (button && progress) {
        button.addEventListener('click', clickHandler);
    }
})();