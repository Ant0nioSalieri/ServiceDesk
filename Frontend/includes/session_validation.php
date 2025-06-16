<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['token'])) {
    header('Location: ../../templates/login.php'); // Redirigir al login si no hay token
    exit();
}

// Validar el token con el backend
$token = $_SESSION['token'];
$url = 'http://localhost:3000/api/auth/validate'; // Endpoint para validar el token
$options = [
    'http' => [
        'header' => "Authorization: Bearer $token\r\n",
        'method' => 'GET',
    ],
];
$context = stream_context_create($options);
$response = @file_get_contents($url, false, $context); // Usa @ para suprimir errores
if ($response === false) {
    session_destroy(); // Eliminar la sesión si no se puede validar el token
    header('Location: ../../templates/login.php');
    exit();
}

$result = json_decode($response, true);
if (!$result || !$result['valid']) {
    session_destroy(); // Eliminar la sesión si el token no es válido
    header('Location: ../../templates/login.php');
    exit();
}
?>