<?php

namespace App\Filters;

use App\Models\UserModel;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Security\Exceptions\SecurityException;
use Config\Auth;
use Firebase\JWT\JWT;

class JWTFilter implements FilterInterface {
  /**
   *
   * @param IncomingRequest $request
   * @return mixed
   */
  public function before(RequestInterface $request) {
    if ($request->hasHeader('Authorization')) {
      /** @var Auth $authConfig */
      $authConfig = new Auth();
      $userModel = new UserModel();
      $authorization = $request->getHeader('Authorization');
      $userID = JWT::decode($authorization->getValueLine(), $authConfig->jwtKey, [$authConfig->jwtAlgorithm]);
      $user = $userModel->find($userID);
      $request->user = $user;

      return $request;
    }

    throw new SecurityException("Authorization header missing");
  }

  public function after(RequestInterface $request, ResponseInterface $response) {
  }
}
