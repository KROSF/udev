<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use Config\Auth;
use Firebase\JWT\JWT;
use stdClass;

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
      return $this->failForbidden(lang("Auth.mustBeVerified"));
    }

    $is_valid = password_verify(base64_encode(hash('sha384', $credentials->password, true)), $user->password);

    if ($is_valid) {
      $tokens = $this->generateTokens($user->id);

      $this->response->setCookie("Refresh-Token", $tokens->refresh, MONTH);

      return $this->respond([
        'accessToken' => $tokens->access,
      ]);
    }

    return $this->failValidationError();
  }

  public function refreshToken() {
    $token = $this->request->getCookie("Refresh-Token");
    if (!$token) {
      return $this->failNotFound(lang("Auth.refreshTokenNotFound"));
    }

    try {
      $payload = JWT::decode($token, $this->authConfig->jwtRefreshKey, [$this->authConfig->jwtAlgorithm]);
      $refreshTokens = cache($payload->id);
      if ($refreshTokens) {
        if (array_search($token, $refreshTokens) !== false) {
          throw new \Exception("Revoked Token");
        }
        cache()->save($payload->id, [...$refreshTokens, $token], MONTH);
      } else {
        cache()->save($payload->id, [$token], MONTH);
      }
    } catch (\Exception $e) {
      return  $this->failForbidden(lang("Auth.invalidToken"));
    }

    $tokens = $this->generateTokens($payload->id);
    $this->response->setCookie("Refresh-Token", $tokens->refresh, MONTH);

    return $this->respond([
      'accessToken' => $tokens->access,
    ]);
  }

  public function forgotPassword() {
  }

  public function resetPassword() {
  }

  public function activateAccount($token) {
    $email = cache($token);
    if (!$email) {
      return $this->failNotFound(lang("Auth.activateErrorInvalidToken"));
    }

    $user = $this->userModel->findByEmail($email);
    if (!$user->verified) {
      $user->verified = true;
      $this->userModel->save($user);
      cache()->delete($token);
    }

    return $this->respond(lang("Auth.activateSuccess"));
  }

  public function resendActivateAccount() {
    $data = $this->request->getJSON();
    $user = $this->userModel->findByEmail($data->email);
    if ($user && !$user->verified) {
      helper("email");
      sendVerificationEmail($data->email,"Please verified your email");
    }

    return $this->respondNoContent();
  }

  private function generateTokens($id) {
    $tokens = new stdClass();
    $tokens->access = JWT::encode([
      'id' => $id,
      'iat' => time(),
      'exp' => time() + MINUTE * 15,
      'iss' => base_url(),
    ], $this->authConfig->jwtKey, $this->authConfig->jwtAlgorithm);

    $tokens->refresh = JWT::encode([
      'id' => $id,
      'iat' => time(),
      'exp' => time() + MONTH,
      'iss' => base_url(),
    ],$this->authConfig->jwtRefreshKey, $this->authConfig->jwtAlgorithm);

    return $tokens;
  }
}
