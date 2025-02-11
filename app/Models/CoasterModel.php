<?php

namespace App\Models;

class CoasterModel implements \JsonSerializable
{
    private string $uuid;
    private int $numberOfStaff;
    private int $numberOfClient;
    private int $routeLength;
    private string $timeStart;
    private string $timeEnd;
    private array $wagons = array();

    public function __construct()
    {
        $this->uuid = uniqid();
    }

    /**
     * @return int
     */
    public function getNumberOfStaff(): int
    {
        return $this->numberOfStaff;
    }

    /**
     * @param int $numberOfStaff
     */
    public function setNumberOfStaff(int $numberOfStaff): self
    {
        $this->numberOfStaff = $numberOfStaff;

        return $this;
    }

    /**
     * @return int
     */
    public function getNumberOfClient(): int
    {
        return $this->numberOfClient;
    }

    /**
     * @param int $numberOfClient
     */
    public function setNumberOfClient(int $numberOfClient): self
    {
        $this->numberOfClient = $numberOfClient;

        return $this;
    }

    /**
     * @return int
     */
    public function getRouteLength(): int
    {
        return $this->routeLength;
    }

    /**
     * @param int $routeLength
     */
    public function setRouteLength(int $routeLength): self
    {
        $this->routeLength = $routeLength;

        return $this;
    }

    /**
     * @return string
     */
    public function getTimeStart(): string
    {
        return $this->timeStart;
    }

    /**
     * @param string $timeStart
     */
    public function setTimeStart(string $timeStart): self
    {
        $this->timeStart = $timeStart;

        return $this;
    }

    /**
     * @return string
     */
    public function getTimeEnd(): string
    {
        return $this->timeEnd;
    }

    /**
     * @param string $timeEnd
     */
    public function setTimeEnd(string $timeEnd): self
    {
        $this->timeEnd = $timeEnd;

        return $this;
    }

    /**
     * @return array
     */
    public function getWagons(): array
    {
        return $this->wagons;
    }

    /**
     * @param array $wagons
     */
    public function setWagons(array $wagons): self
    {
        $this->wagons = $wagons;

        return $this;
    }

    public function addWagon(WagonModel $wagon): self
    {
        $wagons = $this->getWagons();
        $wagons[] = $wagon;
        $this->setWagons($wagons);

        return $this;
    }

    public function removeWagon(string $uuid): self
    {
        $wagons = $this->getWagons();
        foreach($wagons as $key => $wagon) {
            if($wagon['uuid'] === $uuid) {
                unset($wagons[$key]);
            }
        }
        $this->setWagons($wagons);
        return $this;
    }

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }
}