
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;
  

    function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");

}

function mostrarSeccion(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
    let tasa;

    tasa = recuperarInt("tasaInteres");
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
    let ingresos;
    let egresos;

    cedula = recuperaraTexto("txtCedula");
    nombre = recuperaraTexto("txtNombre");
    apellido = recuperaraTexto("txtApellido");
    ingresos = recuperarFloat("txtIngresos");
    egresos = recuperarFloat("txtEgresos");
    let cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        ingresos: ingresos,
        egresos: egresos
    };
    if(clienteSeleccionado == null){
        clientes.push(cliente);
    }
    else{
        clienteSeleccionado.nombre = nombre;
        clienteSeleccionado.apellido = apellido;
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
    mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
    mostrarTextoEnCaja("txtEgresos", cliente.egresos);
}

function limpiar(){
    mostrarTextoEnCaja("txtCedula","");
    mostrarTextoEnCaja("txtNombre","");
    mostrarTextoEnCaja("txtApellido","");
    mostrarTextoEnCaja("txtIngresos","");
    mostrarTextoEnCaja("txtEgresos","");
    clienteSeleccionado = null;
}

//parametros

function buscarClienteCredito(){
    let cedula;

    cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente;
    cliente = buscarCliente(cedula);
    if(cliente != null){
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
    let monto;
    let plazo;
    if(cliente == null){

    document.getElementById("resultadoCredito").innerHTML = `
    Cliente no encontrado
    `;

    return;
}

    monto = recuperarFloat("montoCredito");

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
    }
    else{
    resultadoDiv.className = "rechazado";
}
}

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
