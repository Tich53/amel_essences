<?php

namespace App\Enum;

enum StatusEnum: string
{
    case STATUS_VALIDATED  = 'Validé';
    case STATUS_PENDING = 'En attente';
    case STATUS_DENIED = 'Refusé';
}
