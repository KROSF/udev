<?php

namespace App\Libraries;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;

class Doctrine {
  public $em = null;

  public function __construct() {
    $dbConfig = config('Config\Database');
    $db = $dbConfig->{$dbConfig->defaultGroup};

    $isDevMode = ENVIRONMENT !== 'production';
    $proxyDir = null;
    $cache = null;
    $useSimpleAnnotationReader = false;

    $config = Setup::createAnnotationMetadataConfiguration(
            [APPPATH.'Entities'],
            $isDevMode,
            $proxyDir,
            $cache,
            $useSimpleAnnotationReader
        );

    $connection = [
      'driver' => strtolower($db['DBDriver']),
      'user' => $db['username'],
      'password' => $db['password'],
      'host' => $db['hostname'],
      'dbname' => $db['database'],
      'charset' => $db['charset'],
    ];

    $this->em = EntityManager::create($connection, $config);
  }
} 