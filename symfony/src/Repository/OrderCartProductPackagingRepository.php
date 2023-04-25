<?php

namespace App\Repository;

use App\Entity\OrderCartProductPackaging;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OrderCartProductPackaging>
 *
 * @method OrderCartProductPackaging|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrderCartProductPackaging|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrderCartProductPackaging[]    findAll()
 * @method OrderCartProductPackaging[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderCartProductPackagingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrderCartProductPackaging::class);
    }

    public function save(OrderCartProductPackaging $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(OrderCartProductPackaging $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return OrderCartProductPackaging[] Returns an array of OrderCartProductPackaging objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?OrderCartProductPackaging
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
