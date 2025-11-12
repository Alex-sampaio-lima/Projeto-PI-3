package com.senac.PI3.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.PI3.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

};
