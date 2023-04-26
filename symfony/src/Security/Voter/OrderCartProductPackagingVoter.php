<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class OrderCartProductPackagingVoter extends Voter
{
    public const ORDER_CART_PRODUCT_PACKAGING_VIEW = 'ORDER_CART_PRODUCT_PACKAGING_VIEW';
    public const ORDER_CART_PRODUCT_PACKAGING_EDIT = 'ORDER_CART_PRODUCT_PACKAGING_EDIT';
    public const ORDER_CART_PRODUCT_PACKAGING_DELETE = 'ORDER_CART_PRODUCT_PACKAGING_DELETE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::ORDER_CART_PRODUCT_PACKAGING_VIEW, self::ORDER_CART_PRODUCT_PACKAGING_EDIT, self::ORDER_CART_PRODUCT_PACKAGING_DELETE])
            && $subject instanceof \App\Entity\OrderCartProductPackaging;
    }

    protected function voteOnAttribute(string $attribute, mixed $orderCartProductPackaging, TokenInterface $token): bool
    {
        $user = $token->getUser();

        //if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // Check if $orderCartProductPackaging owns to a user
        if (null === $orderCartProductPackaging->getCartProductPackaging()->getCart()->getUserAccount()) {
            return false;
        } else {
            $userAccount = $orderCartProductPackaging->getCartProductPackaging()->getCart()->getUserAccount();
        }

        // Check if $userAccount === $user
        if ($userAccount !== $user) return false;
        return $userAccount === $user;
    }
}
