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
        $admin->setPlainPassword('0000');
        $admin->setRoles([self::ROLE_ADMIN]);
        $admin->setName("Amélie");
        $admin->setSurName("Legeay");
        $admin->setAddress("Route de châtillon");
        $admin->setPostCode("53300");
        $admin->setCity("Oisseau");
        $admin->setCountry(self::FRANCE);
        $admin->setPhone('0243009553');
        $admin->setStatus($this->getReference(StatusFixtures::STATUS_VALIDATED));
        $manager->persist($admin);

        $richard = new User();
        $richard->setEmail("richard@donkey.school");
        $richard->setPlainPassword('0000');
        $richard->setRoles([self::ROLE_USER]);
        $richard->setName("Richard");
        $richard->setSurName("Douetté");
        $richard->setAddress("23 rue de Chantilly");
        $richard->setPostCode("53100");
        $richard->setCity("Mayenne");
        $richard->setCountry(self::FRANCE);
        $richard->setPhone('0695936812');
        $richard->setStatus($this->getReference(StatusFixtures::STATUS_PENDING));
        $manager->persist($richard);

        $claudine = new User();
        $claudine->setEmail("claudine@donkey.school");
        $claudine->setPlainPassword('0000');
        $claudine->setRoles([self::ROLE_USER]);
        $claudine->setName("Claudine");
        $claudine->setSurName("Douetté");
        $claudine->setAddress("23 rue de Chantilly");
        $claudine->setPostCode("53100");
        $claudine->setCity("Mayenne");
        $claudine->setCountry(self::FRANCE);
        $claudine->setPhone('0695936813');
        $claudine->setStatus($this->getReference(StatusFixtures::STATUS_VALIDATED));
        $manager->persist($claudine);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [StatusFixtures::class];
    }
}
