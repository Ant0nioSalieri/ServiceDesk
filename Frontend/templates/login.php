
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Iniciar Sesión</h1>
    <form action="../includes/process_login.php" method="POST">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email_usuario" required>
        <br>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="pass_usuario" required>
        <br>
        <button type="submit">Iniciar Sesión</button>
    </form>
</body>
</html>