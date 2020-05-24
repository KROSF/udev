<?php

namespace App\Controllers;

use App\Entities\Discussion;
use App\Entities\User;
use App\Entities\Post;
use App\Models\DiscussionModel;
use App\Models\PostModel;
use CodeIgniter\RESTful\ResourceController;

class DiscussionController extends ResourceController {
  protected $modelName = DiscussionModel::class;

  protected $format = 'json';

  public function add($post_id = null) {
    $postsModel = new PostModel();

    /** @var Post */
    $post = $postsModel->find($post_id);

    if (is_null($post)) {
      return $this->failNotFound();
    }

    /** @var User */
    $user = $this->request->user;
    $data = $this->request->getJSON();

    $data->is_reply = property_exists($data, 'discussion_id');
    $data->user_id = $user->id;

    $discussion = new Discussion((array) $data);
    $id = $this->model->insert($discussion);
    if ($this->model->errors()) {
      return $this->fail(
        ['errors' => $this->model->errors()],
        $this->codes['invalid_data'],
        null,
        'Bad Request'
      );
    }

    if ($id === false) {
      return $this->failServerError();
    }

    $post->addDiscussions($id);
    $post->comments += 1;
    $postsModel->save($post);

    return $this->respondNoContent();
  }

  public function view($post_id = null) {
    $postsModel = new PostModel();

    /** @var Post */
    $post = $postsModel->find($post_id);

    if (is_null($post)) {
      return $this->failNotFound();
    }

    return $this->respond(['data' => $this->nested($post->discussions)]);
  }

  /**
   *
   * @param Discussion[] $discussions
   * @return void
   */
  private function nested($discussions) {
    /** @var Discussion[] */
    $nested = [];
    foreach ($discussions as $discussion) {
      $discussion->user;
      $nested[$discussion->id] = $discussion->toRawArray();
      $nested[$discussion->id]["children"] = [];
    }

    foreach ($discussions as $discussion) {
      if (!is_null($discussion->discussion_id)) {
        $parent = &$nested[$discussion->discussion_id];
        $parent["children"][] = &$nested[$discussion->id];
      }
    }

    return array_values(
      array_filter($nested, function ($discussion) {
        return is_null($discussion["discussion_id"]);
      })
    );
  }
}
