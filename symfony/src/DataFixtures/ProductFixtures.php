<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $product = new Product();
        $product->setName('100');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $manager->persist($product);

        $product = new Product();
        $product->setName('101');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $manager->persist($product);

        $product = new Product();
        $product->setName('102');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $manager->persist($product);

        $product = new Product();
        $product->setName('103');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $manager->persist($product);

        $product = new Product();
        $product->setName('104');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $manager->persist($product);

        $product = new Product();
        $product->setName('105');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $manager->persist($product);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategoryFixtures::class,
            GenderFixtures::class
        ];
    }
}
