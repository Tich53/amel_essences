<?php

namespace App\Entity;

use DateTime;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\MainOrderRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Serializer\Filter\GroupFilter;
use App\Entity\Trait\TimestampableEntityGroups;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;

#[ORM\Entity(repositoryClass: MainOrderRepository::class)]
#[ORM\EntityListeners(['App\EntityListener\MainOrderListener'])]
#[ApiResource(
    normalizationContext: ['groups' => ['mainOrder:read']],
    denormalizationContext: ['groups' => ['mainOrder:write']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post()
    ]
)]
#[ApiFilter(GroupFilter::class, arguments: ['parameterName' => 'groupBy'])]
class MainOrder
{
    use TimestampableEntityGroups;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['mainOrder:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 45)]
    #[Groups(['mainOrder:read'])]
    private ?string $reference = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]

    private ?\DateTimeInterface $closing_date = null;

    #[ORM\OneToMany(mappedBy: 'main_order', targetEntity: Order::class)]
    #[Groups(['mainOrder:read'])]
    private Collection $orders;

    public function __construct()
    {
        $this->orders = new ArrayCollection();

        $now = new DateTime();
        if ($this->getCreatedAt() === null) {
            $this->createdAt = $now;
        }
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

    #[Groups(['order:read', 'mainOrder:read'])]
    public function getClosingDate(): ?\DateTimeInterface
    {
        return $this->closing_date;
    }

    #[Groups(['mainOrder:write'])]
    public function setClosingDate(\DateTimeInterface $closing_date): self
    {
        $this->closing_date = $closing_date;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setMainOrder($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getMainOrder() === $this) {
                $order->setMainOrder(null);
            }
        }

        return $this;
    }
}
