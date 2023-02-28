<?php

namespace App\Controller\Admin;

use App\Entity\Packaging;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PackagingCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Packaging::class;
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
