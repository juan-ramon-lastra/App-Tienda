package com.practicafinal.apirest.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.practicafinal.apirest.entity.Compra;

@Repository
public interface CompraDao extends CrudRepository<Compra, Long> {

}
