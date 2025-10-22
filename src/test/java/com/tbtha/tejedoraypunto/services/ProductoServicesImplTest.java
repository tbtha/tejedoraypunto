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

import com.tbtha.tejedoraypunto.entities.Categoria;
import com.tbtha.tejedoraypunto.entities.Producto;
import com.tbtha.tejedoraypunto.repositories.ProductoRepositories;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests para ProductoServicesImpl")
class ProductoServicesImplTest {

    @Mock
    private ProductoRepositories productoRepositories;

    @InjectMocks
    private ProductoServicesImpl productoServices;

    private Producto producto;
    private Categoria categoria;

    @BeforeEach
    void setUp() {
        categoria = new Categoria();
        categoria.setId(1L);
        categoria.setNombre("Bufandas");

        producto = new Producto();
        producto.setId(1L);
        producto.setNombre("Bufanda de Lana");
        producto.setDescripcion("Bufanda tejida a mano");
        producto.setPrecio(45000L);
        producto.setStock(10);
        producto.setActivo(true);
        producto.setFechaCreacion(new Date());
        producto.setCategoria(categoria);
        producto.setImagen("img/otros/bufanda.jpg");
    }

    @Test
    @DisplayName("Debería crear un producto exitosamente")
    void deberiaCrearProductoExitosamente() {
        // Given - Dado
        when(productoRepositories.save(any(Producto.class))).thenReturn(producto);

        // When - Cuando
        Producto resultado = productoServices.crear(producto);

        // Then - Entonces
        assertNotNull(resultado);
        assertEquals("Bufanda de Lana", resultado.getNombre());
        assertEquals(45000L, resultado.getPrecio());
        assertEquals(10, resultado.getStock());
        assertTrue(resultado.getActivo());

        verify(productoRepositories, times(1)).save(producto);
    }

    @Test
    @DisplayName("Debería obtener producto por ID exitosamente")
    void deberiaObtenerProductoPorIdExitosamente() {
        // Given
        when(productoRepositories.findById(1L)).thenReturn(Optional.of(producto));

        // When
        Producto resultado = productoServices.obtenerId(1L);

        // Then
        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("Bufanda de Lana", resultado.getNombre());

        verify(productoRepositories, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Debería actualizar producto exitosamente")
    void deberiaActualizarProductoExitosamente() {
        // Given
        Producto productoActualizado = new Producto();
        productoActualizado.setDescripcion("Bufanda de alpaca premium");
        productoActualizado.setPrecio(65000L);
        productoActualizado.setStock(5);

        when(productoRepositories.findById(1L)).thenReturn(Optional.of(producto));
        when(productoRepositories.save(any(Producto.class))).thenReturn(producto);

        // When
        Producto resultado = productoServices.actualizar(1L, productoActualizado);

        // Then
        assertNotNull(resultado);
        verify(productoRepositories, times(1)).findById(1L);
        verify(productoRepositories, times(1)).save(producto);
        
        // Verificar que se actualizaron los campos
        assertEquals("Bufanda de alpaca premium", producto.getDescripcion());
        assertEquals(65000L, producto.getPrecio());
        assertEquals(5, producto.getStock());
    }
}