package com.practicafinal.apirest.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practicafinal.apirest.dao.CompraDao;
import com.practicafinal.apirest.entity.Compra;
import com.practicafinal.apirest.entity.Producto;

@Service
public class CompraServiceImpl implements CompraService {

	@Autowired
	private CompraDao compraDao;
	
	@Override
	@Transactional(readOnly=true)
	public List<Compra> findAll() {
		return (List<Compra>) this.compraDao.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Compra findById(Long id) {
		return this.compraDao.findById(id).orElse(null);
	}

	@Override
	@Transactional()
	public Compra save(Compra compra) {
		return this.compraDao.save(compra);
	}

	@Override
	@Transactional()
	public void delete(Long id) {
		this.compraDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly=true)
	public List<Producto> findProductosCompra(Long id) {
		List<Producto> productos = this.compraDao.findAllProductos();
		List<Producto> productos_compra = new ArrayList<Producto>();
		for (Producto p : productos) {
			if (p.getCompra().getId().equals(id)) {
				productos_compra.add(p);
			}
		}
		return productos_compra;
	}

}

