<?php

namespace App\DataFixtures;

use App\Entity\ProductPackaging;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProductPackagingFixtures extends Fixture implements DependentFixtureInterface
{
    const PACKAGING = [
        0 => PackagingFixtures::TYPE_BOTTLE . PackagingFixtures::CAPACITY_35 . PackagingFixtures::UNIT_ML,
        1 => PackagingFixtures::TYPE_BOTTLE . PackagingFixtures::CAPACITY_50 . PackagingFixtures::UNIT_ML,
        2 => PackagingFixtures::TYPE_BOTTLE . PackagingFixtures::CAPACITY_75 . PackagingFixtures::UNIT_ML,
        3 => PackagingFixtures::TYPE_BOTTLE . PackagingFixtures::CAPACITY_100 . PackagingFixtures::UNIT_ML
    ];

    public function load(ObjectManager $manager): void
    {
        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('100'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[0]));
        $productPackaging->setUnitPrice(25);
        $manager->persist($productPackaging);

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('100'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[1]));
        $productPackaging->setUnitPrice(30);
        $manager->persist($productPackaging);

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('100'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[2]));
        $productPackaging->setUnitPrice(35);
        $manager->persist($productPackaging);

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('100'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[3]));
        $productPackaging->setUnitPrice(40);
        $manager->persist($productPackaging);

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('101'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[0]));
        $productPackaging->setUnitPrice(28);
        $manager->persist($productPackaging);

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('101'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[1]));
        $productPackaging->setUnitPrice(33);
        $manager->persist($productPackaging);

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('101'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[2]));
        $productPackaging->setUnitPrice(38);
        $manager->persist($productPackaging);

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('101'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[3]));
        $productPackaging->setUnitPrice(43);
        $manager->persist($productPackaging);

        for ($i = 102; $i < 350; $i++) {
            $productPackaging = new ProductPackaging();
            $productPackaging->setProduct($this->getReference($i));
            $productPackaging->setPackaging($this->getReference(self::PACKAGING[rand(0, 3)]));
            $productPackaging->setUnitPrice(rand(20, 50));
            $manager->persist($productPackaging);
        }

        $productPackaging = new ProductPackaging();
        $productPackaging->setProduct($this->getReference('Eau de parfum 1'));
        $productPackaging->setPackaging($this->getReference(self::PACKAGING[rand(0, 3)]));
        $productPackaging->setUnitPrice(rand(20, 50));
        $manager->persist($productPackaging);

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
