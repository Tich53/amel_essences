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

        // 100 Parfums femmes 
        for ($i = 100; $i < 200; $i++) {
            $product = new Product();
            $product->setName($i);
            $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
            $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[rand(0, 1)]));
            $product->setPreference("Terre d'hermès");
            $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
            $this->addReference($i, $product);
            $manager->persist($product);
        }

        // 100 Parfums hommes 
        for ($i = 200; $i < 300; $i++) {
            $product = new Product();
            $product->setName($i);
            $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
            $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[rand(0, 1)]));
            $product->setPreference("Terre d'hermès");
            $product->setGender($this->getReference(GenderFixtures::GENDER_MALE));
            $this->addReference($i, $product);
            $manager->persist($product);
        }

        // 50 Parfums mixtes 
        for ($i = 300; $i < 350; $i++) {
            $product = new Product();
            $product->setName($i);
            $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
            $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[rand(0, 1)]));
            $product->setPreference("Terre d'hermès");
            $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
            $this->addReference($i, $product);
            $manager->persist($product);
        }

        $product = new Product();
        $product->setName('Eau de parfum 1');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_WATER_PERFUME));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("Terre d'hermès");
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $this->addReference('Eau de parfum 1', $product);
        $manager->persist($product);



        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategoryFixtures::class,
            GenderFixtures::class,
            RangeFixtures::class
        ];
    }
}
