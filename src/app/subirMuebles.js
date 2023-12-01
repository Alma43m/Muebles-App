import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioMueble = document.querySelector('#Formulario-Mueble');

    formularioMueble.addEventListener('submit', async (e) => {
        e.preventDefault();

        const TIPO_MUEBLE = formularioMueble['TipoMueble'].value;
        const MATERIAL = formularioMueble['Material'].value;
        const ESTILO = formularioMueble['Estilo'].value;
        const FECHA_FABRICACION = formularioMueble['FechaFabricacion'].value;
        const COLOR = formularioMueble['Color'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoMuebleRef = await addDoc(collection(db, 'Muebles'), {
                TipoMueble: TIPO_MUEBLE,
                Material: MATERIAL,
                Estilo: ESTILO,
                FechaFabricacion: FECHA_FABRICACION,
                Color: COLOR
            });

            // Muestra un mensaje si todo sale bien
            alert(`El mueble de tipo ${TIPO_MUEBLE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioMueble.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el mueble:', 'noValido');
        }
    });
});
