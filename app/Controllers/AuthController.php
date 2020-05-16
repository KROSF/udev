<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use Config\Auth;
use Firebase\JWT\JWT;
use stdClass;
use App\Entities\User;
use Exception;

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

    if (is_null($user)) {
      return $this->failForbidden(lang("Auth.badCredentials"));
    }

    if (!$user->verified) {
      return $this->failForbidden(lang("Auth.mustBeVerified"));
    }

    $hasValidPassword = password_verify(base64_encode(hash('sha384', $credentials->password, true)), $user->password);

    if ($hasValidPassword) {
      return $this->respond($this->generateTokens($user));
    }

    return $this->failForbidden(lang("Auth.badCredentials"));
  }

  public function revokeToken() {
    /** @var User */
    $user = $this->request->user;
    $user->token_version += 1;
    $this->userModel->save($user);

    return $this->respondNoContent();
  }

  public function refreshToken() {
    $data = $this->request->getJSON();

    if ($data && !property_exists($data, 'refreshToken')) {
      return $this->failNotFound(lang("Auth.refreshTokenNotFound"));
    }

    try {
      $payload = JWT::decode($data->refreshToken, $this->authConfig->jwtRefreshKey, [$this->authConfig->jwtAlgorithm]);
      $user = $this->userModel->find($payload->id);
      if (is_null($user) || $payload->version !== $user->token_version) {
        throw new Exception();
      }
    } catch (Exception $e) {
      return  $this->failUnauthorized(lang("Auth.invalidToken"));
    }

    return $this->respond($this->generateTokens($user));
  }

  public function forgotPassword() {
    $data = $this->request->getJSON();
    $user = $this->userModel->findByEmail($data->email);
    if ($user && $user->verified) {
      helper("email");
      sendForgotPasswordEmail($user->email);
    }

    return $this->respondNoContent();
  }

  public function resetPassword($token) {
    $data = $this->request->getJSON();

    $email = cache($token);
    if (!$email) {
      return $this->failNotFound(lang("Auth.activateErrorInvalidToken"));
    }

    $user = $this->userModel->findByEmail($email);
    $user->password = $data->password;
    $user->token_version += 1;
    $this->userModel->save($user);

    return $this->respond(lang("Auth.resetPasswordSuccess"));
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
      sendVerificationEmail($data->email, "Please verified your email");
    }

    return $this->respondNoContent();
  }

  private function generateTokens(User $user) {
    $tokens = new stdClass();
    $iat = time();
    $iss = base_url();

    $user->token_version += 1;
    $this->userModel->save($user);

    $tokens->accessToken = JWT::encode([
      'id' => $user->id,
      'iat' => $iat,
      'exp' => $iat + MINUTE * 15,
      'iss' => $iss,
    ], $this->authConfig->jwtKey, $this->authConfig->jwtAlgorithm);

    $tokens->refreshToken = JWT::encode([
      'id' => $user->id,
      'iat' => $iat,
      'exp' => $iat + MONTH,
      'iss' => $iss,
      'version' => $user->token_version,
    ], $this->authConfig->jwtRefreshKey, $this->authConfig->jwtAlgorithm);

    return $tokens;
  }
}
