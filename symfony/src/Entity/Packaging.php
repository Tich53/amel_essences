<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\PackagingRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PackagingRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['packaging:read']],
    operations: [
        new Get(),
        new GetCollection()
    ]
)]
class Packaging
{
    use TimestampableEntity;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['packaging:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 45)]
    #[Groups(['packaging:read', 'product:read'])]
    private ?string $type = null;

    #[ORM\Column]
    #[Groups(['packaging:read', 'product:read'])]
    private ?float $capacity = null;

    #[ORM\Column(length: 10)]
    private ?string $capacity_unit = null;

    #[ORM\OneToMany(mappedBy: 'packaging', targetEntity: ProductPackaging::class)]
    private Collection $productPackagings;

    public function __construct()
    {
        $this->productPackagings = new ArrayCollection();
    }

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

    #[Groups(['packaging:read', 'product:read'])]
    public function getCapacityUnit(): ?string
    {
        return $this->capacity_unit;
    }

    public function setCapacityUnit(string $capacity_unit): self
    {
        $this->capacity_unit = $capacity_unit;

        return $this;
    }

    /**
     * @return Collection<int, ProductPackaging>
     */
    public function getProductPackagings(): Collection
    {
        return $this->productPackagings;
    }

    public function addProductPackaging(ProductPackaging $productPackaging): self
    {
        if (!$this->productPackagings->contains($productPackaging)) {
            $this->productPackagings->add($productPackaging);
            $productPackaging->setPackaging($this);
        }

        return $this;
    }

    public function removeProductPackaging(ProductPackaging $productPackaging): self
    {
        if ($this->productPackagings->removeElement($productPackaging)) {
            // set the owning side to null (unless already changed)
            if ($productPackaging->getPackaging() === $this) {
                $productPackaging->setPackaging(null);
            }
        }

        return $this;
    }
}
