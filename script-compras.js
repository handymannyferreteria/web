document.addEventListener('DOMContentLoaded', () => {
    // Manejo del formulario
    document.getElementById('compra-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtención de datos del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;

        const formaPago = document.querySelector('input[name="pago"]:checked')?.value;
        const opcionEntrega = document.querySelector('input[name="entrega"]:checked')?.value;

        // Validación simple
        if (!nombre || !correo || !telefono || !formaPago || !opcionEntrega) {
            alert('Por favor complete todos los campos.');
            return;
        }

        // Validar tarjeta de crédito si se selecciona la opción
        if (formaPago === 'tarjeta') {
            const numTarjeta = document.getElementById('num-tarjeta').value;
            const cvc = document.getElementById('cvc').value;
            const fechaExpiracion = document.getElementById('fecha-expiracion').value;

            if (!numTarjeta || !cvc || !fechaExpiracion) {
                alert('Por favor complete los datos de la tarjeta.');
                return;
            }
        }

        // Mostrar confirmación
        document.getElementById('compra-form').reset(); // Limpiar el formulario
        document.getElementById('mensaje-confirmacion').style.display = 'block'; // Mostrar mensaje
    });

    // Mostrar u ocultar los campos de tarjeta según la selección de pago
    document.querySelectorAll('input[name="pago"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            const datosTarjeta = document.getElementById('datos-tarjeta');
            if (this.value === 'tarjeta') {
                datosTarjeta.style.display = 'block';
                // Hacer los campos de tarjeta obligatorios
                document.getElementById('num-tarjeta').setAttribute('required', 'true');
                document.getElementById('cvc').setAttribute('required', 'true');
                document.getElementById('fecha-expiracion').setAttribute('required', 'true');
            } else {
                datosTarjeta.style.display = 'none';
                // Eliminar la obligatoriedad de los campos de tarjeta
                document.getElementById('num-tarjeta').removeAttribute('required');
                document.getElementById('cvc').removeAttribute('required');
                document.getElementById('fecha-expiracion').removeAttribute('required');
            }
        });
    });
});
