<?php

namespace App\Doctrine;

use App\Entity\User;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use Symfony\Component\Security\Core\Security;

use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;

final class OrderCartProductPackagingExtension implements QueryCollectionExtensionInterface
{

    /**
     * @param Security $security
     */
    public function __construct(private Security $security)
    {
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param string|null $operationName
     */
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param string $resourceClass
     *
     */
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        /** @var ?User $user */
        $user = $this->security->getUser();

        if (
            OrderCartProductPackaging::class !== $resourceClass
            || null === $user
        ) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder
            ->andWhere("$rootAlias.cart.cart_product_packaging.cart.user_account = :user")
            ->setParameter('user', $user->getId());
    }
}
