/* For http://foo.com/some/path#hash, returns "some/path". */
function get_path() {
    return window.location.pathname.replace(/^\/+/, '');
}

/* If the user accesses http://foo.com/bar, redirect them to
 * http://foo.com/#bar. */
if (get_path()) {
    window.location = '/#' + get_path();
}