<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class UserRoles extends Migration {
  public function up() {
    $this->forge->addField([
      'user_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'role_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
    ]);
    $this->forge->addForeignKey('user_id','users','id');
    $this->forge->addForeignKey('role_id','roles','id');
    $this->forge->createTable('user_roles');
  }

  public function down() {
    $this->forge->dropTable('user_roles');
  }
}
