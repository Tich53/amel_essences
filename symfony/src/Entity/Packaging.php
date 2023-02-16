<?php

namespace App\Entity;

use App\Repository\PackagingRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PackagingRepository::class)]
class Packaging
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 45)]
    private ?string $type = null;

    #[ORM\Column]
    private ?float $capacity = null;

    #[ORM\Column(length: 10)]
    private ?string $capacity_unit = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCapacity(): ?float
    {
        return $this->capacity;
    }

    public function setCapacity(float $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getCapacityUnit(): ?string
    {
        return $this->capacity_unit;
    }

    public function setCapacityUnit(string $capacity_unit): self
    {
        $this->capacity_unit = $capacity_unit;

        return $this;
    }
}
