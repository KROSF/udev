<?php

use App\Libraries\Doctrine;
use Doctrine\ORM\Tools\Console\ConsoleRunner;

error_reporting(E_ALL);

$pathsPath = './app/Config/Paths.php';

require $pathsPath;
$paths = new Config\Paths();

// Location of the framework bootstrap file.
$app = require rtrim($paths->systemDirectory, '/ ').'/bootstrap.php';
$doctrine = new Doctrine();

return ConsoleRunner::createHelperSet($doctrine->em); 