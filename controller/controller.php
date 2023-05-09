<?php

header('Access-Control-Allow-Origin: http://localhost:3307');
header("Content-Type: application/json");

error_reporting(E_ALL);
require_once '../bootstrap.php';


use MVC\Application;

class Controller extends Application
{

    function __construct($processMethods = false)
    {
        // if(!isset($_POST['ID'])){
        //     throw new \Exception("No ID was received.");
        // }
        parent::__construct();
 
        if(!$processMethods) return;
        
        echo json_encode($this->evaluateActions($_POST));
    }

    private function evaluateActions(array $args = array()):array
    {
        $data = $this->getData($args);
        return $data;
    }

}


try{
    $controller = new Controller(true);
}
catch(\Exception $e){
    echo json_encode([
        'status' => 'error',
        'codeError' => $e->getCode(),
        'alert' => [
            'type' => 'error',
            'title' => 'Error',
            'text' => $e->getMessage()
        ]
    ]);
}

?>