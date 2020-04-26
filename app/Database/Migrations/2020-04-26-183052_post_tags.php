<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PostTags extends Migration {
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
    $this->forge->createTable('post_tags');
  }

  public function down() {
    $this->forge->dropTable('post_tags');
  }
}
