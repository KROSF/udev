<?php

namespace App\Entities;

/**
 * @ORM\Entity
 * @ORM\Table(name="posts")
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
   * @ORM\Column(type="string")
   */
  protected string $text;

  /**
   * @ORM\Column(type="integer")
   */
  protected int $likes;

  use Timestamp;
}
