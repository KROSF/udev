<?php

namespace App\Models;

use App\Entities\Post;
use CodeIgniter\Model;

class PostModel extends Model {
  protected $DBGroup = 'default';

  protected $table = "posts";

  protected $returnType = Post::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'title',
    'description',
    'text',
    'draft_text',
    'author',
    'url',
    'likes',
    'is_submitted',
    'is_draft',
    'is_published',
    'published_at',
    'status',
  ];

  protected $validationRules = [
    'title' => 'required',
    'description' => 'required',
    'draft_text' => 'required',
    'author' => 'required',
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
