package com.practicafinal.apirest.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.practicafinal.apirest.entity.Producto;

@Repository
public interface ProductoDao extends CrudRepository<Producto, Long> {

}
