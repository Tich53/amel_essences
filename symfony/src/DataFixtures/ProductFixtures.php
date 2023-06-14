<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {

        // 100 Parfums femmes 
        for ($i = 100; $i < 200; $i++) {
            $product = new Product();
            $product->setName($i);
            $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
            $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[rand(0, 1)]));
            $product->setPreference("Terre d'hermès");
            $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
            $this->addReference($i, $product);
            $manager->persist($product);
        }

        // 100 Parfums hommes 
        for ($i = 200; $i < 300; $i++) {
            $product = new Product();
            $product->setName($i);
            $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
            $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[rand(0, 1)]));
            $product->setPreference("Terre d'hermès");
            $product->setGender($this->getReference(GenderFixtures::GENDER_MALE));
            $this->addReference($i, $product);
            $manager->persist($product);
        }

        // 50 Parfums mixtes 
        for ($i = 300; $i < 350; $i++) {
            $product = new Product();
            $product->setName($i);
            $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_PERFUME));
            $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[rand(0, 1)]));
            $product->setPreference("Terre d'hermès");
            $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
            $this->addReference($i, $product);
            $manager->persist($product);
        }

        $product = new Product();
        $product->setName('Eau de parfum');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_WATER_PERFUME));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("Terre d'hermès");
        $product->setGender($this->getReference(GenderFixtures::GENDER_FEMALE));
        $this->addReference('Eau_de_parfum', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Gel douche');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_SHOWER_GEL));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Gel_douche', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Lotion tonique');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_MOISTURIZING));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Lotion_tonique', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Huile Démaquillante');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_MAKEUP_REMOVER_AND_CLEANSER));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Huile_Démaquillante', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Crème de jour');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_MOISTURIZING));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Crème_de_jour', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Crème de nuit');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_MOISTURIZING));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Crème_de_nuit', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Crème anti-âge');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_ANTI_AGING));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Crème_anti-âge', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Sérum contour des yeux');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_EYES));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Sérum_contour_des_yeux', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Gel coiffant');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_HAIRDRESSING));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Gel_coiffant', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Cire fixante ultimate');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_HAIRDRESSING));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Cire_fixante_ultimate', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Shamppoing & masque naturel');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_SHAMPOO_AND_MASK));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Shamppoing_&_masque_naturel', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('Shampooing & masque detox');
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_SHAMPOO_AND_MASK));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference('Shampooing_&_masque_detox', $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName("Shampooing & masque protect'color");
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_SHAMPOO_AND_MASK));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MIXED));
        $this->addReference("Shampooing_&_masque_protect'color", $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName("Crème de rasage");
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_BEARD));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MALE));
        $this->addReference("Crème_de_rasage", $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName("Gel traceur barbe");
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_BEARD));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MALE));
        $this->addReference("Gel_traceur_barbe", $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName("Baume après rasage");
        $product->setCategory($this->getReference(CategoryFixtures::CATEGORY_BEARD));
        $product->setRangeAccount($this->getReference(RangeFixtures::RANGE[0]));
        $product->setPreference("");
        $product->setGender($this->getReference(GenderFixtures::GENDER_MALE));
        $this->addReference("Baume_après_rasage", $product);
        $manager->persist($product);


        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategoryFixtures::class,
            GenderFixtures::class,
            RangeFixtures::class
        ];
    }
}
