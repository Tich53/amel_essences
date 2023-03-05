<?php

namespace App\DataFixtures;

use App\Entity\Status;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class StatusFixtures extends Fixture
{
    const STATUS_VALIDATED = "Validé";
    const STATUS_PENDING = "En attente";
    const STATUS_DENIED = "Refusé";

    public function load(ObjectManager $manager): void
    {
        $statusValidated = new Status();
        $statusValidated->setName(self::STATUS_VALIDATED);
        $this->addReference(self::STATUS_VALIDATED, $statusValidated);
        $manager->persist($statusValidated);

        $statusPending = new Status();
        $statusPending->setName(self::STATUS_PENDING);
        $this->addReference(self::STATUS_PENDING, $statusPending);
        $manager->persist($statusPending);

        $statusDenied = new Status();
        $statusDenied->setName(self::STATUS_DENIED);
        $this->addReference(self::STATUS_DENIED, $statusDenied);
        $manager->persist($statusDenied);

        $manager->flush();
    }
}
