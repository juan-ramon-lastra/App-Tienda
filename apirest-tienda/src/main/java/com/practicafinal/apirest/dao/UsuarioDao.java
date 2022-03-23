package com.practicafinal.apirest.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.practicafinal.apirest.entity.Usuario;

@Repository
public interface UsuarioDao extends CrudRepository<Usuario, Long> {

	public Usuario findByUsername(String username); 
}
