<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Tags extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'name' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'created_at' => [
        'type' => 'DATETIME'
      ],
      'updated_at' => [
        'type' => 'DATETIME'
      ],
    ]);
    $this->forge->createTable('tags');
  }

  public function down() {
    $this->forge->dropTable('tags');
  }
}
