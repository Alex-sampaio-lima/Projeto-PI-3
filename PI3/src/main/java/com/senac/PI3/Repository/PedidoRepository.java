package com.senac.PI3.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.PI3.entities.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

};
