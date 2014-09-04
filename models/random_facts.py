import random


RANDOM_FACTS = (
    'I can type the alphabet in 1.32 seconds.',
    'I am slightly allergic to soy.',
    'I play the <a href="https://www.youtube.com/watch?v=_5B4GVYM3rk">keyboard</a>.',
    'My favorite color is red.',
    'I enjoy grapefruit juice.',
    'I was once a top-tier Guitar Hero player.',
    'I have two cats.',
    'The house I grew up in was built in 1780.',
    'I was on a FIRST robotics team.',
    'I have a YouTube video with over 2 million views.',
    'I\'ve never been to Europe.',
    'I love typography.',
    'I love classical music. My favorite composer is <a href="https://www.youtube.com/watch?v=6JQm5aSjX6g">Bach</a>.',
    '<a href="http://www.youtube.com/watch?v=4WX58CZwyiU">This</a> is my favorite YouTube video.',
    'I\'m not a huge fan of steak.'
)


def get_random_fact():
    return random.choice(RANDOM_FACTS)