<?php

namespace App\Entities;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(
 *     name="posts",
 *     indexes={
 *         @ORM\Index(name="index_post_title", columns={"title"}),
 *         @ORM\Index(name="index_post_description", columns={"description"})
 *     }
 * )
 */
class Post {
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue
   */
  protected int $id;

  /**
   * @ORM\Column(type="string")
   */
  protected string $title;

  /**
   * @ORM\Column(type="string")
   */
  protected string $description;

  /**
   * @ORM\Column(type="string", nullable=true)
   */
  protected ?string $text;

  /**
   * @ORM\Column(type="string",name="draft_text")
   */
  protected string $draftText;

  /**
   * @ORM\ManyToOne(targetEntity="User", inversedBy="posts")
   * @ORM\JoinColumn(name="author", referencedColumnName="id", nullable=false)
   */
  protected User $author;

  /**
   * @ORM\Column(type="string")
   */
  protected string $url;

  /**
   * @ORM\Column(type="integer")
   */
  protected int $likes;

  /**
   * @ORM\Column(type="integer")
   */
  protected int $score;

  /**
   * @ORM\Column(type="boolean",name="is_submitted")
   */
  protected bool $isSubmitted;

  /**
   * @ORM\Column(type="boolean",name="is_draft")
   */
  protected bool $isDraft;

  /**
   * @ORM\Column(type="boolean",name="is_published")
   */
  protected bool $isPublished;

  /**
   * @ORM\Column(type="datetime", name="published_at", nullable=true)
   */
  protected ?DateTime $publishedAt;

  /**
   * @ORM\Column(type="boolean")
   */
  protected bool $status;

  /**
   * @ORM\ManyToOne(targetEntity="User")
   * @ORM\JoinColumn(name="created_by", nullable=true)
   */
  protected ?User $createdBy;

  /**
   * @ORM\ManyToOne(targetEntity="User")
   * @ORM\JoinColumn(name="updated_by", nullable=true)
   */
  protected ?User $updatedBy;

  /**
   * @ORM\ManyToMany(targetEntity="Tag")
   * @ORM\JoinTable(name="post_tags")
   * @var Tag[]
   */
  protected array $tags;

  use Timestamp;
}
