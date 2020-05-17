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

    return frontEndBaseURL(['posts',str_replace(' ', '-', $post->title).'-'.$post->id]);
  }
}
