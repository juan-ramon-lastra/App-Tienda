package com.practicafinal.apirest.controller;

import java.util.ArrayList;
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

import com.practicafinal.apirest.entity.Compra;
import com.practicafinal.apirest.entity.Producto;
import com.practicafinal.apirest.service.CompraService;

@RestController
@RequestMapping("/api")
public class CompraRestController {

	@Autowired
	private CompraService servicio;
	
	@GetMapping("/compras")
	public List<Compra> index() {
		return servicio.findAll();
	}
	
	@GetMapping("/compras/{id}")
	public ResponseEntity<?> findCompraById(@PathVariable Long id) {
		
		Compra compra = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			compra = servicio.findById(id);
			
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar consulta a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (compra == null) {
			response.put("mensaje", "La compra con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Compra>(compra, HttpStatus.OK);
	}
	
	@PostMapping("/compras/nueva")
	public ResponseEntity<?> saveCliente(@RequestBody Compra compra) {
		 
		Compra nueva = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			nueva = servicio.save(compra);
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La compra se ha sido creado con éxito!");
		response.put("compra", nueva);
		 
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/compras/editar/{id}")
	public ResponseEntity<?> updateCompra(@RequestBody Compra compra, @PathVariable Long id) {
		
		Compra compraActual = servicio.findById(id);
		Map<String, Object> response = new HashMap<>();
		
		if (compraActual == null) {
			response.put("mensaje","Error: no se pudo editar, la compra con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			compraActual.setCliente(compra.getCliente());
			compraActual.setFecha_compra(compra.getFecha_compra());
			
			servicio.save(compraActual);	
		}
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el update en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La compra se ha sido actualizado con éxito!");
		response.put("compra", compraActual);
		
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/compras/eliminar/{id}")
	public ResponseEntity<?> deleteCompra(@PathVariable Long id) {
		
		Compra compraActual = servicio.findById(id);
		Map<String, Object> response = new HashMap<>();
		
		if (compraActual == null) {
			response.put("mensaje","Error: no se pudo eliminar, la compra con ID: " + id.toString() + " no existe.");
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
		
		response.put("mensaje", "La compra se ha sido eliminado con éxito!");
		response.put("compra", compraActual);
		 
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
	}
	
	@GetMapping("/compras/productos/{id}")
	public ResponseEntity<?> listarProductos(@PathVariable Long id) {
		
		List<Producto> productos = new ArrayList<Producto>();
		Map<String, Object> response = new HashMap<>();
		Compra compra = servicio.findById(id);
		
		if (compra == null) {
			response.put("mensaje","Error: la compra con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			productos = this.servicio.findProductosCompra(id);
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar consulta a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (productos.isEmpty()) {
			response.put("mensaje", "La compra con ID: " + id.toString() + " no tiene ningun producto.");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<List<Producto>>(productos, HttpStatus.OK);
	}
}

