<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PostsDiscussions extends Migration {
  public function up() {
    $this->forge->addField([
      'post_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'discussion_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
    ]);
    $this->forge->addUniqueKey(['discussion_id','post_id']);
    $this->forge->addUniqueKey(['post_id','discussion_id']);
    $this->forge->addForeignKey('discussion_id', 'discussions', 'id');
    $this->forge->addForeignKey('post_id', 'posts', 'id');
    $this->forge->createTable('posts_discussions');
  }

  public function down() {
    $this->forge->dropTable('posts_discussions');
  }
}
