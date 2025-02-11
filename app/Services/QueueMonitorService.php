<?php

namespace App\Services;

use React\EventLoop\Factory;
use React\Socket\ConnectionInterface;
use Clue\React\Redis\Factory as RedisFactory;

class QueueMonitorService
{
    private $loop;
    private RedisService $redisService;
    private string $logFile;

    public function __construct()
    {
        // Tworzymy pętlę asynchroniczną ReactPHP
        $this->loop = Factory::create();
        $this->redisService = new RedisService();
        $this->logFile = WRITEPATH . 'queue_monitor_log.txt'; // Zapis do pliku w CodeIgniter 4

        // Inicjalizacja logowania
        if (!file_exists($this->logFile)) {
            file_put_contents($this->logFile, "Log file created.\n", FILE_APPEND);
        }
    }

    // Główna funkcja monitorująca
    public function startMonitoring(): void
    {
        $this->monitorQueues();
        $this->loop->run();
    }

    // Monitorowanie kolejek
    private function monitorQueues(): void
    {
        $queuesData = $this->redisService->get('coasters');

        foreach ($queuesData as $queue) {
            $this->monitorQueue($queue);
        }

        // Ustawienie odświeżania danych co minutę
        $this->loop->addTimer(20, function () {
            $this->monitorQueues();
        });
    }

    // Monitorowanie jednej kolejki
    private function monitorQueue(array $queue): void
    {
        // Wymagana liczba personelu dla danej kolejki i dodanych wagonów
        $staffNeeded = 1 + 2 * count($queue['wagons']);

        // Liczba personelu
        $staffAvailable = $queue['numberOfStaff'];

        // Liczba wagonów w kolejce
        $wagonsAvailable = count($queue['wagons']);

        // Wprowadzona liczba Klientów dla kolejki
        $clients = $queue['numberOfClient'];

        // Możliwa liczba wagonów dla wprowadzonej liczby personelu
        $possibleWagonsForStuff = floor(($staffAvailable - 1 ) / 2);

        // Liczba minut pracy kolejki
        $coasterWork = $this->calculateMinutesDifference($queue['timeStart'], $queue['timeEnd']);

        // Najniższa prędkość wagonika
        $minSpeed = array_reduce($queue['wagons'], function ($min, $wagon) {
            return $wagon['speed'] < $min ? $wagon['speed'] : $min;
        }, INF);

        // Czas 1 przejazdu (+ 5 min przerwy)
        $wagonJourney = ceil($queue['routeLength'] * 2 / $minSpeed / 60 + 5);

        // Sumaryczna pojemność wagoników
        $totalPlaces = array_reduce($queue['wagons'], function($sum, $wagon) {
            return $sum + $wagon['numberOfPlaces'];
        }, 0);

        // Możliwa liczba wykonanych kursów przez 1 wagonik
        $numberOfTrips = floor($coasterWork / $wagonJourney);

        // Możliwa liczba obsłużonych Klientów (wszystkie wagoniki)
        $numberOfServedClients = array_reduce($queue['wagons'], function($sum, $wagon) use ($numberOfTrips) {
            return $sum + ($wagon['numberOfPlaces'] * $numberOfTrips);
        }, 0);


        $status = "OK";

        // Zdefiniowany problem: kolejka nie obsłuży wszystkich Klientów
        if ($numberOfServedClients < $queue['numberOfClient']) {
            $status = "Problem";
            $logMessage = sprintf("[%s] Kolejka %s - Problem: System obsłuży %d klientów z wymaganych %d.\n",
                date('Y-m-d H:i:s'),
                $queue['uuid'],
                $numberOfServedClients,
                $queue['numberOfClient']
            );
            $this->logProblem($logMessage);
        }

        // Zdefiniowany problem: za mała liczba pracowników
        if ($staffAvailable < $staffNeeded) {
            $status = "Problem";
            $logMessage = sprintf("[%s] Kolejka %s - Problem: Brakuje %d pracowników\n",
                date('Y-m-d H:i:s'),
                $queue['uuid'],
                $staffNeeded - $staffAvailable
            );
            $this->logProblem($logMessage);
        }

        // Zdefiniowany problem: za mała liczba pracowników

        // Wyświetlanie wyników
        $this->displayQueueStats(
            $queue,
            $staffNeeded,
            $staffAvailable,
            $wagonsAvailable,
            $status,
            $possibleWagonsForStuff,
            $coasterWork,
            $numberOfServedClients
        );
    }

    // Logowanie problemu do pliku
    private function logProblem($logMessage): void
    {
        file_put_contents($this->logFile, $logMessage, FILE_APPEND);
    }

    // Wyświetlanie statystyk
    private function displayQueueStats(
        array $queue,
        int $staffNeeded,
        int $staffAvailable,
        int $wagonsAvailable,
        string $status,
        int $possibleWagonsForStuff,
        int $coasterWork,
        int $numberOfServedClients
    ): void
    {
        echo "\n";
        echo "[Godzina " . date('H:i') . "]\n";
        echo "[Kolejka " . $queue['uuid'] . "]\n";
        echo "1. Godziny działania: " . $queue['timeStart'] . " - " . $queue['timeEnd'] . " (łącznie ".$coasterWork." minut)\n";
        echo "2. Liczba wagonów: " . $possibleWagonsForStuff . " / " . count($queue['wagons']) . " (możliwa dla danej liczby personelu / liczba zdefiniowanych wagonów)\n";
        echo "3. Dostępny personel: " . $staffAvailable . " / " . $staffNeeded . " (dostępny / wymagany)\n";
        echo "4. Klienci dziennie: " . $queue['numberOfClient'] . " / " . $numberOfServedClients . " (wymagani / możliwi do obsłużenia) \n";
        echo "5. Status: " . $status . "\n";
    }

    private function calculateMinutesDifference(string $start, string $end): int
    {
        [$startHour, $startMinute] = explode(':', $start) + [0, 0];
        [$endHour, $endMinute] = explode(':', $end) + [0, 0];

        $startInMinutes = (int)$startHour * 60 + (int)$startMinute;
        $endInMinutes = (int)$endHour * 60 + (int)$endMinute;

        return $endInMinutes - $startInMinutes;
    }
}