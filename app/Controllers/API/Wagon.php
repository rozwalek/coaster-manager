<?php

namespace App\Controllers\API;

use App\Models\WagonModel;
use App\Services\RedisService;
use CodeIgniter\RESTful\ResourceController;
use PHPUnit\Framework\Exception;

class Wagon extends ResourceController
{
    protected $format    = 'json';
    protected $redis;

    public function __construct()
    {
        $this->redis = new RedisService();
    }

    public function create($id = null)
    {
        $find = false;
        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        if(is_array($coasters)) {
            foreach($coasters as $key => &$coaster) {
                if($coaster['uuid'] === $id) {
                    $find = true;

                    $data = $this->request->getPost();

                    $wagon = new WagonModel();
                    $wagon->setNumberOfPlaces($data['number_of_places']);
                    $wagon->setSpeed($data['speed']);

                    if(!isset($coaster['wagons']) || !is_array($coaster['wagons'])) {
                        $coaster['wagons'] = array();
                    }

                    $coaster['wagons'][] = $wagon->jsonSerialize();

//                    cache()->save('coasters', $coasters, 86400);
                    $this->redis->set('coasters', $coasters);

                    break;
                }
            }
        }

        if ($find === false) {
            throw new Exception('No coaster find');
        }


        return $this->respond('{success: true}', 200);
    }

    public function show($id = null, $wagonId = null)
    {
        $result = false;

        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        if(is_array($coasters)) {
            foreach ($coasters as &$coaster) {
                if ($coaster['uuid'] === $id) {
                    foreach ($coaster['wagons'] as $key => &$wagon) {
                        if ($wagon['uuid'] === $wagonId) {
                            $result = $wagon;
                            break;
                        }
                    }
                }
            }
        }


        return $this->respond($result, 200);
    }

    public function update($id = null, $wagonId = null)
    {
        $data = $this->request->getVar();

        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        if(is_array($coasters)) {
            foreach ($coasters as &$coaster) {
                if ($coaster['uuid'] === $id) {
                    foreach ($coaster['wagons'] as $key => &$wagon) {
                        if ($wagon['uuid'] === $wagonId) {
                            $wagon['numberOfPlaces'] = isset($data->number_of_places) ? $data->number_of_places : $wagon['numberOfPlaces'];
                            $wagon['speed'] = isset($data->speed) ? $data->speed : $wagon['speed'];
                        }
                    }
                }
            }
        }

//        cache()->save('coasters', $coasters, 86400);
        $this->redis->set('coasters', $coasters);

        return $this->respond('{success: true}', 200);
    }

    public function delete($id = null, $wagonId = null)
    {
        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        if(is_array($coasters)) {
            foreach ($coasters as &$coaster) {
                if ($coaster['uuid'] === $id) {
                    foreach ($coaster['wagons'] as $key => &$wagon) {
                        if ($wagon['uuid'] === $wagonId) {
                            unset($coaster['wagons'][$key]);
                        }
                    }
                }
            }
        }

//        cache()->save('coasters', $coasters, 86400);
        $this->redis->set('coasters', $coasters);

        return $this->respond('{success: true}', 200);
    }
}
