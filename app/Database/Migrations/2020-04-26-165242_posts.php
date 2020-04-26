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
      'description' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'text' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true,
      ],
      'draft_text' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'author' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'url' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'likes' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'score' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'is_submitted' => [
        'type' => 'BOOLEAN'
      ],
      'is_draft' => [
        'type' => 'BOOLEAN'
      ],
      'is_published' => [
        'type' => 'BOOLEAN'
      ],
      'published_at' => [
        'type' => 'DATETIME',
        'null' => true
      ],
      'status' => [
        'type' => 'BOOLEAN'
      ],
      'created_by' => [
        'type' => 'INT',
        'constraint' => 9,
        'null' => true,
      ],
      'updated_by' => [
        'type' => 'INT',
        'constraint' => 9,
        'null' => true,
      ],
      'created_at' => [
        'type' => 'DATETIME'
      ],
      'updated_at' => [
        'type' => 'DATETIME'
      ],
    ]);
    $this->forge->addKey('title');
    $this->forge->addKey('description');
    $this->forge->addForeignKey('author','users','id');
    $this->forge->addForeignKey('created_by','users','id');
    $this->forge->addForeignKey('updated_by','users','id');
    $this->forge->createTable('posts');
  }

  public function down() {
    $this->forge->dropTable('posts');
  }
}
