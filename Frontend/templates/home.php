<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['token'])) {
    header('Location: login.php'); // Redirigir al login si no hay token
    exit();
}

// Opcional: Validar el token con el backend
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
    header('Location: login.php');
    exit();
}

$result = json_decode($response, true);
if (!$result || !$result['valid']) {
    session_destroy(); // Eliminar la sesión si el token no es válido
    header('Location: login.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Bienvenido a la página principal</h1>
    <p>Usuario autenticado: <?php echo $_SESSION['usuario']['email']; ?></p>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>