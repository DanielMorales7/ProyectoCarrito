// Variables

const carrito               = document.querySelector('#carrito');
      listaCursos           = document.querySelector('#lista-cursos');
      contenedorCarrito     = document.querySelector('#lista-carrito tbody')
      vaciarCarritoBtn      = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];
// carga los eventos
cargarEventListeners();

function cargarEventListeners(){

    // cuando agregar un curso presionando "agregar al carrito"

    listaCursos.addEventListener('click',agregarCurso);

    // Eliminar los productos del carrito

    carrito.addEventListener('click', elimanrCurso);

    // Vaciar carrito

    vaciarCarritoBtn.addEventListener('click', () =>{

        articulosCarrito = [];

        limpiarHTML();

    });
}

// Función para capturar el evento al precionar en el botón

function agregarCurso(e){

    e.preventDefault();
    // e.target indica donde estamos dando click-- e.target.classList.contains pregunta si existe esa clase y si si ejecuta

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    else{
        console.log('fuera del carrito');  
    }

}

// Elimina un curso del carrito

function elimanrCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar el curso con el id de articuloscarrito

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // se vuelve a iterar por el carrito

        console.log(articulosCarrito)

    }
    

}


// Leer el contenio HTML que elegimos y extraer
function leerDatosCurso(curso){

    //craer objeto con la info del curso---curso.query.selector lo hacemos porque ya tenemos referenciado el curso

    const infoCurso = {
        imagen:     curso.querySelector('img').src,
        titulo:     curso.querySelector('h4').textContent,
        precio:     curso.querySelector('.precio span').textContent,
        id:         curso.querySelector('a').getAttribute('data-id'),
        cantidad:   1
    }

    // revisa si ya existe el curso el some te indica si hay al menos uno

    const existe= articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso;
            }
        });
        articulosCarrito=[...cursos];
        
    }else{
        // Agregar elemntos al carrito spread operator agrega una copia y pega el arreglo que deseas
        articulosCarrito = [...articulosCarrito, infoCurso];

    }

    console.log(articulosCarrito);  
    carritoHTML();
}

// Muestra carrito de compras en el HTML

function carritoHTML(){

    // limpiar HTML para que no se dupliquen los articulos
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        // const {}
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src = "${curso.imagen}" width="100"> </td>   
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id=${curso.id} > X </a>
        </td>
        `;
        // Agrega el html del carrito al tbody
        contenedorCarrito.appendChild(row);
    });

}

// Eliminar los cursos de tbody

function limpiarHTML(){

    // contenedorCarrito.innerHTML = '';
    //mejor forma
 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}