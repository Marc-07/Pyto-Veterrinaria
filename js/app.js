//Campos del formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        //console.log(this.citas);
    }

    eliminarCita (id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita (citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

}

class UI{
    imprimirAlerta(mensaje, tipo){

        //Crear el DIV
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase

        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de Error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){
        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class = "font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class = "font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class = "font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class = "font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class = "font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            //Botón para eliminar citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            //Botón para editar citas
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /> </svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            //Agregar los parrafos al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);

        })    
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)

        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();


// Registrar Eventos
evenListeners();
function evenListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}


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
function datosCita(e){
    citaObj [e.target.name] = e.target.value;

    //console.log(citaObj);
}

//Valida y agrega una nueva cita
function nuevaCita(e){
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

function reiniciarObjeto(){
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = ''
}

function eliminarCita(id){
    //Eliminar la cita

    administrarCitas.eliminarCita(id);

    //Muestre la cita
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//Editar datos de cita
function cargarEdicion(cita){
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