<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use CodeIgniter\HTTP\Files\UploadedFile;

class ImageController extends Controller {
  use ResponseTrait;

  public function upload() {
    /** @var UploadedFile[] */
    $files = $this->request->getFileMultiple("files");

    if ($files) {
      $uploaded = [];
      foreach ($files as $file) {
        $name = $file->getRandomName();
        $file->move(ROOTPATH.implode(DIRECTORY_SEPARATOR, ['public', 'images']), $name);
        [$code] = explode('.', $name);
        $uploaded[] = $code;
      }

      return $this->respond(['uploaded' => $uploaded]);
    }

    return $this->failValidationError();
  }
}
