<?php

namespace App\EntityListener;

use App\Entity\Cart;
use App\Entity\User;
use App\Enum\StatusEnum;
use App\Enum\RoleEnum;
use App\Repository\StatusRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserListener
{
    private UserPasswordHasherInterface $hasher;
    private StatusRepository $statusRepository;

    public function __construct(UserPasswordHasherInterface $hasher, StatusRepository $statusRepository)
    {
        $this->hasher = $hasher;
        $this->statusRepository = $statusRepository;
    }
    public function prePersist(User $user)
    {
        $this->encodePassword($user);
        $this->setDefaultStatus($user);
        $this->setDefaultRole($user);
        $this->setCart($user);
    }

    public function preUpdate(User $user)
    {
        $this->encodePassword($user);
    }

    /**
     * Encode password based on plain password
     */
    public function encodePassword(User $user)
    {
        if ($user->getPlainPassword() === null) {
            return;
        }

        $user->setPassword(
            $this->hasher->hashPassword(
                $user,
                $user->getPlainPassword()
            )
        );
    }

    public function setDefaultStatus(User $user)
    {
        if ($user->getStatus() === null) {
            $status = $this->statusRepository->findOneByName(StatusEnum::STATUS_PENDING);
            $user->setStatus($status);
        }
    }

    public function setDefaultRole(User $user)
    {
        if ($user->getRoles() === null) {
            $role = [RoleEnum::ROLE_USER];
            $user->setRoles($role);
        }
    }

    public function setCart(User $user)
    {
        if ($user->getCart() === null) {
            $user->setCart(new Cart());
        }
    }
}
