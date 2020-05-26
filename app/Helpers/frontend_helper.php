<?php

use App\Entities\Post;
use Config\App;

if (!function_exists('frontEndBaseURL')) {
  function frontEndBaseURL($paths = []) {
    /** @var App */
    $config = config('app');

    return implode("/", [$config->frontEndUrl, ...$paths]);
  }
}

if (!function_exists('postURL')) {
  function postURL(Post $post) {
    return frontEndBaseURL([cleanStr(strtolower($post->title).'-'.$post->id)]);
  }
}

if (!function_exists('cleanStr')) {
  function cleanStr($string){
    // Replaces all spaces with hyphens.
    $string = str_replace(' ', '-', $string);

    // Removes special chars.
    $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);
    // Replaces multiple hyphens with single one.
    $string = preg_replace('/-+/', '-', $string);

    return $string;
  }
}
