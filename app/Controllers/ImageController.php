<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Files\UploadedFile;
use CodeIgniter\RESTful\ResourceController;

class ImageController extends ResourceController {
  public function upload() {
    helper('frontend');
    /** @var UploadedFile[] */
    $files = $this->request->getFileMultiple("files");

    if ($files) {
      $uploaded = [];
      foreach ($files as $file) {
        $name = $file->getRandomName();
        $file->move(ROOTPATH.implode(DIRECTORY_SEPARATOR, ['public', 'images']), $name);
        $uploaded[] = frontEndBaseURL(['images', $name]);
      }

      return $this->respond(['uploaded' => $uploaded]);
    }

    return $this->failValidationError();
  }
}
