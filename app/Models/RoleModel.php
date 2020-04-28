<?php

namespace App\Models;

use App\Entities\Role;
use CodeIgniter\Model;

class RoleModel extends Model {
  protected $DBGroup = 'default';

  protected $table = "roles";

  protected $returnType = Role::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'code',
    'status'
  ];

  protected $validationRules = [
    'code' => 'required',
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
