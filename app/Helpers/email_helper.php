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
      'activate_url' => base_url(['auth', 'active', $verificationToken])
    ]));
    $email->send();
  }
}
