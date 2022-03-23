package com.practicafinal.apirest.service;

import java.util.List;

import com.practicafinal.apirest.entity.Compra;
import com.practicafinal.apirest.entity.Producto;

public interface CompraService {

	public List<Compra> findAll();
	
	public Compra findById(Long id);
	
	public Compra save(Compra compra);
	
	public void delete(Long id);
	
	public List<Producto> findProductosCompra(Long id);
}
