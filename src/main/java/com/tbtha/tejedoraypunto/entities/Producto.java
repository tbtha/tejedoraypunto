package com.tbtha.tejedoraypunto.entities;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    // private String imagen;
    private String descripcion;
    private Long precio;
    private Integer stock;
    private Boolean activo;
    // se establecerá automáticamente con la fecha actual del sistema
    private Date fechaCreacion = new Date();
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="categoria_id")
    private Categoria categoria;

    @Column(length = 500)
    private String imagen;

}
