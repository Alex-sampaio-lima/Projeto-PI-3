package com.senac.PI3.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.PI3.entities.Agenda;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

};
