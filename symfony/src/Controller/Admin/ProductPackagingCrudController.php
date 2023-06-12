<?php

namespace App\Controller\Admin;

use App\Entity\ProductPackaging;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;

class ProductPackagingCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ProductPackaging::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            /* ->renderSidebarMinimized() */
            ->setEntityPermission('ROLE_ADMIN');
        // ->setPaginatorPageSize(20);
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->onlyOnIndex(),
            AssociationField::new('product'),
            AssociationField::new('packaging'),
            NumberField::new('unitPrice'),
        ];
    }
}
