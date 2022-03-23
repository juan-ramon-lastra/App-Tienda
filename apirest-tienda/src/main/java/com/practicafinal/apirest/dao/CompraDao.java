package com.practicafinal.apirest.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.practicafinal.apirest.entity.Compra;
import com.practicafinal.apirest.entity.Producto;

@Repository
public interface CompraDao extends CrudRepository<Compra, Long> {

	@Query("from Producto")
	public List<Producto> findAllProductos();
}
