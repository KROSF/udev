<?php

use Config\Services;

if (! function_exists('sendVerificationEmail')) {
  function sendVerificationEmail(string $userEmail, $subject = "Welcome to Udev") {
    $verificationToken = bin2hex(random_bytes(16));
    cache()->save($verificationToken, $userEmail, HOUR);
    $email = Services::email();
    $email->setTo($userEmail);
    $email->setSubject($subject);
    $email->setMessage(lang("Email.activateAccount",[
      'base_url' => base_url(),
      'activate_url' => base_url(['api', 'auth', 'active', $verificationToken])
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
      'reset_url' => base_url(['api', 'auth', 'reset-password', $token])
    ]));
    $email->send();
  }
}
