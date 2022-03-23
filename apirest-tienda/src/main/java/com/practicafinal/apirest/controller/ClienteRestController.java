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

import com.practicafinal.apirest.entity.Cliente;
import com.practicafinal.apirest.entity.Compra;
import com.practicafinal.apirest.service.ClienteService;

@RestController
@RequestMapping("/api")
public class ClienteRestController {

	@Autowired
	private ClienteService servicio;
	
	@GetMapping("/clientes")
	public List<Cliente> index() {
		return servicio.findAll();
	}
	
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> findClienteById(@PathVariable Long id) {
		
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			cliente = servicio.findById(id);
			
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar consulta a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (cliente == null) {
			response.put("mensaje", "El cliente con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
	}
	
	@PostMapping("/clientes/nuevo")
	public ResponseEntity<?> saveCliente(@RequestBody Cliente cliente) {
		 
		Cliente nuevo = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			nuevo = servicio.save(cliente);
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El cliente ha sido creado con éxito!");
		response.put("cliente", nuevo);
		 
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/clientes/editar/{id}")
	public ResponseEntity<?> updateCliente(@RequestBody Cliente cliente, @PathVariable Long id) {
		
		Cliente clienteActual = servicio.findById(id);
		Map<String, Object> response = new HashMap<>();
		
		if (clienteActual == null) {
			response.put("mensaje","Error: no se pudo editar, el cliente con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			clienteActual.setNombre(cliente.getNombre());
			clienteActual.setApellidos(cliente.getApellidos());
			clienteActual.setEmail(cliente.getEmail());
			
			servicio.save(clienteActual);	
		}
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el update en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El cliente ha sido actualizado con éxito!");
		response.put("cliente", clienteActual);
		
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/clientes/eliminar/{id}")
	public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
		
		Cliente clienteActual = servicio.findById(id);
		Map<String, Object> response = new HashMap<>();
		
		if (clienteActual == null) {
			response.put("mensaje","Error: no se pudo eliminar, el cliente con ID: " + id.toString() + " no existe.");
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
		
		response.put("mensaje", "El cliente ha sido eliminado con éxito!");
		response.put("cliente", clienteActual);
		 
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
	}
	
	@GetMapping("/clientes/compras/{id}")
	public ResponseEntity<?> listarCompras(@PathVariable Long id) {
		
		List<Compra> compras = new ArrayList<Compra>();
		Map<String, Object> response = new HashMap<>();
		Cliente cliente = servicio.findById(id);
		
		if (cliente == null) {
			response.put("mensaje","Error: el cliente con ID: " + id.toString() + " no existe.");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			compras = this.servicio.findComprasCliente(id);
		} 
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar consulta a base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (compras.isEmpty()) {
			response.put("mensaje", "El cliente con ID: " + id.toString() + " no tiene ninguna compra.");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<List<Compra>>(compras, HttpStatus.OK);
	}
}




