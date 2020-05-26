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
    $this->forge->addUniqueKey(['post_id', 'tag_id']);
    $this->forge->addUniqueKey(['tag_id','post_id']);
    $this->forge->addForeignKey('post_id','posts','id', '', 'CASCADE');
    $this->forge->addForeignKey('tag_id','tags','id', '', 'CASCADE');
    $this->forge->createTable('posts_tags');
  }

  public function down() {
    $this->forge->dropTable('posts_tags');
  }
}
