<?php

header('Access-Control-Allow-Origin: http://localhost:3307');
header("Content-Type: application/json");

error_reporting(E_ALL);
require_once '../bootstrap.php';

use MVC\Application;
class Login extends Application
{

    function __construct()
    {
        parent::__construct();
    }

    public function loginUser(array $args): array
    {
        $id = $args['id'];

        $profile = $this->getProfileById($id);
        if (!empty($profile)) {
            $dataUser = $this->getDataUserById(['id' => $id, 'table' => $profile['table']]);
            return [
				'isLogin' => true,
				'infoUser' => [
                    'identification' => $dataUser['identification'],
                    'name' => $dataUser['name'],
                    'profile' => $profile['profile'],
                    'profileDescription' => $profile['profileDescription'],
                ],
				'location' => "/dashboard"
            ];
        }

        return [    
            'isLogin' => false,
            'perfiles' => null,
            'alert' => [
                'type' => 'info',
                'title' => 'Usuario no registrado',
                'text' => "El usuario $id no existe en la plataforma."
            ]
        ];
    }


    private function getProfileById(string $id): array
    {
        if (empty($id)) {
            throw new \Exception('Se espera una identificación para obtener la información del usuario.');
        }

        $sql = "SELECT a.perfil AS profile, b.tabla AS 'table', b.descripcion AS profileDescription FROM usuario a INNER JOIN perfil b ON(a.perfil = b.id) WHERE a.identificacion = ?";

        try {
            $res = $this->_mysqlconnection->rawQueryOne($sql, [$id]);
            $data = is_null($res) ? [] : $res;
        } catch (Exception $e) {
            throw new \Exception("Error al consultar el perfil de usuario registrado.");
        }
        return $data;
    }

    private function getDataUserById(array $args): array
    {
        if (empty($args)) {
            throw new \Exception('Se espera una identificación para obtener la información del usuario.');
        }

        $sql = "SELECT identificacion AS identification, CONCAT_WS(' ', nombre1, nombre2, apellido1, apellido2) AS name FROM __table WHERE identificacion = ?";

        try {
            $sql = str_replace('__table', $args['table'], $sql);
            $res = $this->_mysqlconnection->rawQueryOne($sql, [$args['id']]);
            $data = is_null($res) ? [] : $res;
        } catch (Exception $e) {
            throw new \Exception("Error al consultar los datos de usuario registrado");
        }
        return $data;
    }
}


$LoginCotroller = new Login();

if (empty($_POST['id'])) {
    echo json_encode(['message' => 'Se requieren los campos llenos']);
    die();
}

$method = $_POST['action'];
if (method_exists($LoginCotroller, $method)) {
    echo json_encode($LoginCotroller->$method($_POST, true));
}

?>