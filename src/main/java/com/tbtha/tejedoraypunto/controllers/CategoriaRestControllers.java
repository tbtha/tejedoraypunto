package com.tbtha.tejedoraypunto.controllers;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.tbtha.tejedoraypunto.entities.Categoria;
import com.tbtha.tejedoraypunto.services.CategoriaServices;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categorias")
public class CategoriaRestControllers {

    @Autowired
    private CategoriaServices categoriaServices;

    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        Categoria nuevaCategoria = categoriaServices.crear(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        Categoria categoria = categoriaServices.obtenerId(id);
        return ResponseEntity.ok(categoria);
    }

 
    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaServices.listarTodas();
        return ResponseEntity.ok(categorias);
    }

  
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoriaActualizada) {
        Categoria categoria = categoriaServices.actualizar(id, categoriaActualizada);
        return ResponseEntity.ok(categoria);
    }
}
