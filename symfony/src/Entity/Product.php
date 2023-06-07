<?php

namespace App\Entity;

use App\Entity\Range;
use ApiPlatform\Metadata\Get;
use App\Entity\ProductPackaging;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\Trait\TimestampableEntityGroups;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;


#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    operations: [
        new Get(),
        new GetCollection()
    ]
)]
#[ApiFilter(SearchFilter::class, properties: [
    'name' => 'ipartial',
    'preference' => 'ipartial',
    'category' => 'exact',
    'gender' => 'exact',
    'productPackagings.packaging.capacity' => 'exact',

])]

class Product
{
    use TimestampableEntityGroups;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read', 'cartProductPackaging:read', 'mainOrder:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    private ?Gender $gender = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductPackaging::class)]
    #[Groups(['product:read'])]
    private Collection $productPackagings;


    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    private ?string $preference = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    private ?range $range_account = null;


    public function __construct()
    {
        $this->productPackagings = new ArrayCollection();

        $this->setUpdatedAt(new \DateTime('now'));
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt(new \DateTime('now'));
        }
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

    public function getPreference(): ?string
    {
        return $this->preference;
    }

    public function setPreference(string $preference): self
    {
        $this->preference = $preference;

        return $this;
    }

    #[Groups(['product:read', 'cartProductPackaging:read', 'order:read', 'mainOrder:read'])]
    public function getRangeAccount(): ?range
    {
        return $this->range_account;
    }

    public function setRangeAccount(?range $range_account): self
    {
        $this->range_account = $range_account;

        return $this;
    }
}
