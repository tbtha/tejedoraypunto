package com.tbtha.tejedoraypunto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tbtha.tejedoraypunto.entities.Producto;
import com.tbtha.tejedoraypunto.repositories.ProductoRepositories;

@Service
public class ProductoServicesImpl implements ProductoServices{

 @Autowired
    private ProductoRepositories productoRepositories;

    @Override
    public Producto crear(Producto producto){
        return productoRepositories.save(producto);
    }


    @Override
    public Producto obtenerId(Long id) {
        return productoRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<Producto> listarTodas() {
        return (List<Producto>) productoRepositories.findAll();
    }

    @Override
    public void eliminar(Long id) {
        if (!productoRepositories.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }
       productoRepositories.deleteById(id);
    }

    @Override
    public Producto actualizar(Long id, Producto productoActualizado) {
        Producto existente = obtenerId(id);
        existente.setDescripcion(productoActualizado.getDescripcion());
        existente.setPrecio(productoActualizado.getPrecio());
        existente.setStock(productoActualizado.getStock());
        // existente.getImagen(productoActualizado.getImagen());
        return productoRepositories.save(existente);
    }

    @Override
    public Producto desactivar(Long id){
        Producto producto = obtenerId(id);
        producto.setActivo(false);
        return productoRepositories.save(producto);
    }
    @Override
    public Producto activar(Long id){
        Producto producto = obtenerId(id);
        producto.setActivo(true);
        return productoRepositories.save(producto);
    }
}
