<?php

namespace App\Repository;

use App\Entity\CartProductPackaging;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CartProductPackaging>
 *
 * @method CartProductPackaging|null find($id, $lockMode = null, $lockVersion = null)
 * @method CartProductPackaging|null findOneBy(array $criteria, array $orderBy = null)
 * @method CartProductPackaging[]    findAll()
 * @method CartProductPackaging[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CartProductPackagingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CartProductPackaging::class);
    }

    public function save(CartProductPackaging $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CartProductPackaging $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return CartProductPackaging[] Returns an array of CartProductPackaging objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CartProductPackaging
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
