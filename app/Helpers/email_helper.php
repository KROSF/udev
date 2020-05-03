<?php

use Config\Services;

if (! function_exists('sendVerificationEmail')) {
  function sendVerificationEmail(string $userEmail, $subject = "Welcome to Udev") {
    $verificationCode = bin2hex(random_bytes(16));
    cache()->save($verificationCode, $userEmail, HOUR);
    $email = Services::email();
    $email->setTo($userEmail);
    $email->setSubject($subject);
    $email->setMessage("verified your account at http://localhost:8888/auth/active?code={$verificationCode}");
    $email->send();
  }
}
