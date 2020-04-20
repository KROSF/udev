<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;
use CodeIgniter\Entity;

/**
 * @ORM\Entity
 * @ORM\Table(
 *     name="users",
 *     uniqueConstraints={
 *         @ORM\UniqueConstraint(name="index_users_on_username", columns={"username"}),
 *         @ORM\UniqueConstraint(name="index_users_on_email", columns={"email"}),
 *     },
 *     indexes={@ORM\Index(name="index_users_on_created_at", columns={"created_at"})}
 * )
 */
class User extends Entity {
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue
   */
  protected int $id;

  /**
   * @ORM\Column(type="string")
   */
  protected string $name;

  /**
   * @ORM\Column(type="string")
   */
  protected string $email;

  /**
   * @ORM\Column(type="string")
   */
  protected string $username;

  /**
   * @var Role[]
   * @ORM\ManyToMany(targetEntity="Role")
   * @ORM\JoinTable(
   *     name="user_roles",
   *     joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
   *     inverseJoinColumns={@ORM\JoinColumn(name="role_id", referencedColumnName="id")}
   * )
   */
  protected array $roles;

  /**
   * @ORM\Column(type="string", name="password_hash")
   */
  protected string $password_hash;

  /**
   * @ORM\Column(type="string", nullable=true)
   */
  protected ?string $avatar;

  /**
   * @ORM\Column(type="boolean")
   */
  protected bool $status = true;

  /**
   * @ORM\Column(type="boolean")
   */
  protected bool $verified = false;

  /**
   * @ORM\Column(type="string", name="github_username", nullable=true)
   */
  protected ?string $githubUsername;

  /**
   * @ORM\Column(type="string", name="twitter_username", nullable=true)
   */
  protected ?string $twitterUsername;

  /**
   * @ORM\Column(type="string", name="stackoverflow_url", nullable=true)
   */
  protected ?string $stackoverflowUrl;

  /**
   * @ORM\OneToMany(targetEntity="Post", mappedBy="author")
   */
  protected array $posts;

  use Timestamp;
}
