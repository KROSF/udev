<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;

use Spatie\Enum\Enum;

/**
 * @method static self LEARNER()
 * @method static self WRITER()
 * @method static self EDITOR()
 * @method static self ADMIN()
 */
class RoleCode extends Enum {
}

/**
 * @ORM\Entity
 * @ORM\Table(name="roles")
 */
class Role {
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue
   */
  protected int $id;

  /**
   * @ORM\Column(type="string")
   */
  protected RoleCode $code;

  /**
   * @ORM\Column(type="boolean")
   */
  protected bool $status;

  use Timestamp;
}