package com.practicafinal.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practicafinal.apirest.dao.ProductoDao;
import com.practicafinal.apirest.entity.Producto;

@Service
public class ProductoServiceImpl implements ProductoService {

	@Autowired
	private ProductoDao productoDao;
	
	@Override
	@Transactional(readOnly=true)
	public List<Producto> findAll() {
		return (List<Producto>) this.productoDao.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Producto findById(Long id) {
		return this.productoDao.findById(id).orElse(null);
	}

	@Override
	@Transactional()
	public Producto save(Producto producto) {
		return this.productoDao.save(producto);
	}

	@Override
	@Transactional()
	public void delete(Long id) {
		this.productoDao.deleteById(id);
	}

}

