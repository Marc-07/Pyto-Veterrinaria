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

// Registrar Eventos
evenListeners();
function evenListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
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

