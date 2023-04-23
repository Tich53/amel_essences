<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ProductPackagingRepository;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductPackagingRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ]
)]
class ProductPackaging
{
    use TimestampableEntity;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read', 'cartProductPackaging:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'productPackagings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cartProductPackaging:read'])]
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'productPackagings')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['product:read', 'cartProductPackaging:read'])]
    private ?Packaging $packaging = null;

    #[ORM\Column]
    private ?float $unit_price = null;

    #[ORM\OneToMany(mappedBy: 'product_packaging', targetEntity: CartProductPackaging::class)]
    private Collection $cartProductPackagings;

    public function __construct()
    {
        $this->cartProductPackagings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getPackaging(): ?Packaging
    {
        return $this->packaging;
    }

    public function setPackaging(?Packaging $packaging): self
    {
        $this->packaging = $packaging;

        return $this;
    }

    #[Groups(['product:read', 'cartProductPackaging:read'])]
    public function getUnitPrice(): ?float
    {
        return $this->unit_price;
    }

    public function setUnitPrice(float $unit_price): self
    {
        $this->unit_price = $unit_price;

        return $this;
    }

    /**
     * @return Collection<int, CartProductPackaging>
     */
    public function getCartProductPackagings(): Collection
    {
        return $this->cartProductPackagings;
    }

    public function addCartProductPackaging(CartProductPackaging $cartProductPackaging): self
    {
        if (!$this->cartProductPackagings->contains($cartProductPackaging)) {
            $this->cartProductPackagings->add($cartProductPackaging);
            $cartProductPackaging->setProductPackaging($this);
        }

        return $this;
    }

    public function removeCartProductPackaging(CartProductPackaging $cartProductPackaging): self
    {
        if ($this->cartProductPackagings->removeElement($cartProductPackaging)) {
            // set the owning side to null (unless already changed)
            if ($cartProductPackaging->getProductPackaging() === $this) {
                $cartProductPackaging->setProductPackaging(null);
            }
        }

        return $this;
    }
}
