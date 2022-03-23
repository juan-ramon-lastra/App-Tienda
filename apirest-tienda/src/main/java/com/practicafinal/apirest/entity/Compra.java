package com.practicafinal.apirest.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "compras")
public class Compra implements Serializable {

	/** */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cliente_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Cliente cliente;
	
	@Column(name = "fecha_compra", unique = true)
	@Temporal(TemporalType.DATE)
	private Date fecha = new Date();
	
	@PrePersist
	public void prePersist() {
		if (fecha.equals(null)) {
			fecha = new Date();
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFecha_compra() {
		return fecha;
	}

	public void setFecha_compra(Date fecha_compra) {
		this.fecha = fecha_compra;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	
}



