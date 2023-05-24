<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\OrderItemRepository;
use App\Entity\Trait\TimestampableEntityGroups;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;

#[ORM\Entity(repositoryClass: OrderItemRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['orderItem:read']],
    denormalizationContext: ['groups' => ['orderItem:write']],
    operations: [
        new Get(security: "is_granted('ORDER_ITEM_VIEW', object)"),
        new GetCollection(),
        new Post()
    ]
)]
class OrderItem
{
    use TimestampableEntityGroups;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['orderItem:read', 'mainOrder:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orderItems',)]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private ?Order $order_number = null;

    #[ORM\ManyToOne(inversedBy: 'orderItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ProductPackaging $product_packaging = null;

    #[ORM\Column]
    private ?int $product_quantity = null;

    #[ORM\Column]
    #[Groups(['orderItem:read', 'orderItem:write', 'order:read', 'mainOrder:read'])]
    private ?float $amount = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(['orderItem:read'])]
    public function getOrderNumber(): ?Order
    {
        return $this->order_number;
    }

    #[Groups(['orderItem:write'])]
    public function setOrderNumber(?Order $order_number): self
    {
        $this->order_number = $order_number;

        return $this;
    }

    #[Groups(['orderItem:read', 'order:read', 'mainOrder:read'])]
    public function getProductPackaging(): ?ProductPackaging
    {
        return $this->product_packaging;
    }

    #[Groups(['orderItem:write'])]
    public function setProductPackaging(?ProductPackaging $product_packaging): self
    {
        $this->product_packaging = $product_packaging;

        return $this;
    }

    #[Groups(['orderItem:read', 'order:read', 'mainOrder:read'])]
    public function getProductQuantity(): ?int
    {
        return $this->product_quantity;
    }

    #[Groups(['orderItem:write'])]
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
