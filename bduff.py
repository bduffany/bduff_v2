import mistune
from flask import Flask
from flask import render_template

import config
from models import random_facts


app = Flask(__name__)

content_models = {
    'posts/welcome.html': {
        'random_facts': random_facts
    }
}

processors_by_extension = {
    'md': mistune.markdown
}

def content_from_path(path):
    rendered_template = render_template(path, models=content_models.get(path))
    ext = path.split('.')[-1]
    postprocess = processors_by_extension.get(ext, lambda x: x)
    return postprocess(rendered_template)

@app.route("/")
def master_template():
    return render_template('main.html')

@app.route("/<_>")
def master_template_ignore_arg(_):
    return master_template()


@app.route("/content/<section>")
def render_content(section):

    if section == 'home' or section == '':
        content_list = [content_from_path(path) for path in config.HOME_CONTENT_ORDERED]  
    elif section == 'about':
        content_list = [content_from_path('posts/about.md')]
    elif section == 'contact':
        content_list = [content_from_path('posts/contact.md')]
    else:
        content_list = ["Hmm ... I couldn't find that page."]

    return render_template('content_list.html', content_list=content_list)
    

if __name__ == "__main__":
    app.run()