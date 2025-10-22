package com.tbtha.tejedoraypunto.controllers;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.tbtha.tejedoraypunto.entities.Categoria;
import com.tbtha.tejedoraypunto.services.CategoriaServices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categorias")
@Tag(name = "Categorías", description = "API para gestión de categorías de productos")
public class CategoriaRestControllers {

    @Autowired
    private CategoriaServices categoriaServices;

    @PostMapping
    @Operation(summary = "Crear una nueva categoría", description = "Crea una nueva categoría de productos en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoría creada exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de categoría inválidos")
    })
    public ResponseEntity<Categoria> crearCategoria(
        @Parameter(description = "Datos de la categoría a crear", required = true)
        @RequestBody Categoria categoria) {
        Categoria nuevaCategoria = categoriaServices.crear(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener categoría por ID", description = "Obtiene una categoría específica por su identificador")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoría encontrada"),
        @ApiResponse(responseCode = "404", description = "Categoría no encontrada")
    })
    public ResponseEntity<Categoria> obtenerCategoriaPorId(
        @Parameter(description = "ID de la categoría", required = true, example = "1")
        @PathVariable Long id) {
        Categoria categoria = categoriaServices.obtenerId(id);
        return ResponseEntity.ok(categoria);
    }

 
    @GetMapping
    @Operation(summary = "Listar todas las categorías", description = "Obtiene una lista de todas las categorías disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de categorías obtenida exitosamente")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaServices.listarTodas();
        return ResponseEntity.ok(categorias);
    }

  
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar categoría", description = "Elimina una categoría del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Categoría eliminada exitosamente"),
        @ApiResponse(responseCode = "404", description = "Categoría no encontrada")
    })
    public ResponseEntity<Void> eliminarCategoria(
        @Parameter(description = "ID de la categoría a eliminar", required = true, example = "1")
        @PathVariable Long id) {
        categoriaServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

   
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar categoría", description = "Actualiza completamente una categoría existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoría actualizada exitosamente"),
        @ApiResponse(responseCode = "404", description = "Categoría no encontrada"),
        @ApiResponse(responseCode = "400", description = "Datos de categoría inválidos")
    })
    public ResponseEntity<Categoria> actualizarCategoria(
        @Parameter(description = "ID de la categoría a actualizar", required = true, example = "1")
        @PathVariable Long id, 
        @Parameter(description = "Nuevos datos de la categoría", required = true)
        @RequestBody Categoria categoriaActualizada) {
        Categoria categoria = categoriaServices.actualizar(id, categoriaActualizada);
        return ResponseEntity.ok(categoria);
    }
}
