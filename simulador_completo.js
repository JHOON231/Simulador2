
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let montoMaximo = 5000;//
  let esVip = false;//
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;
  

    function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");
    document.getElementById("listaCreditos").classList.remove("activa");
}

function mostrarSeccion(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
    let tasa;

    tasa = recuperarInt("tasaInteres");
    montoMaximo = recuperarFloat("montoMaximo");//
    if(tasa >= 10 && tasa <= 20){
        mostrarTexto(
            "mensajeTasa",
            "Tasa configurada correctamente: " + tasa + "%"
        );
    }
    else{
        mostrarTexto(
            "mensajeTasa",
            "La tasa debe estar entre 10% y 20%"
        );
    }
}

function guardarCliente(){
    let cedula;
    let nombre;
    let apellido;
    let telefono;
    let ingresos;
    let egresos;

    cedula = recuperaraTexto("txtCedula");
    nombre = recuperaraTexto("txtNombre");
    apellido = recuperaraTexto("txtApellido");
    telefono = recuperaraTexto("txtTelefono");
    ingresos = recuperarFloat("txtIngresos");
    egresos = recuperarFloat("txtEgresos");
    let cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        apellido: apellido,
        ingresos: ingresos,
        ingresos: ingresos,
        egresos: egresos
    };
    if(clienteSeleccionado == null){
        clientes.push(cliente);
    }
    else{
        clienteSeleccionado.nombre = nombre;
        clienteSeleccionado.apellido = apellido;
        clienteSeleccionado.telefono = telefono;
        clienteSeleccionado.ingresos = ingresos;
        clienteSeleccionado.egresos = egresos;
        clienteSeleccionado = null;
    }
    pintarClientes();
    console.log(clientes);
}

function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    let contenido = "";

    for(let i = 0; i < clientes.length; i++){
        contenido += "<tr>";
        contenido += "<td>" + clientes[i].cedula + "</td>";
        contenido += "<td>" + clientes[i].nombre + "</td>";
        contenido += "<td>" + clientes[i].apellido + "</td>";
        contenido += "<td>" + clientes[i].telefono + "</td>";
        contenido += "<td>" + clientes[i].ingresos + "</td>";
        contenido += "<td>" + clientes[i].egresos + "</td>";
        contenido += `
        <td>
            <button onclick="seleccionarCliente('${clientes[i].cedula}')">
              Actualizar
            </button>
        </td>
        `;
        contenido += "</tr>";
    }
    tabla.innerHTML = contenido;
}

function buscarCliente(cedula){
    for(let i = 0; i < clientes.length; i++){
        if(clientes[i].cedula == cedula){
            return clientes[i];
        }
    }
    return null;
}

function seleccionarCliente(cedula){
    let cliente;

    cliente = buscarCliente(cedula);
    clienteSeleccionado = cliente;
    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("txtTelefono", cliente.telefono);
    mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
    mostrarTextoEnCaja("txtEgresos", cliente.egresos);
}

function limpiar(){
    mostrarTextoEnCaja("txtCedula","");
    mostrarTextoEnCaja("txtNombre","");
    mostrarTextoEnCaja("txtApellido","");
    mostrarTextoEnCaja("txtTelefono","");////
    mostrarTextoEnCaja("txtIngresos","");
    mostrarTextoEnCaja("txtEgresos","");
    clienteSeleccionado = null;
}


function buscarCreditos(cedula){

    let creditosEncontrados = [];

    for(let i = 0; i < creditos.length; i++){

        if(creditos[i].cedula == cedula){

            creditosEncontrados.push(creditos[i]);

        }

    }

    return creditosEncontrados;

}

function buscarClienteCredito(){
    let cedula;

    cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente;
    cliente = buscarCliente(cedula);
    if(cliente != null){
        clienteSeleccionado = cliente;
        document.getElementById("datosClienteCredito").innerHTML = `
        <h3>Datos del Cliente</h3>
        <p><strong>Cédula:</strong> ${cliente.cedula}</p>
        <p><strong>Nombre:</strong> ${cliente.nombre}</p>
        <p><strong>Apellido:</strong> ${cliente.apellido}</p>
        <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
        <p><strong>Egresos:</strong> ${cliente.egresos}</p>
        `;
    }
    else{
        document.getElementById("datosClienteCredito").innerHTML = `
        <p>Cliente no encontrado</p>
        `;
    }
}

