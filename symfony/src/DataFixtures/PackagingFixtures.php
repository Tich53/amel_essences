<?php

namespace App\DataFixtures;

use App\Entity\Packaging;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PackagingFixtures extends Fixture
{
    const TYPE_BOTTLE = 'Flacon';

    const CAPACITY_35 = 35;
    const CAPACITY_50 = 50;
    const CAPACITY_75 = 75;
    const CAPACITY_100 = 100;

    const UNIT_ML = 'ml';



    public function load(ObjectManager $manager): void
    {

        $packaging = new Packaging();
        $packaging->setType(self::TYPE_BOTTLE);
        $packaging->setCapacity(self::CAPACITY_35);
        $packaging->setCapacityUnit(self::UNIT_ML);
        $this->addReference(self::TYPE_BOTTLE . self::CAPACITY_35 . self::UNIT_ML, $packaging);
        $manager->persist($packaging);

        $packaging = new Packaging();
        $packaging->setType(self::TYPE_BOTTLE);
        $packaging->setCapacity(self::CAPACITY_50);
        $packaging->setCapacityUnit(self::UNIT_ML);
        $this->addReference(self::TYPE_BOTTLE . self::CAPACITY_50 . self::UNIT_ML, $packaging);
        $manager->persist($packaging);

        $packaging = new Packaging();
        $packaging->setType(self::TYPE_BOTTLE);
        $packaging->setCapacity(self::CAPACITY_75);
        $packaging->setCapacityUnit(self::UNIT_ML);
        $this->addReference(self::TYPE_BOTTLE . self::CAPACITY_75 . self::UNIT_ML, $packaging);
        $manager->persist($packaging);

        $packaging = new Packaging();
        $packaging->setType(self::TYPE_BOTTLE);
        $packaging->setCapacity(self::CAPACITY_100);
        $packaging->setCapacityUnit(self::UNIT_ML);
        $this->addReference(self::TYPE_BOTTLE . self::CAPACITY_100 . self::UNIT_ML, $packaging);
        $manager->persist($packaging);

        $manager->flush();
    }
}
