<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;
use Datetime;

trait Timestamp {
  /**
   * @ORM\Column(type="datetime", name="created_at", options={"default" = "CURRENT_TIMESTAMP"})
   */
  protected DateTime $createdAt;

  /**
   * @ORM\Column(type="datetime", name="updated_at", options={"default" = "CURRENT_TIMESTAMP"})
   */
  protected DateTime $updatedAt;
}