<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class CartProductPackagingVoter extends Voter
{
    public const CART_PRODUCT_PACKAGING_VIEW = 'CART_PRODUCT_PACKAGING_VIEW';
    public const CART_PRODUCT_PACKAGING_EDIT = 'CART_PRODUCT_PACKAGING_EDIT';
    public const CART_PRODUCT_PACKAGING_DELETE = 'CART_PRODUCT_PACKAGING_DELETE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::CART_PRODUCT_PACKAGING_VIEW, self::CART_PRODUCT_PACKAGING_EDIT, self::CART_PRODUCT_PACKAGING_DELETE])
            && $subject instanceof \App\Entity\CartProductPackaging;
    }

    protected function voteOnAttribute(string $attribute, mixed $cartProductPackaging, TokenInterface $token): bool
    {
        $user = $token->getUser();

        //if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // Check if the $cartProductPackaging has a cart
        if (null === $cartProductPackaging->getCart()) {
            return false;
        } else {
            $cart = $cartProductPackaging->getCart();
        }

        // Check if $cart owns to a user
        if (null === $cart->getUserAccount()) {
            return false;
        } else {
            $userAccount = $cart->getUserAccount();
        }

        // Check if $userAccount === $user
        if ($userAccount !== $user) return false;
        return $userAccount === $user;
    }
}
