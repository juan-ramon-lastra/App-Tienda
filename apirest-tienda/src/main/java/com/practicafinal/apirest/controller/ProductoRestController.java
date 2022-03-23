package com.practicafinal.apirest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practicafinal.apirest.entity.Producto;
import com.practicafinal.apirest.service.ProductoService;

@RestController
@RequestMapping("/api")
public class ProductoRestController {

	@Autowired
	private ProductoService servicio;
	
	@GetMapping("/productos")
	public List<Producto> index() {
		return servicio.findAll();
	}
	
	@GetMapping("/productos/{id}")
	public ResponseEntity<?> findProductoById(@PathVariable Long id) {
		
		Producto producto = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			producto = servicio.findById(id);
			
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar consulta a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (producto == null) {
			response.put("mensaje", "El producto con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Producto>(producto, HttpStatus.OK);
	}
	
	@PostMapping("/productos/nuevo")
	public ResponseEntity<?> saveProducto(@RequestBody Producto producto) {
		 
		Producto nuevo = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			nuevo = servicio.save(producto);
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto se ha sido creado con éxito!");
		response.put("producto", nuevo);
		 
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/productos/editar/{id}")
	public ResponseEntity<?> updateProducto(@RequestBody Producto producto, @PathVariable Long id) {
		
		Producto productoActual = servicio.findById(id);
		Map<String, Object> response = new HashMap<>();
		
		if (productoActual == null) {
			response.put("mensaje","Error: no se pudo editar, el producto con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			productoActual.setNombre(producto.getNombre());
			productoActual.setDescripcion(producto.getDescripcion());
			productoActual.setMarca(producto.getMarca());
			productoActual.setPrecio(producto.getPrecio());
			productoActual.setCompra(producto.getCompra());
			
			servicio.save(productoActual);	
		}
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el update en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto se ha sido actualizado con éxito!");
		response.put("producto", productoActual);
		
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/productos/eliminar/{id}")
	public ResponseEntity<?> deleteProducto(@PathVariable Long id) {
		
		Producto productoActual = servicio.findById(id);
		Map<String, Object> response = new HashMap<>();
		
		if (productoActual == null) {
			response.put("mensaje","Error: no se pudo eliminar, el producto con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			servicio.delete(id);
		}
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el delete en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto se ha sido eliminado con éxito!");
		response.put("producto", productoActual);
		 
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
	}
}

