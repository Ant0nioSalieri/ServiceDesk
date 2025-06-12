<?php
include '../includes/session_validation.php'; // Validar sesión
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/app.css">
    <title>Home</title>
</head>
<body>
    <h1>Bienvenido a la página principal</h1>
    <p>Usuario autenticado: <?php echo $_SESSION['usuario']['email']; ?></p>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>