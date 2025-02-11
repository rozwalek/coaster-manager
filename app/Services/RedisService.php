<?php

namespace App\Services;

use Predis\Client as RedisClient;
use React\EventLoop\Factory as LoopFactory;

class RedisService
{
    private RedisClient $client;

    public function __construct()
    {
        $loop = LoopFactory::create();
        $this->client = new RedisClient([
            'host' => getenv('REDIS_HOST'),
            'port' => 6379
        ]);;
    }

    public function get($key)
    {
        return json_decode($this->client->get(ENVIRONMENT .'_'. $key), true);
    }

    public function set($key, $value)
    {
        return $this->client->set(ENVIRONMENT .'_'. $key, json_encode($value));
    }

    public function exists($key)
    {
        return $this->client->exists(ENVIRONMENT .'_'. $key);
    }
}
