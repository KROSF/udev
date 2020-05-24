<?php

namespace App\Models;

use App\Entities\Discussion;
use CodeIgniter\Model;
use Tatter\Relations\Traits\ModelTrait;

class DiscussionModel extends Model {
  use ModelTrait;

  protected $DBGroup = 'default';

  protected $table = "discussions";

  protected $returnType = Discussion::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'content',
    'user_id',
    'discussion_id',
  ];

  protected $validationRules = [
    'content' => 'required',
    'user_id' => 'required',
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
