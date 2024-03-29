<?php

namespace App\Entity;

use DateTime;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrderRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\Trait\TimestampableEntityGroups;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource(
  normalizationContext: ['groups' => ['order:read']],
  denormalizationContext: ['groups' => ['order:write']],
  operations: [
    new Get(security: "is_granted('ORDER_VIEW', object)"),
    new GetCollection(),
    new Post(),
    new Patch(),
    new Delete()
  ]
)]
class Order
{
  use TimestampableEntityGroups;
  use SoftDeleteableEntity;

  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column]
  #[Groups(['order:read', 'mainOrder:read'])]
  private ?int $id = null;

  #[ORM\Column(length: 255)]
  #[Groups(['order:read', 'mainOrder:read'])]
  private ?string $reference = null;

  #[ORM\Column]
  #[Groups(['order:read', 'order:write', 'mainOrder:read'])]
  private ?float $amount = null;

  #[ORM\ManyToOne(inversedBy: 'orders')]
  #[ORM\JoinColumn(nullable: false)]
  private ?User $user_account = null;

  #[ORM\ManyToOne(inversedBy: 'orders')]
  private ?MainOrder $main_order = null;

  #[ORM\OneToMany(mappedBy: 'order_number', targetEntity: OrderItem::class)]
  #[Groups(['order:read', 'mainOrder:read'])]
  private Collection $orderItems;

  #[ORM\Column]
  #[Groups(['order:read', 'order:write', 'mainOrder:read'])]
  private ?int $productQuantity = null;

  public function __construct()
  {
    $this->orderItems = new ArrayCollection();


    $this->setUpdatedAt(new \DateTime('now'));
    if ($this->getCreatedAt() === null) {
      $this->setCreatedAt(new \DateTime('now'));
    }

    $now = new DateTime();
    if ($this->getReference() === null) {
      $randomNumber = rand(0, 1000);
      $this->reference = $now->format('Ymd-His') . '-' . $randomNumber;
    }
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getReference(): ?string
  {
    return $this->reference;
  }

  public function setReference(string $reference): self
  {
    $this->reference = $reference;

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

  #[Groups(['order:read', 'mainOrder:read'])]
  public function getUserAccount(): ?User
  {
    return $this->user_account;
  }

  #[Groups(['order:write'])]
  public function setUserAccount(?User $user_account): self
  {
    $this->user_account = $user_account;

    return $this;
  }

  #[Groups(['order:read', 'mainOrder:read'])]
  public function getMainOrder(): ?MainOrder
  {
    return $this->main_order;
  }

  #[Groups(['order:write'])]
  public function setMainOrder(?MainOrder $main_order): self
  {
    $this->main_order = $main_order;

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
      $orderItem->setOrderNumber($this);
    }

    return $this;
  }

  public function removeOrderItem(OrderItem $orderItem): self
  {
    if ($this->orderItems->removeElement($orderItem)) {
      // set the owning side to null (unless already changed)
      if ($orderItem->getOrderNumber() === $this) {
        $orderItem->setOrderNumber(null);
      }
    }

    return $this;
  }

  public function getProductQuantity(): ?int
  {
    return $this->productQuantity;
  }

  public function setProductQuantity(int $productQuantity): self
  {
    $this->productQuantity = $productQuantity;

    return $this;
  }
}
