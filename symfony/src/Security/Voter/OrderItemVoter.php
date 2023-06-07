<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class OrderItemVoter extends Voter
{
    public const ORDER_ITEM_VIEW = 'ORDER_ITEM_VIEW';
    public const ORDER_ITEM_EDIT = 'ORDER_ITEM_EDIT';
    public const ORDER_ITEM_DELETE = 'ORDER_ITEM_DELETE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::ORDER_ITEM_VIEW, self::ORDER_ITEM_EDIT, self::ORDER_ITEM_DELETE])
            && $subject instanceof \App\Entity\OrderItem;
    }

    protected function voteOnAttribute(string $attribute, mixed $orderItem, TokenInterface $token): bool
    {
        $user = $token->getUser();

        //if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // Check if $orderItem owns to a user
        if (null === $orderItem->getOrderNumber()->getUserAccount()) {
            return false;
        } else {
            $userAccount = $orderItem->getOrderNumber()->getUserAccount();
        }

        // Check if $userAccount === $user
        if ($userAccount !== $user) return false;
        return $userAccount === $user;
    }
}
