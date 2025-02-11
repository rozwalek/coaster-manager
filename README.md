# Coster Manager
<p align="center">
<a href="https://codeigniter.com/"><img src="https://img.shields.io/badge/CodeIgniter-orange?style=for-the-badge&logo=CodeIgniter&logoColor=white" alt="Build Status"></a>
<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/redis-%23316192.svg?style=for-the-badge&logo=redis&logoColor=white" alt="Build Status"></a>
<a href="https://www.php.net/"><img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="Build Status"></a>
</p>

## Description
Application "CoasterManager" test task created in the recruitment process for BlueBinary.io 

## Frameworks
* CodeIgniter 4.0

## Requirements

|  Service name  | version |                      Description                       |
|:--------------:|:-------:|:------------------------------------------------------:|
|      PHP       |   8.2   | Main backend programming language used in the project. |
|     Redis      | latest  |         Main Cache DB used in the application.         |
|     Docker     |   20+   |      Required for the local and dev environments.      |
| Docker compose | 2.11.2+ |      Required for the local and dev environments.      |
|    Composer    |   2+    |        Required for the production environment.        |


## Installation

#### Clone project

`git clone https://bitbucket.org/marketnews24/coastermanager.git`

#### Build and run containers
```
docker-compose build
docker-compose up -d
docker exec -it {CONTAINER_ID} /bin/bash
```

#### Configure project

Create ``.env`` file and set ``CI_ENVIRONMENT`` variable,  available options:
- ``development``
- ``production``

Depending on the set environment, the application saves data to separate sections in order to separate data per environment.

#### Install project
```
composer install
npm install
webpack build
``` 

#### Run project

Open page ``http://localhost:8040`` in web browser.

#### Access to panel

If the application was launched in the production environment, then the panel will be protected with a login and password.

Access:
- Login: ``admin``
- Password: ``admin123``

#### Run CLI Monitoring Command

Get _**{CONTAINER_ID}**_ for docker image ``coastermanager_php``. You can use below method:

``docker ps | grep coastermanager_php``

Open console for ``coastermanager_php`` and run monitor script.

```
docker exec -it CONTAINER_ID /bin./bash
php spark queue-monitor
```

Logs with problem will be saved to file ```/var/www/html/writable/queue_monitor_log.txt```

## API methods

|              Endpoint              | Method |       Description        |                                                                                                                                                                                             Example                                                                                                                                                                                              |
|:----------------------------------:|:------:|:------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|           /api/coasters            |  POST  |       Add coaster        |                                                                                             curl --location 'http://localhost:8040/api/coasters' --form 'number_of_client="45000"' --form 'number_of_staff="12"' --form 'route_lenght="1200"' --form 'time_start="08:00"' --form 'time_end="15:00"'                                                                                              |
|           /api/coasters            |  GET   | Get all defined coasters |                                                                                                                                                                       curl --location 'http://localhost:8040/api/coasters'                                                                                                                                                                       |
|        /api/coasters/{uuid}        |  GET   |   Get defined coaster    |                                                                                                                                                                curl --location 'http://localhost:8040/api/coasters/67a518c04f8c3'                                                                                                                                                                |
|        /api/coasters/{uuid}        |  PUT   |  Change define coaster   |                                                                                                                    curl --location --request PUT 'http://localhost:8040/api/coasters/67a51a9a25907' --header 'Content-Type: application/json' --data '{"time_end": "16:00"}'                                                                                                                     |
|        /api/coasters/{uuid}        | DELETE |  Delete define coaster   |                                                                                                                                                       curl --location --request DELETE 'http://localhost:8040/api/coasters/67a518c04f8c3'                                                                                                                                                        |
|    /api/coasters/{uuid}/wagons     |  POST  |  Add new coaster wagons  |                                                                                                                                  curl --location 'http://localhost:8040/api/coasters/67a9fbfaf02a9/wagons' --form 'number_of_places="32"' --form 'speed="1.2"'                                                                                                                                   |
| /api/coasters/{uuid}/wagons/{uuid} |  GET   |        Get wagon         |                                                                                                                                                                                                                                                                                                                                                                                                  |
| /api/coasters/{uuid}/wagons/{uuid} |  PUT   |  Change coaster wagons   |                                                                                                             curl --location --request PUT 'http://localhost:8040/api/coasters/67a7ba1b9f9c0/wagons/67a7beb7b1925' --header 'Content-Type: application/json' --data '{"speed": 1.6 }'                                                                                                             |
| /api/coasters/{uuid}/wagons/{uuid} | DELETE |  Delete coaster wagons   |                                                                                                                   curl --location --request DELETE 'http://localhost:8040/api/coasters/67a7ba1b9f9c0/wagons/67a7becf2b462' --form 'number_of_places="32"' --form 'speed="1.2"'                                                                                                                   |

