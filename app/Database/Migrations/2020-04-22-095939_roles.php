<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Roles extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'code' => [
        'type' => 'ENUM',
        'constraint' => ['LEARNER', 'WRITER', 'EDITOR','ADMIN'],
        'default' => 'LEARNER',
      ],
      'status' => [
        'type' => 'BOOLEAN',
      ],
      'created_at' => [
        'type' => 'DATETIME'
      ],
      'updated_at' => [
        'type' => 'DATETIME'
      ],
    ]);
    $this->forge->createTable('roles');
  }

  public function down() {
    $this->forge->dropTable('roles');
  }
}
