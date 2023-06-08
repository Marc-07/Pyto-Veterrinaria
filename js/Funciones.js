import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import {
    mascotaInput, 
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './Selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando;

// Objeto con la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

//Agrega datos al objeto de cita
export function datosCita(e){
    citaObj [e.target.name] = e.target.value;

    //console.log(citaObj);
}


//Valida y agrega una nueva cita
export function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto de citas
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando){
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        //-------

        formulario.querySelector("button[type='submit']").textContent = 'Crear Cita';
        editando = false;
        
    }else{
       //Generar ID Uunico
        citaObj.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agregó correctamente');
    }

    //Reiniciar el objeto
    reiniciarObjeto();

    //Reiniciar el formulario
    formulario.reset();

    //Mostrar el HTML de las citas

    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto(){
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = ''
}

export function eliminarCita(id){
    //Eliminar la cita

    administrarCitas.eliminarCita(id);

    //Muestre la cita
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//Editar datos de cita
export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el Objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Crear el texto del botón
    formulario.querySelector("button[type='submit']").textContent = 'Guardar Cambios';
    editando = true;
}