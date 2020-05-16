<?php

use Config\Services;
use Config\App;

if (!function_exists('frontEndBaseURL')) {
  function frontEndBaseURL($paths = []) {
    /** @var App */
    $config = config('app');

    return implode("/", [$config->frontEndUrl, ...$paths]);
  }
}

if (! function_exists('sendVerificationEmail')) {
  function sendVerificationEmail(string $userEmail, $subject = "Welcome to Udev") {
    $verificationToken = bin2hex(random_bytes(16));
    cache()->save($verificationToken, $userEmail, HOUR);
    $email = Services::email();
    $email->setTo($userEmail);
    $email->setSubject($subject);
    $email->setMessage(lang("Email.activateAccount",[
      'base_url' => frontEndBaseURL(),
      'activate_url' => frontEndBaseURL(['validate', "${verificationToken}?email=${userEmail}"])
    ]));
    $email->send();
  }
}

if (! function_exists('sendForgotPasswordEmail')) {
  function sendForgotPasswordEmail(string $userEmail) {
    $token = bin2hex(random_bytes(16));
    cache()->save($token, $userEmail, MINUTE * 4);
    $email = Services::email();
    $email->setTo($userEmail);
    $email->setSubject("Reset Password");
    $email->setMessage(lang("Email.forgotPassword",[
      'reset_url' => frontEndBaseURL(['reset-password', $token])
    ]));
    $email->send();
  }
}
