<?php

namespace App\Models;

use CodeIgniter\Model;
use App\Entities\User;
use CodeIgniter\Exceptions\ModelException;
use InvalidArgumentException;
use CodeIgniter\Database\Exceptions\DatabaseException;

class UserModel extends Model {
  protected $DBGroup = 'default';

  protected $table = "users";

  protected $returnType = User::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'name',
    'email',
    'username',
    'password',
    'avatar',
    'github_username',
    'twitter_username',
    'stackoverflow_url'
  ];

  protected $validationRules = [
    'name' => 'required',
    'email' => 'required|valid_email|is_unique[users.email]',
    'username' => 'required|is_unique[users.username]',
    'password' => 'required',
  ];

  public function setUpdateRules($data) {
    $rules = [];
    foreach ($this->validationRules as $field => $rule) {
      if (isset($data[$field])) {
        $rules[$field] = $rule;
      }
    }
    $this->validationRules = $rules;

    return $this;
  }

  /**
   *
   * @param string $email
   * @return User
   * @throws ModelException
   * @throws InvalidArgumentException
   * @throws DatabaseException
   */
  public function findByEmail(string $email) {
    return $this->builder($this->table)->where('email',$email)->get(1)->getFirstRow($this->returnType);
  }
}
