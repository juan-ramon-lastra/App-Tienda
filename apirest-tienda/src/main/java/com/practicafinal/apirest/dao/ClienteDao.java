package com.practicafinal.apirest.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.practicafinal.apirest.entity.Cliente;

@Repository
public interface ClienteDao extends CrudRepository<Cliente, Long> {

}
