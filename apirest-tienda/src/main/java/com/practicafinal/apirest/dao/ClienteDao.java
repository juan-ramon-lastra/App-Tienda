package com.practicafinal.apirest.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.practicafinal.apirest.entity.Cliente;
import com.practicafinal.apirest.entity.Compra;

@Repository
public interface ClienteDao extends CrudRepository<Cliente, Long> {
	
	@Query("from Compra")
	public List<Compra> findAllCompras();
}
