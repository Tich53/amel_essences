<?php

namespace App\Entity;

use App\Entity\OrderProduct;
use ApiPlatform\Metadata\Get;
use App\Entity\ProductPackaging;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    operations: [
        new Get(),
        new GetCollection()
    ]
)]
class Product
{
    use TimestampableEntity;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product:read'])]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product:read'])]
    private ?Gender $gender = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: OrderProduct::class)]
    private Collection $orderProducts;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductPackaging::class)]
    #[Groups(['product:read'])]
    private Collection $productPackagings;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: CartProduct::class)]
    private Collection $cartProducts;

    public function __construct()
    {
        $this->orderProducts = new ArrayCollection();
        $this->productPackagings = new ArrayCollection();
        $this->cartProducts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }


    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getGender(): ?Gender
    {
        return $this->gender;
    }

    public function setGender(?Gender $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * @return Collection<int, OrderProduct>
     */
    public function getOrderProducts(): Collection
    {
        return $this->orderProducts;
    }

    public function addOrderProduct(OrderProduct $orderProduct): self
    {
        if (!$this->orderProducts->contains($orderProduct)) {
            $this->orderProducts->add($orderProduct);
            $orderProduct->setProduct($this);
        }

        return $this;
    }

    public function removeOrderProduct(OrderProduct $orderProduct): self
    {
        if ($this->orderProducts->removeElement($orderProduct)) {
            // set the owning side to null (unless already changed)
            if ($orderProduct->getProduct() === $this) {
                $orderProduct->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ProductPackaging>
     */
    public function getProductPackagings(): Collection
    {
        return $this->productPackagings;
    }

    public function addProductPackaging(ProductPackaging $productPackaging): self
    {
        if (!$this->productPackagings->contains($productPackaging)) {
            $this->productPackagings->add($productPackaging);
            $productPackaging->setProduct($this);
        }

        return $this;
    }

    public function removeProductPackaging(ProductPackaging $productPackaging): self
    {
        if ($this->productPackagings->removeElement($productPackaging)) {
            // set the owning side to null (unless already changed)
            if ($productPackaging->getProduct() === $this) {
                $productPackaging->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CartProduct>
     */
    public function getCartProducts(): Collection
    {
        return $this->cartProducts;
    }

    public function addCartProduct(CartProduct $cartProduct): self
    {
        if (!$this->cartProducts->contains($cartProduct)) {
            $this->cartProducts->add($cartProduct);
            $cartProduct->setProduct($this);
        }

        return $this;
    }

    public function removeCartProduct(CartProduct $cartProduct): self
    {
        if ($this->cartProducts->removeElement($cartProduct)) {
            // set the owning side to null (unless already changed)
            if ($cartProduct->getProduct() === $this) {
                $cartProduct->setProduct(null);
            }
        }

        return $this;
    }
}
