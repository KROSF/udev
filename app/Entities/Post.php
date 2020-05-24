<?php

namespace App\Entities;

use DateTime;


/**
 * @property int $id
 * @property string $title
 * @property string $body
 * @property User $user
 * @property int $user_id
 * @property int $comments
 * @property string $url
 * @property string $cover_url
 * @property bool $is_draft
 * @property bool $is_published
 * @property ?DateTime $published_at
 * @property Discussion[] $discussions
 * @method bool hasTags(array|int $tags)
 * @method bool setTags(array|int $tags)
 * @method bool addTags(array|int $tags)
 * @method bool addDiscussions(array|int $discussions)
 * @method bool removeTags(array|int $tags)
 */
class Post extends SerializableEntity {
  protected $table = 'posts';

  protected $casts = [
    'id' => 'int',
    'is_draft' => 'boolean',
    'is_published' => 'boolean',
    'comments' => 'int',
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
