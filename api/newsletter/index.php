<?php
include_once "./Classes/Controller.class.php";

$controllerObj = new Controller();

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$partern = "/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+((?(?=co)[a-zA-Z])[a-zA-Z]{2,})))$/";

if (empty($_POST['email']) && empty($_POST['agreedToTerms'])) die();

if($_POST['agreedToTerms']== false) {
    echo json_encode(["success" => false, "message" => "You must accept the terms and conditions"]);
}
else if (preg_match($partern, $_POST['email']))
{
    // set response code - 200 OK
    http_response_code(200);

    $controllerObj->saveNewsletter($_POST['email']);

    // echo json_encode( $_POST );
    echo json_encode(array(
        "success" => true
    ));
}
else
{
    echo json_encode(["success" => false, "message" => "Adress is ending with .co"]);
}




