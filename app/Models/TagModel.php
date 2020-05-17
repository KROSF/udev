<?php

namespace App\Models;

use App\Entities\Tag;
use CodeIgniter\Model;
use Tatter\Relations\Traits\ModelTrait;

class TagModel extends Model {
  use ModelTrait;
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

  public function findByName(string $name) {
    return $this->builder($this->table)->where('name', $name)->get(1)->getFirstRow($this->returnType);
  }
}
