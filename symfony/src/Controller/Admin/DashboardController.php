<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Category;
use App\Entity\Gender;
use App\Entity\MainOrder;
use App\Entity\Order;
use App\Entity\OrderProduct;
use App\Entity\Packaging;
use App\Entity\Product;
use App\Entity\ProductPackaging;
use App\Entity\Status;
use App\Entity\User;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        return $this->render('/Admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Cosmetic sale');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Catégories', 'fas fa-list', Category::class);
        yield MenuItem::linkToCrud('Genres', 'fa-solid fa-venus-mars', Gender::class);
        yield MenuItem::linkToCrud('Commandes  principales', "fa-sharp fa-solid fa-cart-shopping", MainOrder::class);
        yield MenuItem::linkToCrud('Commandes', "fa-solid fa-bag-shopping", Order::class);
        yield MenuItem::linkToCrud('Order product', 'fa-brands fa-first-order', OrderProduct::class);
        yield MenuItem::linkToCrud('Conditionnements', 'fa-solid fa-box-open', Packaging::class);
        yield MenuItem::linkToCrud('Produits', 'fa-solid fa-bottle-droplet', Product::class);
        yield MenuItem::linkToCrud('Produits et emballages', 'fas fa-list', ProductPackaging::class);
        yield MenuItem::linkToCrud('Status', 'fa-solid fa-check', Status::class);
        yield MenuItem::linkToCrud('Utilisateurs', 'fas fa-users', User::class);
    }
}
