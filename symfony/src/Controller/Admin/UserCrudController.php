<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
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
            IdField::new('id'),
            EmailField::new('email'),
            CollectionField::new('roles')
                ->setFormTypeOption('entry_type', ChoiceType::class)
                ->setFormTypeOption('entry_options', [
                    'choices' => [
                        'Administrateur' => 'ROLE_ADMIN',
                        'User' => 'ROLE_USER',
                    ]
                ]),
            TextField::new('name'),
            TextField::new('surname'),
            TextField::new('address'),
            TextField::new('post_code'),
            TextField::new('city'),
            TextField::new('country'),
            TextField::new('phone'),
            AssociationField::new('status')
        ];
    }
}
