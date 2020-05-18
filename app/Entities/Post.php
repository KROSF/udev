<?php

namespace App\Entities;

use DateTime;


/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property ?string $text
 * @property string $draft_text
 * @property User $user_id
 * @property string $url
 * @property int $likes
 * @property int $score
 * @property bool $is_submitted
 * @property bool $is_draft
 * @property bool $is_published
 * @property ?DateTime $published_at
 * @property bool $status
 * @property ?User $created_by
 * @property ?User $updated_by
 * @method bool hasTags(array|int $tags)
 * @method bool setTags(array|int $tags)
 * @method bool addTags(array|int $tags)
 * @method bool removeTags(array|int $tags)
 */
class Post extends SerializableEntity {
  protected $table = 'posts';

  protected $casts = [
    'is_submitted' => 'boolean',
    'is_draft' => 'boolean',
    'is_published' => 'boolean',
    'status' => 'boolean',
  ];
}
