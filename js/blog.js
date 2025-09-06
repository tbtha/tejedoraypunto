document.addEventListener("DOMContentLoaded", function () {
  const blogs = [
    {
      titulo: "Tejer con propósito: por qué elegí Ecocitex.",
      imagen: "img/otros/gorro.jpeg",
      descripcion: "Elegir hilado reciclado como una decisión ética y estética. El tejido puede convertirse en una práctica alineada con la economía circular, la reducción de residuos textiles y la creación de piezas únicas con historia. Una invitación a tejer con propósito y coherencia.",
      texto: "Desde que comencé a tejer, siempre sentí que cada punto debía tener sentido. No solo estético, sino ético. El tejido, para mí, es una forma de construir, de conectar, de dejar huella. Y cuando descubrí Ecocitex, supe que había encontrado un hilado que hablaba el mismo idioma que yo.Ecocitex no es solo una tienda de lanas. Es un proyecto chileno que transforma ropa en desuso en hilado reciclado, evitando que toneladas de textiles terminen en vertederos. Lo que me cautivó no fue solo su propuesta sustentable, sino la coherencia con la que lo hacen: desde la recolección, el proceso de hilado, hasta la venta, todo está pensado para cerrar el ciclo y abrir conciencia.Elegí tejer con Ecocitex porque cada ovillo tiene historia. Porque cuando tomo sus lanas entre mis manos, sé que estoy participando en algo más grande que un proyecto personal. Estoy apoyando una economía circular, fomentando el trabajo local y reduciendo mi impacto ambiental. Y eso, para mí, es tan importante como el diseño final.Además, el hilado tiene carácter. No es uniforme ni predecible, y eso lo hace único. Tiene textura, tiene alma. Me obliga a salir de la repetición y a diseñar con intención. Cada pieza que creo con Ecocitex lleva implícito un mensaje: que lo artesanal puede ser sustentable, y que lo sustentable puede ser hermoso.Tejer con Ecocitex es tejer con propósito. Y en un mundo que necesita más conciencia y menos consumo, me parece una forma silenciosa pero poderosa de decir: esto lo hice yo, y lo hice bien.",
    },
    {
      titulo: "El lenguaje de los hilos: una celebración de lo hecho a mano.",
      imagen: "img/otros/blog-tejidos.jpeg",
      descripcion: "El tejido artesanal como lenguaje visual y emocional, destacando su valor estético, simbólico y consciente. Una reflexión sobre lo hecho a mano como proceso, expresión y resistencia creativa.",
      texto: "En una pila de tejidos diversos — colores vibrantes, texturas únicas, puntos que varían entre lo delicado y lo robusto — se revela algo más que técnica: se manifiesta una narrativa silenciosa, tejida con paciencia, intención y memoria. Esta imagen, aparentemente simple, es una metáfora visual del oficio textil como expresión cultural, emocional y estética. Cada prenda tejida a mano es un fragmento de tiempo. No hay dos iguales, porque no hay dos momentos iguales. El rosa encendido puede hablar de alegría o de protesta; el verde musgo, de calma o de raíz. Las manos que tejen no solo ejecutan patrones: interpretan estados de ánimo, traducen ideas, y muchas veces, sanan.En este artículo se propone mirar el tejido como lenguaje. Un lenguaje que no necesita palabras, pero que comunica con fuerza. Los puntos, las combinaciones de color, las decisiones técnicas — todo eso forma parte de una gramática visual que conecta a quien crea con quien observa o usa la prenda.Más allá de lo estético, el tejido artesanal es también una forma de resistencia. En un mundo acelerado por la producción industrial y el consumo inmediato, detenerse a tejer es un acto consciente. Es elegir el ritmo propio, valorar el proceso, y devolverle sentido al objeto. Cada pieza tejida a mano es una declaración: esto fue hecho con tiempo, con cuidado, y con propósito.La imagen de los tejidos apilados no muestra desorden, sino abundancia. Abundancia de saberes, de historias, de posibilidades. Es una invitación a mirar el textil no solo como producto, sino como proceso. Como arte. ",
    }
];

// Función mostrar los article
window.mostrarArticle = function () {
  const contenedor = document.getElementById("blog-posts");
  contenedor.innerHTML = "";

  blogs.forEach((blog, index) => {
    const article = document.createElement("article");
    article.className = "row align-items-center mb-5";
    article.innerHTML = `
        <div class="col-md-4">
            <img src="${blog.imagen}" alt="" class="img-fluid rounded">
        </div>
        <div class="col-md-8">
            <h2 class="h4">${blog.titulo}</h2>
            <p class="text-muted">${blog.descripcion}</p>
            <button class="btn btn-outline-dark btn-sm" onclick="mostrarModalArticle(${index})">Leer más</button>
        </div>
        <hr class="my-4">
    `;
    contenedor.appendChild(article);
  });
};

let indiceActual = null;

// Función para mostrar el modal con detalles del producto
window.mostrarModalArticle = function (index) {
  indiceActual = index; // ← aquí guardamos el índice

  const blog = blogs[index];
  console.log(blog)
  // Título, descripción y precio
  document.getElementById("modalTituloBlog").textContent = blog.titulo;
  // document.getElementById("modalDescripcionBlog").textContent = blog.descripcion;
  document.getElementById("modalTextoBlog").textContent = blog.texto;
  const modal = new bootstrap.Modal(document.getElementById("modalBlog"));
  modal.show();
};

  // Mostrar al cargar
  mostrarArticle();
});