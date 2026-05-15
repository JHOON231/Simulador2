
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

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
