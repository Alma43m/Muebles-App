import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Muebles = document.querySelector('.Muebles');
const FormularioActualizarMueble = document.querySelector('#Formulario-ActualizarMueble');

const obtenerMueble = (id) => getDoc(doc(db, 'Muebles', id));

let id = '';

// Nueva función para actualizar mueble
const actualizarMueble = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Muebles', id), nuevosValores);
        alert('Mueble actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el mueble', 'error');
    }
};

export const MostrarListaMuebles = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Mueble = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="custom-list-group-item custom-list-group-item-action">
                    <h5> Tipo de mueble: ${Mueble.TipoMueble} </h5>
                    <p> Material: ${Mueble.Material} </p>
                    <p> Estilo: ${Mueble.Estilo} </p>
                    <p> Fecha de Fabricación: ${Mueble.FechaFabricacion} </p>
                    <p> Color: ${Mueble.Color} </p>
                    <button class="btn btn-warning w-100 mb-2 botoneSinSesion Eliminar-Mueble" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-success w-100 mb-2 botoneSinSesion Actualizar-Mueble" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarMueble"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Muebles.innerHTML = html;

        const BotonesEliminar = Muebles.querySelectorAll('.Eliminar-Mueble');

        // ELIMINAR MUEBLES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Muebles', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el mueble:', 'error');
                }
            });
        });

        const BotonesActualizar = Muebles.querySelectorAll('.Actualizar-Mueble');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerMueble(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const TIPO_MUEBLE = FormularioActualizarMueble['Actualizar-TipoMueble'];
                const MATERIAL = FormularioActualizarMueble['Actualizar-Material'];
                const ESTILO = FormularioActualizarMueble['Actualizar-Estilo'];
                const FECHA_FABRICACION = FormularioActualizarMueble['Actualizar-FechaFabricacion'];
                const COLOR = FormularioActualizarMueble['Actualizar-Color'];

                TIPO_MUEBLE.value = DATOSDOCUMENTO.TipoMueble;
                MATERIAL.value = DATOSDOCUMENTO.Material;
                ESTILO.value = DATOSDOCUMENTO.Estilo;
                FECHA_FABRICACION.value = DATOSDOCUMENTO.FechaFabricacion.toDate().toLocaleDateString(); // Convertir a formato de cadena
                COLOR.value = DATOSDOCUMENTO.Color;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el mueble al enviar el formulario
        FormularioActualizarMueble.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const TIPO_MUEBLE = FormularioActualizarMueble['Actualizar-TipoMueble'].value;
                const MATERIAL = FormularioActualizarMueble['Actualizar-Material'].value;
                const ESTILO = FormularioActualizarMueble['Actualizar-Estilo'].value;
                const FECHA_FABRICACION = new Date(FormularioActualizarMueble['Actualizar-FechaFabricacion'].value);
                const COLOR = FormularioActualizarMueble['Actualizar-Color'].value;

                await actualizarMueble(id, {
                    TipoMueble: TIPO_MUEBLE,
                    Material: MATERIAL,
                    Estilo: ESTILO,
                    FechaFabricacion: FECHA_FABRICACION,
                    Color: COLOR,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarMueble');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else {
        Muebles.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
