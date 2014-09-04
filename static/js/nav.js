/* Controls the dynamic navigation of the site */

var MAIN_ID = '#maincontent',
    fancy = true,
    first_load = true,
    /* Cache to store already loaded content */
    _cache = [],
    cache_ignore = ['posts/create', ''];

// When the hash changes, load a new page
$(window).bind('hashchange', function() {
    var hash = window.location.hash.replace(/^#/, '');
    if (!hash) {
        hash = remslash(window.location.pathname);
    }
    if (!hash) {
    	hash = 'home'
    }
    if (first_load) {
        first_load = false;
    }
    loadNewPage(hash);
});

/* Attempt to cache the specified content */
function cache(href, content) {
    if ($.inArray(href, cache_ignore) < 0) {
        _cache[href] = content;
    }
}

/* Load the content from the url into the specified container (selector)
   with optional arguments specified by data. 
   Returns a promise that is resolved when the HTML has been successfully 
   loaded into the container. */
function ajaxLoad(href, selector, promise) {
    var def = new $.Deferred();
    var divvy = function(r) {
        $(selector).html(r);
        def.resolve();
    };
    var render = function(r) {
        if (promise) {
            promise.done(function() {
                divvy(r);
            });
        } else {
            divvy(r);
        }
    }
    if (_cache[href]) {
        render(_cache[href]);
    } else {
        $.get(href, function(result) {
            cache(href, result);
            render(result);
        });
    }
    return def.promise();
}

/* Fades in the divs on the page */
function fadeDivsIn() {
    if (fancy) {
        if ($('.contentbox:first').length) {
            (function fadeIn(elem, ind) {
                elem.delay(150 * ind).fadeIn(100);
                if (elem.next().length) {
                  fadeIn(elem.next(), ind + 1);
              }
            })($(".contentbox:first"), 0);
        }
    } else {
        $('.contentbox').show();
    }
}

/* Fades all contentboxes out and returns a promise that is
 * resolved when all divs have faded out. */
function fadeDivsOut() {
    var deferred = new $.Deferred();
    if (fancy) {
        if ($('.contentbox:first').length) {
            (function fadeOut(elem) {
                elem.fadeOut({
                    queue: false,
                    duration: 50, 
                    easing: "easeOutQuart",
                    done: function() {
                        if (!elem.next().length) {
                            deferred.resolve();
                        }
                    }
                });
              if (elem.next().length) {
                  fadeOut(elem.next());
              }
            })($(".contentbox:first"));
        } else {
            deferred.resolve();
        }
    } else {
        deferred.resolve();
    }
    return deferred.promise();
}

// Loads a new page into the maincontent div, fading out old content.
function loadNewPage(href) {
    ajaxLoad('content/' + href, MAIN_ID, fadeDivsOut()).done(initPage);
}

// Arm newly created page elements with appropriate events
function initPage() {
    fadeDivsIn();
}

// Utility function to remove intro slashes from a string
function remslash(str) {
    return str.replace(/^\/+/, '');
}

var tabs = document.querySelector('paper-tabs');
tabs.addEventListener('core-select', function(e) {
    if (e.detail.isSelected) {
        loadNewPage(tabs.selected);
    }
});

// Load the ajax content on first run of document
$(window).trigger('hashchange');
