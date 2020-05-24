<?php

namespace App\Controllers;

use App\Entities\User;
use App\Models\PostModel;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

/**
 * @property UserModel $model
 */
class UserController extends ResourceController {
  protected $modelName = UserModel::class;

  protected $format = 'json';

  public function index() {
    $users = $this->model->with('roles')->reindex(false)->paginate();

    return $this->respond(['data' => $users]);
  }

  public function show($id = null) {
    $user = $this->model->findByUsernameOrId($id);
    if (is_null($user)) {
      return $this->failNotFound();
    }

    return $this->respond($user);
  }

  public function create() {
    $user = new User($this->request->getJSON(true));
    $inserted = $this->model->insert($user);

    if ($this->model->errors()) {
      return $this->fail(
        ['errors' => $this->model->errors()],
        $this->codes['invalid_data'],
        null,
        'Bad Request'
      );
    }

    if ($inserted === false) {
      return $this->failServerError();
    }

    helper(["email", "frontend"]);
    sendVerificationEmail($user->email);

    return $this->respondCreated(['user' => $inserted]);
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

  public function posts($user_id) {
    $user = $this->model->findByUsernameOrId($user_id);
    if (is_null($user)) {
      return $this->failNotFound();
    }

    $postsModel = new PostModel();
    $user_posts = $postsModel->reindex(false)->with(["tags","users"])->where('user_id', $user->id)->paginate();

    return $this->respond(['data' => $user_posts]);
  }
}
