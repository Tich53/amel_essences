<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
    const FRANCE = "France";
    const ROLE_ADMIN = "ROLE_ADMIN";
    const ROLE_USER = "ROLE_USER";


    public function load(ObjectManager $manager): void
    {
        $admin = new User();
        $admin->setEmail("amelie@donkey.school");
        $admin->setPassword("");
        $admin->setRoles([self::ROLE_ADMIN]);
        $admin->setName("Amélie");
        $admin->setSurName("Legeay");
        $admin->setAddress("Route de châtillon");
        $admin->setPostCode("53300");
        $admin->setCity("Oisseau");
        $admin->setCountry(self::FRANCE);
        $admin->setPhone('02 43 00 95 53');
        $admin->setStatus($this->getReference(StatusFixtures::STATUS_VALIDATED));

        $manager->persist($admin);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [StatusFixtures::class];
    }
}
