import {datosCita, nuevaCita} from '../Funciones.js'
import {
    mascotaInput, 
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from '../Selectores.js';

class App{
    constructor(){
      this.initApp();
    }

    initApp(){
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        //Formulario para nueva cita
        formulario.addEventListener('submit', nuevaCita);
    }
}

export default App;