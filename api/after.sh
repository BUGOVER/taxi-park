#!/bin/sh

# If you would like to do some extra provisioning you may
# add any commands you wish to this file and they will
# be run after the Homestead machine is provisioned.
#
# If you have user-specific configurations you would like
# to apply, you may also create user-customizations.sh,
# which will be run after this script.

# Copy SSL Certificates
sudo cp -r /etc/ssl/certs/ca.homestead.test-taxi.crt /home/vagrant/test-taxi/.etc/ssl

# Set PHP version
sudo update-alternatives --set php /usr/bin/php8.3
sudo update-alternatives --set phar /usr/bin/phar8.3
sudo update-alternatives --set phar.phar /usr/bin/phar.phar8.3
sudo phpenmod xdebug

# Add PPA repository

sudo add-apt-repository ppa:redislabs/redis -y

sudo apt update
sudo apt upgrade -y

sudo apt install cron -y
sudo apt install php-gmp
sudo apt install php-bcmath
sudo apt install php-igbinary
sudo apt install libc-ares-dev libcurl4-openssl-dev

sudo pecl install yaml
sudo apt-get install php-yaml

# Install new version beanstalkd, for queue on prod test
wget https://launchpad.net/ubuntu/+archive/primary/+files/beanstalkd_1.12-2_amd64.deb
sudo dpkg -i beanstalkd_1.12-2_amd64.deb
sudo rm -rf beanstalkd_1.12-2_amd64.deb

# NGINX
sudo apt install nginx-extras -y
sudo add-apt-repository ppa:ondrej/nginx -y

if [ -f ".etc/nginx/test-taxi.loc" ]; then
  sudo cp -r /home/vagrant/test-taxi/.etc/nginx/test-taxi.loc /etc/nginx/sites-available/
fi

# SUPERVISOR
pip install --upgrade supervisor
pip install superlance

sudo supervisorctl reread
sudo supervisorctl restart all

sudo apt autoremove -y
sudo apt autoclean -y

# Project settings commands
cd /home/vagrant/test-taxi || exit

composer install

php bin/console doctrine:migrations:migrate
