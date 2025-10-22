package com.tbtha.tejedoraypunto.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
@Tag(name = "Imágenes", description = "API para gestión de imágenes de productos")
public class ImagenControllers {
    
    private static final String ERROR_KEY = "error";
    private static final String SUCCESS_KEY = "success";
    private static final String MENSAJE_KEY = "mensaje";

    // Ruta donde se guardarán las imágenes (relativa al proyecto)
    // public/img/otros  frontend
    @Value("${upload.path:../tejedoraypunto-frontend/public/img/otros}")
    private String uploadPath;

    @PostMapping("/upload-imagen")
    @Operation(summary = "Subir imagen de producto", description = "Sube una imagen al servidor y devuelve la ruta relativa para guardar en la base de datos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Imagen subida exitosamente"),
        @ApiResponse(responseCode = "400", description = "Archivo inválido o error en los datos")
    })
    public ResponseEntity<Map<String, Object>> uploadImagen(
        @Parameter(description = "Archivo de imagen a subir (JPG, PNG, GIF, WEBP - máximo 5MB)", required = true)
        @RequestParam("imagen") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validar que el archivo no esté vacío
            if (file.isEmpty()) {
                response.put(ERROR_KEY, "No se recibió ninguna imagen");
                return ResponseEntity.badRequest().body(response);
            }

            // Validar tipo de archivo
            String contentType = file.getContentType();
            if (contentType == null || 
                (!contentType.equals("image/jpeg") && 
                 !contentType.equals("image/jpg") && 
                 !contentType.equals("image/png") && 
                 !contentType.equals("image/gif") && 
                 !contentType.equals("image/webp"))) {
                response.put(ERROR_KEY, "Solo se permiten imágenes (JPG, PNG, GIF, WEBP)");
                return ResponseEntity.badRequest().body(response);
            }

            // Validar tamaño (máximo 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                response.put(ERROR_KEY, "La imagen no debe superar los 5MB");
                return ResponseEntity.badRequest().body(response);
            }

            // Crear directorio si no existe
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Generar nombre único para el archivo
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isEmpty()) {
                response.put(ERROR_KEY, "El nombre del archivo no es válido");
                return ResponseEntity.badRequest().body(response);
            }
            
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String nombreArchivo = "producto-" + System.currentTimeMillis() + extension;

            // Guardar el archivo
            Path destinoPath = Paths.get(uploadPath, nombreArchivo);
            Files.copy(file.getInputStream(), destinoPath, StandardCopyOption.REPLACE_EXISTING);

            // Ruta relativa para guardar en la base de datos
            String rutaRelativa = "img/otros/" + nombreArchivo;

            response.put(SUCCESS_KEY, true);
            response.put("ruta", rutaRelativa);
            response.put(MENSAJE_KEY, "Imagen guardada exitosamente");

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            response.put(ERROR_KEY, "Error al guardar la imagen: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete-imagen")
    @Operation(summary = "Eliminar imagen de producto", description = "Elimina una imagen del servidor usando su ruta relativa")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Imagen eliminada exitosamente"),
        @ApiResponse(responseCode = "404", description = "Imagen no encontrada"),
        @ApiResponse(responseCode = "500", description = "Error interno al eliminar la imagen")
    })
    public ResponseEntity<Map<String, Object>> deleteImagen(
        @Parameter(description = "Ruta relativa de la imagen a eliminar (ej: img/otros/producto-123.jpg)", required = true, example = "img/otros/producto-1761143475271.jpeg")
        @RequestParam("ruta") String ruta) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Extraer solo el nombre del archivo de la ruta
            String nombreArchivo = ruta.replace("img/otros/", "");
            Path filePath = Paths.get(uploadPath, nombreArchivo);

            // Verificar si el archivo existe y eliminarlo
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                response.put(SUCCESS_KEY, true);
                response.put(MENSAJE_KEY, "Imagen eliminada exitosamente");
                return ResponseEntity.ok(response);
            } else {
                response.put(ERROR_KEY, "La imagen no existe");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (IOException e) {
            e.printStackTrace();
            response.put(ERROR_KEY, "Error al eliminar la imagen: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
