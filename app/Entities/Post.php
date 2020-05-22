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
    'id' => 'int',
    'is_submitted' => 'boolean',
    'is_draft' => 'boolean',
    'is_published' => 'boolean',
    'status' => 'boolean',
  ];

  public function updateLikes($user_id) {
    $builder = db_connect()->table("likes");
    $user_like_post = ['user_id' => $user_id, 'post_id' => $this->id];

    $result = $builder->select()->where($user_like_post)->get()->getResultArray();
    if (empty($result)) {
      $builder->insert($user_like_post);
      $this->likes += 1;
    } else {
      $builder->delete($user_like_post);
      $this->likes -= 1;
    }
  }
}
