package com.tbtha.tejedoraypunto.entities;
import java.util.Date;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Entidad que representa un producto de tejido")
public class Producto {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Schema(description = "Identificador único del producto", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    
    @Schema(description = "Nombre del producto", example = "Bufanda de lana", maxLength = 100)
    private String nombre;
    
    @Schema(description = "Descripción detallada del producto", example = "Bufanda tejida a mano con lana de alpaca", maxLength = 500)
    private String descripcion;
    
    @Schema(description = "Precio del producto en pesos colombianos", example = "45000")
    private Long precio;
    
    @Schema(description = "Cantidad disponible en inventario", example = "10")
    private Integer stock;
    
    @Schema(description = "Estado de activación del producto", example = "true", defaultValue = "true")
    private Boolean activo;
    
    @Schema(description = "Fecha de creación del producto", example = "2024-10-22T10:30:00", accessMode = Schema.AccessMode.READ_ONLY)
    private Date fechaCreacion = new Date();
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="categoria_id")
    @Schema(description = "Categoría a la que pertenece el producto")
    private Categoria categoria;

    @Column(length = 500)
    @Schema(description = "Ruta de la imagen del producto", example = "img/otros/producto-1761143475271.jpeg", maxLength = 500)
    private String imagen;

}
