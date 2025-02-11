<?php

namespace App\Commands;

use App\Services\QueueMonitorService;
use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;

class QueueMonitor extends BaseCommand
{
    protected $group = 'Custom';
    protected $name = 'queue-monitor';
    protected $description = 'Monitorowanie kolejek górskich w czasie rzeczywistym';

    public function run(array $params)
    {
        $monitorService = new QueueMonitorService();
        $monitorService->startMonitoring();
    }
}