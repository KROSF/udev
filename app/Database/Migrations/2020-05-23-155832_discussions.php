<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Discussions extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'content' => [
        'type' => 'TEXT',
      ],
      'user_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'discussion_id' => [
        'type' => 'INT',
        'constraint' => 9,
        'null' => true,
      ],
      'created_at' => [
        'type' => 'DATETIME',
      ],
      'updated_at' => [
        'type' => 'DATETIME',
      ],
    ]);
    $this->forge->addForeignKey('user_id', 'users', 'id');
    $this->forge->addForeignKey('discussion_id', 'discussions', 'id');
    $this->forge->createTable("discussions");
  }

  public function down() {
    $this->forge->dropTable("discussions");
  }
}
