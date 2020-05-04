<?php

namespace App\Filters;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Auth;
use Config\Services;
use Firebase\JWT\JWT;

class JWTFilter implements FilterInterface {
  use ResponseTrait;

  protected $response;

  protected $request;

  /**
   *
   * @param IncomingRequest $request
   * @return mixed
   */
  public function before(RequestInterface $request) {
    $this->request = $request;
    $this->response = Services::response();
    if ($request->hasHeader('Authorization')) {
      $authConfig = new Auth();
      $userModel = new UserModel();
      $authorization = $request->getHeader('Authorization');

      try {
        $payload = JWT::decode($authorization->getValueLine(), $authConfig->jwtKey, [$authConfig->jwtAlgorithm]);

        $user = $userModel->find($payload->id);
        if (is_null($user)) {
          throw new \Exception();
        }
        $request->user = $user;

        return $request;
      } catch (\Exception $th) {
      }
    }

    $this->failUnauthorized();
    $this->response->send();
    exit();
  }

  public function after(RequestInterface $request, ResponseInterface $response) {
  }
}
