<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CartRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\Trait\TimestampableEntityGroups;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;

#[ORM\Entity(repositoryClass: CartRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ]
)]
class Cart
{
    use TimestampableEntityGroups;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:read'])]
    private ?float $amount = null;

    #[ORM\OneToOne(inversedBy: 'cart', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_account = null;

    #[ORM\OneToMany(mappedBy: 'cart', targetEntity: CartProductPackaging::class)]
    private Collection $cartProductPackagings;

    public function __construct()
    {
        $this->cartProductPackagings = new ArrayCollection();

        $this->setUpdatedAt(new \DateTime('now'));
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt(new \DateTime('now'));
        }
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUserAccount(): ?User
    {
        return $this->user_account;
    }

    public function setUserAccount(User $user_account): self
    {
        $this->user_account = $user_account;

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
            $cartProductPackaging->setCart($this);
        }

        return $this;
    }

    public function removeCartProductPackaging(CartProductPackaging $cartProductPackaging): self
    {
        if ($this->cartProductPackagings->removeElement($cartProductPackaging)) {
            // set the owning side to null (unless already changed)
            if ($cartProductPackaging->getCart() === $this) {
                $cartProductPackaging->setCart(null);
            }
        }

        return $this;
    }
}
