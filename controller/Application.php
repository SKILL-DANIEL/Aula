<?php

namespace MVC;

require_once '../bootstrap.php';

use MysqliDb;
use Dotenv\Dotenv;

error_reporting(E_ALL);

class Application
{
    protected object $_smarty;
    protected object $_mysqlconnection;

    function __construct()
    {
        self::setDotenv();
        self::setConnection();
    }

    private function setConnection()
    {
        $this->_mysqlconnection = new MysqliDb(
            [
                'host' => $_ENV['HOST'],
                'username' => $_ENV['USERNAME'],
                'password' => $_ENV['PASSWORD'],
                'db' => $_ENV['BD'],
                'port' => $_ENV['PORT'],
                'prefix' => $_ENV['PREFIX'],
                'charset' => 'utf8'
            ]
        );
    }

    private function setDotenv()
    {
        $dotenv = Dotenv::createImmutable(dirname(__FILE__, 3));
        $dotenv->load();
    }

    public function getInfoUserByIdentification(string $identification): array
    {
        if (empty($identification)) {
            throw new \Exception('Se espera una identificación para obtener la información del usuario.');
        }

        $sql = "";
        try {
            $res = $this->_mysqlconnection->rawQueryOne($sql, [$identification]);
            $data = is_null($res) ? [] : $res;
        } catch (\Exception $e) {
            throw new \Exception("Error al obtener la información del usuario.");
        }
        return $data;
    }

    public function getData(array $args = array())
    {
        
        if (empty($args['id'])) {
            throw new \Exception('Se espera una identificación para obtener la información del usuario.');
        }

        $sql = "SELECT m.nombre AS subject, h.hora AS hour, h.dia AS day FROM docente d INNER JOIN materia_carga ma ON(d.id = ma.id_docente)
                INNER JOIN area a ON(a.id = ma.id_area )
                INNER JOIN materia m ON(m.id_area = ma.id_area AND m.id = ma.id_materia)
                INNER JOIN horario h ON(h.id_materia_carga = ma.id)
                WHERE d.id = ?;";
        try {
            $res = $this->_mysqlconnection->rawQuery($sql, [$args['id']]);
            $data = is_null($res) ? [] : $res;
        } catch (\Exception $e) {
            throw new \Exception("Erro al consultar los datos.");
        }
        return $data;
    }
}
