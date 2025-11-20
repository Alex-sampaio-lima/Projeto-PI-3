package com.senac.PI3.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.PI3.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Boolean existsByEmail(String email);
    Optional<Cliente> findByEmail(String email);
}
