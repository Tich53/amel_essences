<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use App\Repository\OrderCartProductPackagingRepository;

#[ORM\Entity(repositoryClass: OrderCartProductPackagingRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['orderCartProductPackaging:read']],
    denormalizationContext: ['groups' => ['orderCartProductPackaging:write']],
    operations: [
        new Get(security: "is_granted('ORDER_CART_PRODUCT_PACKAGING_VIEW', object)"),
        new GetCollection(),
        new Post()
    ]
)]
class OrderCartProductPackaging
{
    use TimestampableEntity;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orderCartProductPackagings')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Order $order_number = null;

    #[ORM\ManyToOne(inversedBy: 'orderCartProductPackagings')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CartProductPackaging $cart_product_packaging = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderNumber(): ?Order
    {
        return $this->order_number;
    }

    #[Groups(['orderCartProductPackaging:write'])]
    public function setOrderNumber(?Order $order_number): self
    {
        $this->order_number = $order_number;

        return $this;
    }

    public function getCartProductPackaging(): ?CartProductPackaging
    {
        return $this->cart_product_packaging;
    }

    #[Groups(['orderCartProductPackaging:write'])]
    public function setCartProductPackaging(?CartProductPackaging $cart_product_packaging): self
    {
        $this->cart_product_packaging = $cart_product_packaging;

        return $this;
    }
}
