<?php

namespace App\Models;

use App\Entities\Tag;
use CodeIgniter\Model;

class TagModel extends Model {
  protected $DBGroup = 'default';

  protected $table = "tags";

  protected $returnType = Tag::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'name'
  ];

  protected $validationRules = [
    'name' => 'required',
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
