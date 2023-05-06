<?php

namespace App\Repository;

use App\Entity\MainOrder;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MainOrder>
 *
 * @method MainOrder|null find($id, $lockMode = null, $lockVersion = null)
 * @method MainOrder|null findOneBy(array $criteria, array $orderBy = null)
 * @method MainOrder[]    findAll()
 * @method MainOrder[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MainOrderRepository extends ServiceEntityRepository
{
    private OrderRepository $orderRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, OrderRepository $orderRepository)
    {
        parent::__construct($registry, MainOrder::class);
        $this->orderRepository = $orderRepository;
    }

    public function save(MainOrder $entity, bool $flush = false,): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        $orders = $this->orderRepository->getOrders();
        $mainOrderId = $this->getMainOrders()[0]->getId();

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

    public function remove(MainOrder $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return MainOrder[] Returns an array of MainOrder objects
     */
    public function getMainOrders()
    {
        return $this->createQueryBuilder('m')
            ->orderBy('m.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getResult();
    }

    //    /**
    //     * @return MainOrder[] Returns an array of MainOrder objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?MainOrder
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
