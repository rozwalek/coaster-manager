<?php

namespace App\Models;

class WagonModel implements \JsonSerializable
{
    private string $uuid;
    private int $numberOfPlaces;
    private float $speed;

    public function __construct()
    {
        $this->uuid = uniqid();
    }

    /**
     * @return int
     */
    public function getNumberOfPlaces(): int
    {
        return $this->numberOfPlaces;
    }

    /**
     * @param int $numberOfPlaces
     */
    public function setNumberOfPlaces(int $numberOfPlaces): self
    {
        $this->numberOfPlaces = $numberOfPlaces;
        return $this;
    }

    /**
     * @return float
     */
    public function getSpeed(): float
    {
        return $this->speed;
    }

    /**
     * @param float $speed
     */
    public function setSpeed(float $speed): self
    {
        $this->speed = $speed;
        return $this;
    }

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }
}