<?php

namespace App\Controller;

use App\Repository\MainOrderRepository;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    #[Route('/order', name: 'app_order')]
    public function index(OrderRepository $orderRepository, MainOrderRepository $mainOrderRepository, EntityManagerInterface $entityManager): Response
    {
        $orders = $orderRepository->getOrders();
        $mainOrderId = $mainOrderRepository->getMainOrders()[0]->getId();

        foreach ($orders as $order) {
            $orderId = $order->getId();
            $queryBuilder = $entityManager->createQueryBuilder();
            $query = $queryBuilder->update('App\Entity\Order', 'o')
                ->set('o.main_order', $mainOrderId)
                ->where('o.id = :orderId')
                ->setParameter('orderId', $orderId)
                ->getQuery();
            $query->execute();
        }

        return $this->render('order/index.html.twig', [
            'controller_name' => 'OrderController',
            'orders' => $orders,
            'mainOrderId' => $mainOrderId,

        ]);
    }
}
