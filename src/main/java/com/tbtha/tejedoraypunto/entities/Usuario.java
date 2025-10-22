package com.tbtha.tejedoraypunto.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Usuario {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String rut;
    private String nombre;
    private String apellidos;
    private String email;
    private String direccion;
    private String region;
    private String comuna;
    private String rol = "CLIENTE";
    private String password; //encriptada
    private Boolean activo = true;
    // se establecerá automáticamente con la fecha actual del sistema
    private Date fechaCreacion = new Date();

    
}
