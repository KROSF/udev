<?php

namespace App\Entities;

use CodeIgniter\Entity;
use DateTime;


/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property ?string $text
 * @property string $draftText
 * @property User $author
 * @property string $url
 * @property int $likes
 * @property int $score
 * @property bool $isSubmitted
 * @property bool $isDraft
 * @property bool $isPublished
 * @property ?DateTime $publishedAt
 * @property bool $status
 * @property ?User $createdBy
 * @property ?User $updatedBy
 */
class Post extends Entity {
}
