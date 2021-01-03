<?php
include_once "./Classes/Controller.class.php";
include_once "./Classes/View.class.php";

$controllerObj = new Controller();
$viewObj = new View();

header("Access-Control-Allow-Origin: */admin");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

http_response_code(200);

$email = '';

if(!empty($_POST['email'])) {
    $email = $_POST['email'];
}

if(!empty($_POST['selectedProvider'])){
    $response = $viewObj->showByEmailProvider($_POST['selectedProvider'], $email);

    echo json_encode(["response" => $response]);
}
else if(!empty($_POST['emailsToDelete']) && (count($_POST['emailsToDelete']) != 0)) {
    $success = $controllerObj->deleteEmails($_POST['emailsToDelete']);

    echo json_encode(["deleteSuccess" => $success]);
}
else {
    $response = $viewObj->showNewsletter($email);

    echo json_encode(["response" => $response]);
}
