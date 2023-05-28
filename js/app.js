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

class Citas{
    constructor(){
        this.Citas = [];
    }

}

class UI{
    imprimirAlerta(mensaje, tipo){

        //Crear el DIV
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase

        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger',);
        }else{
            divMensaje.classList.add('alert-success',);
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
}

const ui = new UI();
const administrarCita = new Citas();


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
    Telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

//Agrega datos al objeto de cita
function datosCita(e){
    citaObj [e.target.name] = e.target.value;

    console.log(citaObj);
}

//Valida y agrega una nueva cita
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto de citas
    const {mascota, propietario, Telefono, fecha, hora, sintomas} = citaObj;

    //Validar

    if (mascota === '' || propietario === '' || Telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }
}