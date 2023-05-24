<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\Trait\TimestampableEntityGroups;
use App\Repository\CartProductPackagingRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;

#[ORM\Entity(repositoryClass: CartProductPackagingRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['cartProductPackaging:read']],
    denormalizationContext: ['groups' => ['cartProductPackaging:write']],
    operations: [
        new Get(security: "is_granted('CART_PRODUCT_PACKAGING_VIEW', object)"),
        new GetCollection(),
        new Post(),
        new Patch(),
        new Delete()
    ]
)]
class CartProductPackaging
{
    use TimestampableEntityGroups;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cartProductPackaging:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'cartProductPackagings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cartProductPackaging:read', 'cartProductPackaging:write'])]
    private ?Cart $cart = null;

    #[ORM\ManyToOne(inversedBy: 'cartProductPackagings')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ProductPackaging $product_packaging = null;

    #[ORM\Column]
    private ?int $product_quantity = null;

    #[ORM\Column]
    #[Groups(['cartProductPackaging:read', 'cartProductPackaging:write'])]
    private ?float $amount = null;


    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCart(?Cart $cart): self
    {
        $this->cart = $cart;

        return $this;
    }

    #[Groups(['cartProductPackaging:read'])]
    public function getProductPackaging(): ?ProductPackaging
    {
        return $this->product_packaging;
    }

    #[Groups(['cartProductPackaging:write'])]
    public function setProductPackaging(?ProductPackaging $product_packaging): self
    {
        $this->product_packaging = $product_packaging;

        return $this;
    }

    #[Groups(['cartProductPackaging:read'])]
    public function getProductQuantity(): ?int
    {
        return $this->product_quantity;
    }

    #[Groups(['cartProductPackaging:write'])]
    public function setProductQuantity(int $product_quantity): self
    {
        $this->product_quantity = $product_quantity;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }
}
