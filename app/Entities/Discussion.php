<?php

namespace App\Entities;

/**
 * @property int $id
 * @property int $user_id
 * @property int? $discussion_id
 * @property string $content
 */
class Discussion extends SerializableEntity {
  protected $table = 'discussions';
}
