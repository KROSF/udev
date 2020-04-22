<?php

namespace App\Models;

use CodeIgniter\Model;
use App\Entities\User;

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
}
