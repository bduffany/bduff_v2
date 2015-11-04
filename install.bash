#/bin/bash

# Sets up the server with all the necessary prerequisites for running the site,
# and adds useful aliases to the .bashrc of the server.

apt-get install -y \
    apache2
    libapache2-mod-wsgi \
    python-pip \
    nodejs \
    npm \
    ruby \
    ruby-dev

gem install compass
npm install -g gulp

pip install -r requirements.txt

ln -s /usr/bin/nodejs /usr/bin/node
ln -s `pwd` /var/www/bduff
ln -s `pwd`/bduff.conf /etc/apache2/sites-available/bduff.conf

a2dissite 000-default.conf
a2ensite bduff.conf
service apache2 restart

echo 'cd /var/www' >> ~/.bashrc
echo 'alias update-site="cd /var/www && git pull && npm install && pip install -r requirements.txt && gulp build && sudo service apache2 restart"' >> ~/.bashrc

