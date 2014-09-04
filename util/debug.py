import traceback

def dbg(f):
    """If `f` raises an unhandled exception, render a traceback instead of failing."""
    def inner(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except:
            return '<pre>%s</pre>' % traceback.format_exc()
    return inner