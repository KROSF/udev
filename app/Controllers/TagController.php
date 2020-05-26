<?php

namespace App\Controllers;

use App\Entities\Post;
use App\Entities\Tag;
use App\Models\PostModel;
use App\Models\TagModel;
use CodeIgniter\RESTful\ResourceController;

/**
 * @property TagModel $model
 */
class TagController extends ResourceController {
  protected $modelName = TagModel::class;

  protected $format = 'json';

  public function index() {
    $tags = $this->model->paginate();

    return $this->respond($tags);
  }

  public function show($id = null) {
    $tag = $this->model->find($id);
    if (is_null($tag)) {
      return $this->failNotFound();
    }

    return $this->respond($tag);
  }

  public function create() {
    $data = $this->request->getJSON(true);
    $id = $this->model->insert(new Tag($data));

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

    return $this->respondCreated(['tag' => $id]);
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

  public function posts($name) {
    /** @var Tag */
    $tag = $this->model->findByName($name);
    if (is_null($tag)) {
      return $this->failNotFound();
    }
    $postsModel = new PostModel();
    /** @var Post[] */
    $tag_posts = $postsModel->reindex(false)->with(["tags", "users","likes"])->paginate();
    $posts_with_tag = [];
    foreach ($tag_posts as $post) {
      if ($post->hasTags($tag->id)) {
        $posts_with_tag[] = $post;
      }
    }

    return $this->respond(['data' => $posts_with_tag]);
  }
}
