<?php

namespace App\EntityListener;

use App\Repository\MainOrderRepository;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;

class MainOrderListener
{
    private OrderRepository $orderRepository;
    private MainOrderRepository $mainOrderRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(OrderRepository $orderRepository, MainOrderRepository $mainOrderRepository, EntityManagerInterface $entityManager)
    {
        $this->orderRepository = $orderRepository;
        $this->mainOrderRepository = $mainOrderRepository;
        $this->entityManager = $entityManager;
    }
    public function postPersist()
    {
        $orders = $this->orderRepository->getOrders();
        $mainOrderId = $this->mainOrderRepository->getMainOrders()[0]->getId();

        foreach ($orders as $order) {
            $orderId = $order->getId();
            $queryBuilder = $this->entityManager->createQueryBuilder();
            $query = $queryBuilder->update('App\Entity\Order', 'o')
                ->set('o.main_order', $mainOrderId)
                ->where('o.id = :orderId')
                ->setParameter('orderId', $orderId)
                ->getQuery();
            $query->execute();
        }
    }
}
