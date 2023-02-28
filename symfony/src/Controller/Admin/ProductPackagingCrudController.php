<?php

namespace App\Controller\Admin;

use App\Entity\ProductPackaging;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class ProductPackagingCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ProductPackaging::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
