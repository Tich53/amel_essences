<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    const CATEGORY_PERFUME = "Parfum";

    public function load(ObjectManager $manager): void
    {
        $category = new Category();
        $category->setName(self::CATEGORY_PERFUME);
        $this->addReference(self::CATEGORY_PERFUME, $category);
        $manager->persist($category);

        $manager->flush();
    }
}
