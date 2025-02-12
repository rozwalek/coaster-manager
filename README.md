# Coaster Manager
<p style="text-align: center;">
    <a href="https://www.php.net"><img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP logo"></a>
    <a href="https://codeigniter.com"><img src="https://img.shields.io/badge/codeigniter-%2523316192.svg?style=for-the-badge&logo=codeigniter&logoColor=white&labelColor=dd4814&color=dd4814" alt="CodeIgniter logo"></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/react-%252523316192?style=for-the-badge&logo=react&logoColor=white&labelColor=087ea4&color=087ea4" alt="React logo"></a>
    <a href="https://redis.io"><img src="https://img.shields.io/badge/redis-%2523316192.svg?style=for-the-badge&logo=redis&logoColor=white&labelColor=ff4438&color=ff4438" alt="Redis logo"></a>
    <a href="https://getcomposer.org"><img src="https://img.shields.io/badge/composer-%2523316192.svg?style=for-the-badge&logo=composer&logoColor=white&color=gray&labelColor=gray" alt="Composer logo"></a>
    <a href="https://www.docker.com"><img src="https://img.shields.io/badge/docker-%2523316192.svg?style=for-the-badge&logo=docker&logoColor=white&labelColor=1D63ED&color=1D63ED" alt="Docker logo"></a>
</p>

## Description
Application "CoasterManager" test task created in the recruitment process for BlueBinary.io 

## Frameworks
* CodeIgniter (v.4.6.0)
* React (v.1.4.0)

## Requirements

|  Service name  | version |                      Description                       |
|:--------------:|:-------:|:------------------------------------------------------:|
|      PHP       |   8.1   | Main backend programming language used in the project. |
|     Redis      | latest  |            Main DB used in the application.            |
|     Docker     |   20+   |           Required for the all environments.           |
| Docker compose | 2.11.2+ |           Required for the all environments.           |
|    Composer    |   2+    |           Required for the all environments.           |
|      npm       |  10.2   |           Required for the all environments.           |
|    webpack     |    6    |           Required for the all environments.           |


## Installation

### Download project

To get started, the first step is to download the project from the GitHub repository. You can do this by cloning the repository using the following command:
```
git clone https://github.com/rozwalek/coaster-manager.git
```
This will create a local copy of the project on your machine, which you can then open and start working with.

### Build and run containers
```
docker-compose build
docker-compose up -d
```

### Configure project

Create ``.env`` file and set variables options:

```
CI_ENVIRONMENT = development #available options: development, production
REDIS_HOST = 'redis'
REDIS_PORT = 6379;
```

Depending on the set environment, the application saves data to separate sections in order to separate data per environment.

### Install project
```
composer install
npm install
webpack build
``` 

### Run project

Open page ``http://localhost:8040`` in web browser.

### Access to panel

If the application was launched in the production environment, then the panel will be protected with a login and password.

```
Access:
-------------------
Login: admin
Password: admin123
```

### Run CLI Monitoring Command

To enter the server container, first download the _**{CONTAINER_ID}**_ for this image: ``coastermanager_php``, and then enter the following command in the console:

```
docker ps | grep coastermanager_php
```
_(example **{CONTAINER_ID}**: 6eaf6c947795)_

Next, open console for ``coastermanager_php`` and run monitor script:

```
docker exec -it {CONTAINER_ID} /bin./bash
php spark queue-monitor
```

Logs with problems will be saved to file ```/var/www/html/writable/queue_monitor_log.txt```

## API methods

|              Endpoint              | Method |       Description        |                                                                                                Example                                                                                                 |
|:----------------------------------:|:------:|:------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|           /api/coasters            |  POST  |       Add coaster        | curl --location 'http://localhost:8040/api/coasters' --form 'number_of_client="3500"' --form 'number_of_staff="12"' --form 'route_lenght="1800"' --form 'time_start="08:00"' --form 'time_end="15:00"' |
|           /api/coasters            |  GET   | Get all defined coasters |                                                                          curl --location 'http://localhost:8040/api/coasters'                                                                          |
|        /api/coasters/{uuid}        |  GET   |   Get defined coaster    |                                                                   curl --location 'http://localhost:8040/api/coasters/67a518c04f8c3'                                                                   |
|        /api/coasters/{uuid}        |  PUT   |  Change define coaster   |                       curl --location --request PUT 'http://localhost:8040/api/coasters/67a51a9a25907' --header 'Content-Type: application/json' --data '{"time_end": "16:00"}'                        |
|        /api/coasters/{uuid}        | DELETE |  Delete define coaster   |                                                          curl --location --request DELETE 'http://localhost:8040/api/coasters/67a518c04f8c3'                                                           |
|    /api/coasters/{uuid}/wagons     |  POST  |  Add new coaster wagons  |                                     curl --location 'http://localhost:8040/api/coasters/67a9fbfaf02a9/wagons' --form 'number_of_places="32"' --form 'speed="1.2"'                                      |
| /api/coasters/{uuid}/wagons/{uuid} |  GET   |        Get wagon         |                                                                                                                                                                                                        |
| /api/coasters/{uuid}/wagons/{uuid} |  PUT   |  Change coaster wagons   |                curl --location --request PUT 'http://localhost:8040/api/coasters/67a7ba1b9f9c0/wagons/67a7beb7b1925' --header 'Content-Type: application/json' --data '{"speed": 1.6 }'                |
| /api/coasters/{uuid}/wagons/{uuid} | DELETE |  Delete coaster wagons   |                      curl --location --request DELETE 'http://localhost:8040/api/coasters/67a7ba1b9f9c0/wagons/67a7becf2b462'                    |

