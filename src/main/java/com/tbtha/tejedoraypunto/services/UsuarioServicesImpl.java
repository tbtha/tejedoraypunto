package com.tbtha.tejedoraypunto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tbtha.tejedoraypunto.entities.Usuario;
import com.tbtha.tejedoraypunto.repositories.UsuarioRepositories;

@Service
public class UsuarioServicesImpl implements UsuarioServices {
    
 @Autowired
    private UsuarioRepositories usuarioRepositories;

    @Override
    public Usuario crear(Usuario usuario){
        return usuarioRepositories.save(usuario);
    }
    @Override
    public Usuario obtenerId(Long id) {
        return usuarioRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    @Override 
    public List<Usuario> listarTodas() {
        return (List<Usuario>) usuarioRepositories.findAll();
    }
    @Override
    public void eliminar(Long id) {
        if (!usuarioRepositories.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
       usuarioRepositories.deleteById(id);
    }   
    @Override
    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        Usuario existente = obtenerId(id);
        existente.setNombre(usuarioActualizado.getNombre());
        existente.setApellidos(usuarioActualizado.getApellidos());
        existente.setEmail(usuarioActualizado.getEmail());
        existente.setDireccion(usuarioActualizado.getDireccion());
        existente.setRegion(usuarioActualizado.getRegion());
        existente.setComuna(usuarioActualizado.getComuna());
        existente.setRol(usuarioActualizado.getRol());
        // existente.setPassword(usuarioActualizado.getPassword());
        return usuarioRepositories.save(existente); 
    }   
    @Override
    public Usuario desactivar(Long id){
        Usuario usuario = obtenerId(id);
        usuario.setActivo(false);
        return usuarioRepositories.save(usuario);
    }
    
    @Override
    public Usuario activar(Long id){
        Usuario usuario = obtenerId(id);
        usuario.setActivo(true);
        return usuarioRepositories.save(usuario);
    }

}
