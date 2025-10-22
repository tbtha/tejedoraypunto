package com.tbtha.tejedoraypunto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.tbtha.tejedoraypunto.entities.Usuario;
import com.tbtha.tejedoraypunto.services.UsuarioServices;

import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioRestControllers {

    @Autowired
    private UsuarioServices usuarioServices;

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioServices.crear(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        Usuario usuario = usuarioServices.obtenerId(id);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioServices.listarTodas();
        return ResponseEntity.ok(usuarios);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        Usuario usuario = usuarioServices.actualizar(id, usuarioActualizado);
        return ResponseEntity.ok(usuario);
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Usuario> desactivarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioServices.desactivar(id);
        return ResponseEntity.ok(usuario);
    }

    @PatchMapping("/{id}/activar")
    public ResponseEntity<Usuario> activarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioServices.activar(id);
        return ResponseEntity.ok(usuario);
    }
    
}
