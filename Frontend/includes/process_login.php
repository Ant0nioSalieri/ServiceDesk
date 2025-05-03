<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email_usuario'];
    $password = $_POST['pass_usuario'];

    $url = 'http://localhost:3000/api/auth/login';
    $data = [
        'email_usuario' => $email,
        'pass_usuario' => $password,
    ];

    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data),
        ],
    ];

    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result, true);

    if (isset($response['token'])) {
        $_SESSION['token'] = $response['token'];
        $_SESSION['usuario'] = $response['usuario'];
        header('Location: ../templates/home.php'); // Redirigir al home
    } else {
        echo 'Error: ' . $response['msg'];
    }
}
?>