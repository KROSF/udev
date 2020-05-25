<?php

namespace App\Controllers;

use App\Entities\Post;
use App\Entities\Tag;
use App\Entities\User;
use App\Models\PostModel;
use App\Models\TagModel;
use CodeIgniter\I18n\Time;
use CodeIgniter\RESTful\ResourceController;

/**
 * @property PostModel $model
 */
class PostController extends ResourceController {
  protected $modelName = PostModel::class;

  protected $format = 'json';

  public function index() {
    $q = $this->request->getGet('q');
    $qOnTitle = [];
    $qOnBody = [];
    if ($q) {
      $qOnBody['body'] = $q;
      $qOnTitle['title'] = $q;
    }
    /** @var Post[] */
    $posts = $this->model->like($qOnTitle)->orLike($qOnBody)->orderBy('created_at', 'DESC')->reindex(false)->with(["tags", "users", "likes"])->paginate(1);

    return $this->respond(array_merge($this->model->pager->getDetails(), ['data' => $posts, 'hasMore' => $this->model->pager->hasMore()]));
  }

  public function show($id = null) {
    $post = $this->model->reindex(false)->with(["tags", "users"])->find($id);
    if (is_null($post)) {
      return $this->failNotFound();
    }

    return $this->respond($post);
  }

  public function create() {
    /** @var User */
    $user = $this->request->user;
    $data = $this->request->getJSON();

    if ($data->publish) {
      $data->is_published = true;
      $data->published_at = new Time();
    } else {
      $data->is_draft = true;
    }

    $post = new Post((array) $data);

    $post->user_id = $user->id;

    $id = $this->model->insert($post);

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

    $tags = explode(',', $data->tags);

    $tagModel = new TagModel();

    $tagsId = [];

    foreach ($tags as $tag) {
      /** @var Tag */
      $found = $tagModel->findByName($tag);
      if ($found) {
        $tagsId[] = $found->id;
      } else {
        $tagsId[] = $tagModel->insert(['name' => $tag]);
      }
    }

    helper('frontend');

    $post->id = $id;
    $post->url = postURL($post);
    $post->addTags($tagsId);
    $this->model->save($post);

    return $this->respondCreated(['post' => $id]);
  }

  public function update($id = null) {
    $data = $this->request->getJSON(true);
    $updated = $this->model->setUpdateRules($data)->update($id,$data);

    if ($this->model->errors()) {
      return $this->fail(
        ['errors' => $this->model->errors()],
        $this->codes['invalid_data'],
        null,
        'Bad Request'
      );
    }

    if ($updated === false) {
      return $this->failServerError();
    }

    return $this->respond($this->model->find($id));
  }

  public function delete($id = null) {
    if (is_null($this->model->find($id))) {
      return $this->failNotFound();
    }
    $this->model->delete($id);

    return $this->respondDeleted(['deleted' => $id]);
  }

  public function like($id) {
    /** @var Post */
    $post = $this->model->find($id);
    if (is_null($post)) {
      return $this->failNotFound();
    }
    /** @var User */
    $user = $this->request->user;

    $post->updateLikes($user->id);
    $this->model->save($post);

    return $this->respondNoContent();
  }
}
