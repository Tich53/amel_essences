<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\CartProductRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CartProductRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['cartProduct:read']],
    denormalizationContext: ['groups' => ['cartProduct:write']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post()
    ]
)]
class CartProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cartProduct:write'])]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $product_quantity = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['cartProduct:write', 'cartProduct:read'])]
    private ?float $amount = null;

    #[ORM\ManyToOne(inversedBy: 'cartProducts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cartProduct:write', 'cartProduct:read'])]
    private ?Cart $cart = null;

    #[ORM\ManyToOne(inversedBy: 'cartProducts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cartProduct:write', 'cartProduct:read'])]
    private ?Product $product = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(['cartProduct:read'])]
    public function getProductQuantity(): ?int
    {
        return $this->product_quantity;
    }

    #[Groups(['cartProduct:write'])]
    public function setProductQuantity(?int $product_quantity): self
    {
        $this->product_quantity = $product_quantity;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(?float $amount): self
    {
        $this->amount = $amount;

        return $this;
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

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }
}
