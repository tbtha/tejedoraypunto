package com.tbtha.tejedoraypunto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tbtha.tejedoraypunto.entities.Producto;
import com.tbtha.tejedoraypunto.services.ProductoServices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

//  indica que se permite el acceso a los recursos de este controlador desde el origen especificado
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "API para gestión de productos de tejido")
public class ProductoRestControllers {

    @Autowired
    private ProductoServices productoServices;

    @PostMapping
    @Operation(summary = "Crear un nuevo producto", description = "Crea un nuevo producto de tejido en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto creado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de producto inválidos")
    })
    public ResponseEntity<Producto> crearProducto(
        @Parameter(description = "Datos del producto a crear", required = true)
        @RequestBody Producto producto) {
        Producto nuevoProducto = productoServices.crear(producto);
        return ResponseEntity.ok(nuevoProducto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID", description = "Obtiene un producto específico por su identificador")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto encontrado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    public ResponseEntity<Producto> obtenerProductoPorId(
        @Parameter(description = "ID del producto", required = true, example = "1")
        @PathVariable Long id) {
        Producto producto = productoServices.obtenerId(id);
        return ResponseEntity.ok(producto);
    }

 
    @GetMapping
    @Operation(summary = "Listar todos los productos", description = "Obtiene una lista de todos los productos disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de productos obtenida exitosamente")
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoServices.listarTodas();
        return ResponseEntity.ok(productos);
    }

  
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto", description = "Elimina un producto del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Producto eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    public ResponseEntity<Void> eliminarProducto(
        @Parameter(description = "ID del producto a eliminar", required = true, example = "1")
        @PathVariable Long id) {
        productoServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

   
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto", description = "Actualiza completamente un producto existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto actualizado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
        @ApiResponse(responseCode = "400", description = "Datos de producto inválidos")
    })
    public ResponseEntity<Producto> actualizarProducto(
        @Parameter(description = "ID del producto a actualizar", required = true, example = "1")
        @PathVariable Long id, 
        @Parameter(description = "Nuevos datos del producto", required = true)
        @RequestBody Producto productoActualizado) {
        Producto producto = productoServices.actualizar(id, productoActualizado);
        return ResponseEntity.ok(producto);
    }
    
    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar producto", description = "Desactiva un producto sin eliminarlo del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto desactivado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    public ResponseEntity<Producto> desactivar(
        @Parameter(description = "ID del producto a desactivar", required = true, example = "1")
        @PathVariable Long id) {
        return ResponseEntity.ok(productoServices.desactivar(id));
    }

    @PatchMapping("/{id}/activar")
    @Operation(summary = "Activar producto", description = "Activa un producto previamente desactivado")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto activado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    public ResponseEntity<Producto> activar(
        @Parameter(description = "ID del producto a activar", required = true, example = "1")
        @PathVariable Long id) {
        return ResponseEntity.ok(productoServices.activar(id));
    }

}
