<?php

namespace App\DataFixtures;

use App\Entity\Range;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class RangeFixtures extends Fixture
{
    const RANGE = [
        0 => 'Classique',
        1 => 'Prestige'
    ];

    public function load(ObjectManager $manager): void
    {
        $range = new Range();
        $range->setName(self::RANGE[0]);
        $this->addReference(self::RANGE[0], $range);
        $manager->persist($range);

        $range = new Range();
        $range->setName(self::RANGE[1]);
        $this->addReference(self::RANGE[1], $range);
        $manager->persist($range);

        $manager->flush();
    }
}
