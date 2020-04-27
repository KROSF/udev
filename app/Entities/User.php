<?php

namespace App\Entities;

use CodeIgniter\Entity;
use CodeIgniter\I18n\Time;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $username
 * @property string $password
 * @property ?string $avatar
 * @property bool $status
 * @property bool $verified
 * @property ?string $github_username
 * @property ?string $twitter_username
 * @property ?string $stackoverflow_url
 * @property Time $created_at
 * @property Time $updated_at
 */
class User extends Entity {
  public function setPassword(string $password) {
    $this->attributes['password'] = password_hash(
      base64_encode(
          hash('sha384', $password, true)
      ),
      PASSWORD_ARGON2I,
      [
        'memory_cost' => PASSWORD_ARGON2_DEFAULT_MEMORY_COST,
        'time_cost' => PASSWORD_ARGON2_DEFAULT_TIME_COST,
        'threads' => PASSWORD_ARGON2_DEFAULT_THREADS
      ]
    );

    return $this;
  }
}
