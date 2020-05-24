<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'name' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'email' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'unique' => true,
      ],
      'username' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'unique' => true,
      ],
      'password' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'verified' => [
        'type' => 'BOOLEAN',
        'default' => false
      ],
      'github_username' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true
      ],
      'twitter_username' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true
      ],
      'bio' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true
      ],
      'location' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true
      ],
      'token_version' => [
        'type' => 'INT',
        'constraint' => 9,
        'default' => 0,
      ],
      'created_at' => [
        'type' => 'DATETIME'
      ],
      'updated_at' => [
        'type' => 'DATETIME'
      ],
    ]);
    $this->forge->addKey('created_at');
    $this->forge->createTable('users');
  }

  public function down() {
    $this->forge->dropTable('users');
  }
}
