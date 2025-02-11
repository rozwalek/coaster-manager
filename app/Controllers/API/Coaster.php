<?php

namespace App\Controllers\API;

error_reporting(E_ALL);
ini_set('memory_limit', '512M');
ini_set('display_errors', 1);

use App\Services\RedisService;
use CodeIgniter\RESTful\ResourceController;
use App\Models\CoasterModel;

class Coaster extends ResourceController
{
    protected $format    = 'json';
    protected $redis;

    public function __construct()
    {
        $this->redis = new RedisService();
    }

    public function index()
    {
        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
//            cache()->save('coasters', $coasters, 86400);
            $this->redis->set('coasters', $coasters);
        }

        return $this->respond($coasters, 200);
    }

    public function create()
    {
        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        $data = $this->request->getPost();

        $coaster = new CoasterModel();
        $coaster->setNumberOfClient($data['number_of_client']);
        $coaster->setNumberOfStaff($data['number_of_staff']);
        $coaster->setRouteLength($data['route_lenght']);
        $coaster->setTimeStart($data['time_start']);
        $coaster->setTimeEnd($data['time_end']);

        $coasters[] = $coaster->jsonSerialize();
//        cache()->save('coasters', $coasters, 86400);
        $this->redis->set('coasters', $coasters);

        return $this->respond('{success: true}', 200);
    }

    public function show($id = null)
    {
        $result = false;

        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        foreach($coasters as $key => $coaster) {
            if($coaster['uuid'] == $id) {
                $result = $coasters[$key];
            }
        }

        return $this->respond($result, 200);
    }

    public function update($id = null)
    {
        $data = $this->request->getVar();

        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        foreach($coasters as $key => $coaster) {
            if($coaster['uuid'] === $id) {
                $coaster['numberOfClient'] = isset($data->number_of_client) ? $data->number_of_client : $coaster['numberOfClient'];
                $coaster['numberOfStaff'] = isset($data->number_of_staff) ? $data->number_of_staff : $coaster['numberOfStaff'];
                $coaster['routeLength'] = isset($data->route_lenght) ? $data->route_lenght : $coaster['routeLength'];
                $coaster['timeStart'] = isset($data->time_start) ? $data->time_start : $coaster['timeStart'];
                $coaster['timeEnd'] = isset($data->time_end) ? $data->time_end : $coaster['timeEnd'];
                $coasters[$key] = $coaster;
            }
        }

//        cache()->save('coasters', $coasters, 86400);
        $this->redis->set('coasters', $coasters);

        return $this->respond('{success: true}', 200);
    }

    public function delete($id = null)
    {
        if (!$coasters = $this->redis->get('coasters')) {
            $coasters = array();
        }

        foreach($coasters as $key => $coaster) {
            if($coaster['uuid'] === $id) {
                unset($coasters[$key]);
            }
        }

//        cache()->save('coasters', $coasters, 86400);
        $this->redis->set('coasters', $coasters);

        return $this->respond('{success: true}', 200);
    }
}
