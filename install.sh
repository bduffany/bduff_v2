#/bin/sh

# Runs the server, installing the necessary prerequisites.

apt-get install -y \
    apache2
    libapache2-mod-wsgi \
    python-pip

ln -s `pwd` /var/www/bduff
ln -s `pwd`/bduff.conf /etc/apache2/sites-available/bduff.conf

a2dissite 000-default.conf
a2ensite bduff.conf

service apache2 restart

