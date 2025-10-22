package com.tbtha.tejedoraypunto.services;

import java.util.List;

import com.tbtha.tejedoraypunto.entities.Producto;

public interface ProductoServices {

    Producto crear(Producto producto);
    Producto obtenerId(Long id);
    List<Producto> listarTodas();    
    void eliminar(Long id);
    Producto actualizar(Long id, Producto productoActualizado);
    Producto desactivar(Long id);
    Producto activar(Long id);
}
