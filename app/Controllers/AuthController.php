<?php

namespace App\Controllers;

use App\Entities\User;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use Config\Auth;
use Firebase\JWT\JWT;


/**
 * @property string $email
 * @property string $password
 */
class Credentials {
}

class AuthController extends Controller {
  use ResponseTrait;

  protected UserModel $userModel;

  /**
   *
   * @var Auth
   */
  protected $authConfig;

  public function __construct() {
    $this->userModel = new UserModel();
    $this->authConfig = new Auth();
  }

  public function login() {
    /**
     * @var Credentials $credentials
     */
    $credentials = $this->request->getJSON();
    $user = $this->userModel->findByEmail($credentials->email);

    if (!$user->verified) {
      return $this->failForbidden("Your accound must be verified to continue");
    }

    $is_valid = password_verify(base64_encode(hash('sha384', $credentials->password, true)), $user->password);

    if ($is_valid) {
      $accessToken = JWT::encode(['id' => $user->id], $this->authConfig->jwtKey, $this->authConfig->jwtAlgorithm);

      cache()->save($user->id,$accessToken, DAY_7);

      return $this->respond([
        'accessToken' => $accessToken,
      ]);
    }

    return $this->failValidationError();
  }

  public function revokeToken() {
    if ($this->request->hasHeader("Authorization")) {
      $this->request->getHeader('Authorization');
    }

    return  $this->failValidationError();
  }

  public function forgotPassword() {
  }

  public function activateAccount() {
    $code = $this->request->getGet("code");
    if (!$code) {
      return $this->failValidationError("code param is required");
    }

    $email = cache($code);
    if (!$email) {
      return $this->failNotFound("Your code seems to be invalid");
    }

    $user = $this->userModel->findByEmail($email);
    if (!$user->verified) {
      $user->verified = true;
      $this->userModel->save($user);
      cache()->delete($code);
    }

    return $this->respond(["message" => "Account verified sucessfully"]);
  }

  public function resendActivateAccount() {
  }
}
