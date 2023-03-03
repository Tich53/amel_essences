<?php

namespace App\Controller\Admin;

use App\Entity\Gender;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;

class GenderCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Gender::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            /* ->renderSidebarMinimized() */
            ->setEntityPermission('ROLE_ADMIN');
            // ->setPaginatorPageSize(20);
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
