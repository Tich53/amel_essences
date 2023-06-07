<?php

namespace App\Entity;

use App\Entity\OrderItem;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\CartProductPackaging;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use App\Repository\ProductPackagingRepository;
use App\Entity\Trait\TimestampableEntityGroups;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;

#[ORM\Entity(repositoryClass: ProductPackagingRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ]
)]
class ProductPackaging
{
    use TimestampableEntityGroups;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'productPackagings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'productPackagings')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    private ?Packaging $packaging = null;

    #[ORM\Column]
    private ?float $unit_price = null;

    #[ORM\OneToMany(mappedBy: 'product_packaging', targetEntity: CartProductPackaging::class)]
    private Collection $cartProductPackagings;

    #[ORM\OneToMany(mappedBy: 'product_packaging', targetEntity: OrderItem::class)]
    private Collection $orderItems;

    public function __construct()
    {
        $this->cartProductPackagings = new ArrayCollection();
        $this->orderItems = new ArrayCollection();

        $this->setUpdatedAt(new \DateTime('now'));
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt(new \DateTime('now'));
        }
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

    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
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

    /**
     * @return Collection<int, OrderItem>
     */
    public function getOrderItems(): Collection
    {
        return $this->orderItems;
    }

    public function addOrderItem(OrderItem $orderItem): self
    {
        if (!$this->orderItems->contains($orderItem)) {
            $this->orderItems->add($orderItem);
            $orderItem->setProductPackaging($this);
        }

        return $this;
    }

    public function removeOrderItem(OrderItem $orderItem): self
    {
        if ($this->orderItems->removeElement($orderItem)) {
            // set the owning side to null (unless already changed)
            if ($orderItem->getProductPackaging() === $this) {
                $orderItem->setProductPackaging(null);
            }
        }

        return $this;
    }
}
