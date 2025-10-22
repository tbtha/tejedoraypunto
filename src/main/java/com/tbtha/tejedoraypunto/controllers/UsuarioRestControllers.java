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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuarios", description = "API para gestión de usuarios del sistema")
public class UsuarioRestControllers {

    @Autowired
    private UsuarioServices usuarioServices;

    @PostMapping
    @Operation(summary = "Crear un nuevo usuario", description = "Registra un nuevo usuario en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario creado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de usuario inválidos")
    })
    public ResponseEntity<Usuario> crearUsuario(
        @Parameter(description = "Datos del usuario a crear", required = true)
        @RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioServices.crear(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID", description = "Obtiene un usuario específico por su identificador")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<Usuario> obtenerUsuarioPorId(
        @Parameter(description = "ID del usuario", required = true, example = "1")
        @PathVariable Long id) {
        Usuario usuario = usuarioServices.obtenerId(id);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    @Operation(summary = "Listar todos los usuarios", description = "Obtiene una lista de todos los usuarios registrados")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioServices.listarTodas();
        return ResponseEntity.ok(usuarios);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Usuario eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<Void> eliminarUsuario(
        @Parameter(description = "ID del usuario a eliminar", required = true, example = "1")
        @PathVariable Long id) {
        usuarioServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar usuario", description = "Actualiza completamente un usuario existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario actualizado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado"),
        @ApiResponse(responseCode = "400", description = "Datos de usuario inválidos")
    })
    public ResponseEntity<Usuario> actualizarUsuario(
        @Parameter(description = "ID del usuario a actualizar", required = true, example = "1")
        @PathVariable Long id, 
        @Parameter(description = "Nuevos datos del usuario", required = true)
        @RequestBody Usuario usuarioActualizado) {
        Usuario usuario = usuarioServices.actualizar(id, usuarioActualizado);
        return ResponseEntity.ok(usuario);
    }

    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar usuario", description = "Desactiva un usuario sin eliminarlo del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario desactivado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<Usuario> desactivarUsuario(
        @Parameter(description = "ID del usuario a desactivar", required = true, example = "1")
        @PathVariable Long id) {
        Usuario usuario = usuarioServices.desactivar(id);
        return ResponseEntity.ok(usuario);
    }

    @PatchMapping("/{id}/activar")
    @Operation(summary = "Activar usuario", description = "Activa un usuario previamente desactivado")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario activado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<Usuario> activarUsuario(
        @Parameter(description = "ID del usuario a activar", required = true, example = "1")
        @PathVariable Long id) {
        Usuario usuario = usuarioServices.activar(id);
        return ResponseEntity.ok(usuario);
    }
    
}
