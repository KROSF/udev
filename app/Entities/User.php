<?php

namespace App\Entities;

use CodeIgniter\Entity;

class User extends Entity {
  public function setPassword(string $password) {
    $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT, ['cost' => 11]);

    return $this;
  }
}
