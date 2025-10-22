package com.tbtha.tejedoraypunto.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.tbtha.tejedoraypunto.entities.Usuario;
import com.tbtha.tejedoraypunto.repositories.UsuarioRepositories;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests para UsuarioServicesImpl")
class UsuarioServicesImplTest {

    @Mock
    private UsuarioRepositories usuarioRepositories;

    @InjectMocks
    private UsuarioServicesImpl usuarioServices;

    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1L);
        usuario.setRut("12345678-9");
        usuario.setNombre("Juan");
        usuario.setApellidos("Pérez González");
        usuario.setEmail("juan.perez@email.com");
        usuario.setDireccion("Calle Falsa 123");
        usuario.setRegion("Metropolitana");
        usuario.setComuna("Santiago");
        usuario.setRol("CLIENTE");
        usuario.setPassword("password123");
        usuario.setActivo(true);
        usuario.setFechaCreacion(new Date());
    }

    @Test
    @DisplayName("Debería crear un usuario exitosamente")
    void deberiaCrearUsuarioExitosamente() {
        // Given - Dado
        when(usuarioRepositories.save(any(Usuario.class))).thenReturn(usuario);

        // When - Cuando
        Usuario resultado = usuarioServices.crear(usuario);

        // Then - Entonces
        assertNotNull(resultado);
        assertEquals("Juan", resultado.getNombre());
        assertEquals("Pérez González", resultado.getApellidos());
        assertEquals("juan.perez@email.com", resultado.getEmail());
        assertEquals("CLIENTE", resultado.getRol());
        assertTrue(resultado.getActivo());

        verify(usuarioRepositories, times(1)).save(usuario);
    }

    @Test
    @DisplayName("Debería actualizar usuario exitosamente")
    void deberiaActualizarUsuarioExitosamente() {
        // Given
        Usuario usuarioActualizado = new Usuario();
        usuarioActualizado.setNombre("Juan Carlos");
        usuarioActualizado.setApellidos("Pérez López");
        usuarioActualizado.setEmail("juancarlos@email.com");
        usuarioActualizado.setDireccion("Nueva Dirección 456");
        usuarioActualizado.setRegion("Valparaíso");
        usuarioActualizado.setComuna("Viña del Mar");
        usuarioActualizado.setRol("ADMIN");

        when(usuarioRepositories.findById(1L)).thenReturn(Optional.of(usuario));
        when(usuarioRepositories.save(any(Usuario.class))).thenReturn(usuario);

        // When
        Usuario resultado = usuarioServices.actualizar(1L, usuarioActualizado);

        // Then
        assertNotNull(resultado);
        verify(usuarioRepositories, times(1)).findById(1L);
        verify(usuarioRepositories, times(1)).save(usuario);
        
        // Verificar que se actualizaron los campos
        assertEquals("Juan Carlos", usuario.getNombre());
        assertEquals("Pérez López", usuario.getApellidos());
        assertEquals("juancarlos@email.com", usuario.getEmail());
        assertEquals("Nueva Dirección 456", usuario.getDireccion());
        assertEquals("Valparaíso", usuario.getRegion());
        assertEquals("Viña del Mar", usuario.getComuna());
        assertEquals("ADMIN", usuario.getRol());
    }
}