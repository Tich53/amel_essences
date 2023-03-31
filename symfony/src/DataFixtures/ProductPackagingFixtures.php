<?php

namespace App\DataFixtures;

use App\Entity\ProductPackaging;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProductPackagingFixtures extends Fixture implements DependentFixtureInterface
{
    const PACKAGING = [
        0 => PackagingFixtures::TYPE_BOTTLE . PackagingFixtures::CAPACITY_100 . PackagingFixtures::UNIT_ML,
        1 => PackagingFixtures::TYPE_BOTTLE . PackagingFixtures::CAPACITY_50 . PackagingFixtures::UNIT_ML
    ];

    public function load(ObjectManager $manager): void
    {
        for ($i = 100; $i < 350; $i++) {
            $productPackaging = new ProductPackaging();
            $productPackaging->setProduct($this->getReference($i));
            $productPackaging->setPackaging($this->getReference(self::PACKAGING[rand(0, 1)]));
            $productPackaging->setUnitPrice(rand(20, 50));
            $manager->persist($productPackaging);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            PackagingFixtures::class,
            ProductFixtures::class
        ];
    }
}
