<?php

namespace App\Controller\Admin;

use App\Entity\MainOrder;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;

class MainOrderCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return MainOrder::class;
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
