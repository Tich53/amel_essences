<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    const CATEGORY_PERFUME = "Parfum";
    const CATEGORY_WATER_PERFUME = "Eau de parfum";
    const CATEGORY_SHOWER_GEL = "Gel douche";
    const CATEGORY_MAKEUP_REMOVER_AND_CLEANSER = "Démaquillant & nettoyant";
    const CATEGORY_MOISTURIZING = "Hydratant";
    const CATEGORY_ANTI_AGING = "Anti-âge";
    const CATEGORY_FACE_AND_BODY_CARE = "Soins visage et corps";
    const CATEGORY_SHAMPOO_AND_MASK = "Shampooing et masque";
    const CATEGORY_HAIRDRESSING = "Coiffure";
    const CATEGORY_BEARD = "Barbe";
    const CATEGORY_NUTRI = "Nutri+";
    const CATEGORY_TRIO_CORRECTOR = "Trio correcteur";
    const CATEGORY_SKIN_TONE = "Teint";
    const CATEGORY_EYES = "Yeux";
    const CATEGORY_MAGNETIC_EMPTY_PALLETS = "Palettes vides";
    const CATEGORY_LIPS = "Lèvres";
    const CATEGORY_ACCESSORIES = "Accessoires";
    const CATEGORY_BEAUTY_PRESCRIPTION = "Mon ordonnance beauté";


    public function load(ObjectManager $manager): void
    {
        $category = new Category();
        $category->setName(self::CATEGORY_PERFUME);
        $this->addReference(self::CATEGORY_PERFUME, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_WATER_PERFUME);
        $this->addReference(self::CATEGORY_WATER_PERFUME, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_SHOWER_GEL);
        $this->addReference(self::CATEGORY_SHOWER_GEL, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_MAKEUP_REMOVER_AND_CLEANSER);
        $this->addReference(self::CATEGORY_MAKEUP_REMOVER_AND_CLEANSER, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_MOISTURIZING);
        $this->addReference(self::CATEGORY_MOISTURIZING, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_ANTI_AGING);
        $this->addReference(self::CATEGORY_ANTI_AGING, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_FACE_AND_BODY_CARE);
        $this->addReference(self::CATEGORY_FACE_AND_BODY_CARE, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_SHAMPOO_AND_MASK);
        $this->addReference(self::CATEGORY_SHAMPOO_AND_MASK, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_HAIRDRESSING);
        $this->addReference(self::CATEGORY_HAIRDRESSING, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_BEARD);
        $this->addReference(self::CATEGORY_BEARD, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_NUTRI);
        $this->addReference(self::CATEGORY_NUTRI, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_TRIO_CORRECTOR);
        $this->addReference(self::CATEGORY_TRIO_CORRECTOR, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_SKIN_TONE);
        $this->addReference(self::CATEGORY_SKIN_TONE, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_EYES);
        $this->addReference(self::CATEGORY_EYES, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_MAGNETIC_EMPTY_PALLETS);
        $this->addReference(self::CATEGORY_MAGNETIC_EMPTY_PALLETS, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_LIPS);
        $this->addReference(self::CATEGORY_LIPS, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_ACCESSORIES);
        $this->addReference(self::CATEGORY_ACCESSORIES, $category);
        $manager->persist($category);

        $category = new Category();
        $category->setName(self::CATEGORY_BEAUTY_PRESCRIPTION);
        $this->addReference(self::CATEGORY_BEAUTY_PRESCRIPTION, $category);
        $manager->persist($category);


        $manager->flush();
    }
}
