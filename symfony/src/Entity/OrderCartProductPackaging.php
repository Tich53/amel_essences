<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use App\Repository\OrderCartProductPackagingRepository;

#[ORM\Entity(repositoryClass: OrderCartProductPackagingRepository::class)]
#[ApiResource]
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

    public function setOrderNumber(?Order $order_number): self
    {
        $this->order_number = $order_number;

        return $this;
    }

    public function getCartProductPackaging(): ?CartProductPackaging
    {
        return $this->cart_product_packaging;
    }

    public function setCartProductPackaging(?CartProductPackaging $cart_product_packaging): self
    {
        $this->cart_product_packaging = $cart_product_packaging;

        return $this;
    }
}
