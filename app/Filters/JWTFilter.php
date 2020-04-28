<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\JWT;

class JWTFilter implements FilterInterface {
  /**
   *
   * @param IncomingRequest $request
   * @return mixed
   */
  public function before(RequestInterface $request) {
    if ($request->hasHeader('Authorzation')) {
      $payload = $request->getHeader('Authorization');
      $decoded = JWT::decode($payload,'key',['HS256']);
    }
  }

  public function after(RequestInterface $request, ResponseInterface $response) {
  }
}