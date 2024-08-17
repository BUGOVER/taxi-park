- Client

1) yarn || npm install
2) yarn || npm build

- Api

composer install

Vagrant or Docker

- Vagrant

1) Install VirtualBox && Vagrant on your PC
2) change in Homestead.yaml line 11 "/home/artak/work/projects/test-taxi/" to your path
3) Go to project/api folder and run vagrant up

- Docker

1) Install docker-compose on your PC
2) Go to project/api
3) run, docker compose up -d

cd project/api and run
"php bin/console doctrine:migrations:migrate"
