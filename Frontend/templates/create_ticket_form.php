<?php
include '../includes/session_validation.php'; // Validar sesión
include '../components/ticket_form.php'; // Incluir el componente del formulario
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Ticket</title>
</head>
<body>
    <h1>Crear Ticket</h1>
    <?php
    // Renderizar el formulario
    renderTicketForm('../includes/create_ticket.php');
    ?>
</body>
</html>