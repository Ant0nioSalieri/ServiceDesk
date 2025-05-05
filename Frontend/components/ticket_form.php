<?php
function renderTicketForm($actionUrl) {
    // Determinar la URL de retorno según el tipo de usuario
    $returnUrl = '../templates/user/user_dashboard.php'; // Valor predeterminado
    if (isset($_SESSION['usuario']['tipo']) && $_SESSION['usuario']['tipo'] === 'agente') {
        $returnUrl = '../templates/agent/agent_dashboard.php';
    }
    ?>
    <form action="<?php echo $actionUrl; ?>" method="POST">
        <label for="servicio">Servicio:</label>
        <select name="servicio_id" id="servicio" required>
            <?php
            // Obtener servicios desde el backend
            $url = 'http://localhost:3000/api/services';
            $response = @file_get_contents($url); // Usa @ para suprimir errores si la URL falla
            $services = $response ? json_decode($response, true) : [];

            if (!empty($services)) {
                foreach ($services as $service) {
                    echo "<option value='{$service['id_servicio']}'>{$service['nom_servicio']}</option>";
                }
            } else {
                echo "<option value=''>No hay servicios disponibles</option>";
            }
            ?>
        </select>
        <br>
        <label for="descripcion">Descripción:</label>
        <textarea name="descripcion" id="descripcion" required></textarea>
        <br>
        <button type="submit">Crear Ticket</button>
    </form>
    <a href="<?php echo $returnUrl; ?>">Volver</a>
    <?php
}
?>