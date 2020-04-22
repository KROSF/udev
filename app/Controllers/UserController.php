<?php

namespace App\Controllers;

use App\Entities\User;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

/**
 * @property UserModel $model
 */
class UserController extends ResourceController {
  protected $modelName = UserModel::class;

  protected $format = 'json';

  public function index() {
    $users = $this->model->asArray()->paginate();

    return $this->respond($users);
  }

  public function show($id = null) {
    $user = $this->model->asArray()->find($id);
    if (is_null($user)) {
      return $this->failNotFound();
    }

    return $this->respond($user);
  }

  public function create() {
    $data = $this->request->getJSON(true);
    $id = $this->model->insert(new User($data));

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

    return $this->respondCreated(['user' => $id]);
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

    return $this->respond($this->model->asArray()->find($id));
  }

  public function delete($id = null) {
    if (is_null($this->model->find($id))) {
      return $this->failNotFound();
    }
    $this->model->delete($id);

    return $this->respondDeleted(['deleted' => $id]);
  }
}