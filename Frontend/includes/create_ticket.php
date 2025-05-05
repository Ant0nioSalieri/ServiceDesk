<?php
include 'session_validation.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'usuario_id' => $_SESSION['usuario']['id'],
        'servicio_id' => $_POST['servicio_id'],
        'descripcion' => $_POST['descripcion'],
    ];

    $url = 'http://localhost:3000/api/tickets/create';
    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\nAuthorization: Bearer {$_SESSION['token']}\r\n",
            'method'  => 'POST',
            'content' => json_encode($data),
        ],
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response, true);

    if ($result['success']) {
        // Validar el tipo de usuario y redirigir al panel correspondiente
        if ($_SESSION['usuario']['tipo'] === 'usuario') {
            header('Location: ../templates/user/user_dashboard.php');
        } elseif ($_SESSION['usuario']['tipo'] === 'agente') {
            header('Location: ../templates/agent/agent_dashboard.php');
        } else {
            echo 'Error: Tipo de usuario no reconocido.';
        }
    } else {
        echo 'Error: ' . $result['msg'];
    }
}
?>