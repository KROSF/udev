<?php

namespace App\Controllers;

use App\Entities\Role;
use App\Models\RoleModel;
use CodeIgniter\RESTful\ResourceController;

/**
 * @property RoleModel $model
 */
class PostController extends ResourceController {
  protected $modelName = RoleModel::class;

  protected $format = 'json';

  public function index() {
    $roles = $this->model->paginate();

    return $this->respond($roles);
  }

  public function show($id = null) {
    $role = $this->model->find($id);
    if (is_null($role)) {
      return $this->failNotFound();
    }

    return $this->respond($role);
  }

  public function create() {
    $data = $this->request->getJSON(true);
    $id = $this->model->insert(new Role($data));

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

    return $this->respondCreated(['role' => $id]);
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
}