function calcularCredito(){
    let cedula;
    let cliente;

    cedula = recuperaraTexto("buscarCedulaCredito");

    cliente = buscarCliente(cedula);
    esVip = false;
    
    if(cliente.ingresos > 3000){////
        esVip = true;
    }
    let monto;
    let plazo;
    monto = recuperarFloat("montoCredito");
    if(cliente == null){

    document.getElementById("resultadoCredito").innerHTML = `
    Cliente no encontrado`;
    return;
}

    let limite = montoMaximo;////
    if(esVip){
        limite = montoMaximo * 2;
    }

    if(monto > limite){
        document.getElementById("resultadoCredito").innerHTML = `
        El monto supera el máximo permitido`;
        return;
    }

    plazo = recuperarFloat("plazoCredito");

    let disponible;

    disponible = calcularDisponible(
        cliente.ingresos,
        cliente.egresos
    );

    let capacidadPago;

    capacidadPago = calcularCapacidadPago(disponible);

    let interes;

    interes = CalcularInteresSimple(
        monto,
        tasaInteres,
        plazo
    );

    let totalPagar;

    totalPagar = calcularTotalPagar(
        monto,
        interes
    );

    let cuotaMensual;

    cuotaMensual = calcularCuotaMesual(
    totalPagar,
    plazo
    );
    cuotaCalculada = cuotaMensual;
    montoCalculado = monto;
    plazoCalculado = plazo;

    let resultado;

    resultado = aprobarCredito(
        capacidadPago,
        cuotaMensual
    );
    document.getElementById("resultadoCredito").innerHTML = `
    Capacidad de pago: ${capacidadPago}<br>
    Total a pagar: ${totalPagar}<br>
    Cuota mensual: ${cuotaMensual}<br>
    RESULTADO: ${resultado}
    `;

    let resultadoDiv;

    resultadoDiv = document.getElementById("resultadoCredito");
    resultadoDiv.innerHTML = `
    Capacidad de pago: ${capacidadPago}<br>
    Total a pagar: ${totalPagar}<br>
    Cuota mensual: ${cuotaMensual}<br>
    RESULTADO: ${resultado}
    `;

    if(resultado == "CREDITO APROBADO"){
    resultadoDiv.className = "aprobado";
    document.getElementById("btnSolicitarCredito").disabled = false
    }
    else{
    resultadoDiv.className = "rechazado";
     document.getElementById("btnSolicitarCredito").disabled = true;
    }
}

function solicitarCredito(){
    let credito = {
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada
};
    creditos.push(credito);
    console.log(creditos);
}

function buscarCreditosCliente(){
    let cedula;
    cedula = recuperaraTexto("buscarCedulaListado");
    ultimoFiltroCedula = cedula;
    let creditosCliente;
    creditosCliente = buscarCreditos(cedula);
    pintarCreditos(creditosCliente);
}

function pintarCreditos(arregloCreditos){
    let tabla;
    tabla = document.getElementById("tablaCreditos");
    let contenido = "";
    for(let i = 0; i < arregloCreditos.length; i++){

        contenido += "<tr>";
        contenido += "<td>" + arregloCreditos[i].cedula + "</td>";
        contenido += "<td>" + arregloCreditos[i].nombre + "</td>";
        contenido += "<td>" + arregloCreditos[i].apellido + "</td>";
        contenido += "<td>" + arregloCreditos[i].monto + "</td>";
        contenido += "<td>" + arregloCreditos[i].tasa + "</td>";
        contenido += "<td>" + arregloCreditos[i].plazo + "</td>";
        contenido += "<td>" + arregloCreditos[i].cuota + "</td>";
        contenido += `
        <td>
            <button onclick="eliminarCredito(${i})">
                Eliminar
            </button>
        </td>
        `;
        contenido += "</tr>";
    }
    tabla.innerHTML = contenido;
}

function eliminarCredito(indice){
    let credito = creditosMostrados[indice];
    if(!credito){
        return;
    }

    let posicionGlobal = creditos.indexOf(credito);
    if(posicionGlobal >= 0){
        creditos.splice(posicionGlobal, 1);
    }

    if(ultimoFiltroCedula){
        buscarCreditosCliente();
    } else {
        pintarCreditos(creditos);
    }
}




//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
