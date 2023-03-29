<?php

namespace App\DataFixtures;

use App\Entity\Gender;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GenderFixtures extends Fixture
{
    const GENDER_FEMALE = "Femme";
    const GENDER_MALE = "Homme";
    const GENDER_MIXED = "Mixte";

    public function load(ObjectManager $manager): void
    {
        $gender = new Gender();
        $gender->setName(self::GENDER_FEMALE);
        $this->addReference(self::GENDER_FEMALE, $gender);
        $manager->persist($gender);

        $gender = new Gender();
        $gender->setName(self::GENDER_MALE);
        $this->addReference(self::GENDER_MALE, $gender);
        $manager->persist($gender);

        $gender = new Gender();
        $gender->setName(self::GENDER_MIXED);
        $this->addReference(self::GENDER_MIXED, $gender);
        $manager->persist($gender);

        $manager->flush();
    }
}
