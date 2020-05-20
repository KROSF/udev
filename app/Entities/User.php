<?php

namespace App\Entities;

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
 * @property int $token_version
 * @property Time $created_at
 * @property Time $updated_at
 * @method bool hasRoles(array|int $roles)
 * @method bool setRoles(array|int $roles)
 * @method bool addRoles(array|int $roles)
 * @method bool removeRoles(array|int $roles)
 */
class User extends SerializableEntity {
  protected $table = 'users';

  protected $protected = ['password','token_version'];

  protected $casts = [
    'id' => 'int',
    'status' => 'boolean',
    'verified' => 'boolean',
    'token_version' => 'int',
  ];

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
