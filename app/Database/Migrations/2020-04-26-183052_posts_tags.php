<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PostsTags extends Migration {
  public function up() {
    $this->forge->addField([
      'post_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'tag_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
    ]);
    $this->forge->addForeignKey('post_id','posts','id');
    $this->forge->addForeignKey('tag_id','tags','id');
    $this->forge->createTable('posts_tags');
  }

  public function down() {
    $this->forge->dropTable('posts_tags');
  }
}
