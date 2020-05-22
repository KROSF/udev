<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Posts extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'title' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'body' => [
        'type' => 'TEXT',
      ],
      'user_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'url' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'cover_url' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'likes' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'comments' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'is_draft' => [
        'type' => 'BOOLEAN',
        'default' => false,
      ],
      'is_published' => [
        'type' => 'BOOLEAN',
        'default' => false,
      ],
      'published_at' => [
        'type' => 'DATETIME',
        'null' => true
      ],
      'created_at' => [
        'type' => 'DATETIME'
      ],
      'updated_at' => [
        'type' => 'DATETIME'
      ],
    ]);
    $this->forge->addKey('title');
    $this->forge->addKey('created_at');
    $this->forge->addForeignKey('user_id','users','id');
    $this->forge->createTable('posts');
  }

  public function down() {
    $this->forge->dropTable('posts');
  }
}
