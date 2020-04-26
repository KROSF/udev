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
    $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT, ['cost' => 11]);

    return $this;
  }
}
