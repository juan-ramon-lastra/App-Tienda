package com.practicafinal.apirest.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practicafinal.apirest.dao.ClienteDao;
import com.practicafinal.apirest.entity.Cliente;
import com.practicafinal.apirest.entity.Compra;

@Service
public class ClienteServiceImpl implements ClienteService {

	@Autowired
	private ClienteDao clienteDao;
	
	@Override
	@Transactional(readOnly=true)
	public List<Cliente> findAll() {
		return (List<Cliente>) this.clienteDao.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Cliente findById(Long id) {
		return this.clienteDao.findById(id).orElse(null);
	}

	@Override
	@Transactional()
	public Cliente save(Cliente cliente) {
		return this.clienteDao.save(cliente);
	}

	@Override
	@Transactional()
	public void delete(Long id) {
		this.clienteDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly=true)
	public List<Compra> findComprasCliente(Long id) {
		List<Compra> compras = this.clienteDao.findAllCompras();
		List<Compra> compras_cliente = new ArrayList<Compra>();
		for (Compra c : compras) {
			if (c.getCliente().getId().equals(id)) {
				compras_cliente.add(c);
			}
		}
		return compras_cliente;
	}

}

