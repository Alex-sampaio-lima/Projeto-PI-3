package com.senac.PI3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senac.PI3.Repository.AgendaRepository;
import com.senac.PI3.entities.Agenda;

@Service
public class AgendaService {
    @Autowired
    private AgendaRepository agendaRepository;

    public Agenda create(Agenda blog) {
        return agendaRepository.save(blog);
    }

    public List<Agenda> getAll() {
        return agendaRepository.findAll();
    };

    public Agenda getById(long id) {
        Optional<Agenda> agenda = agendaRepository.findById(id);
        return agenda.get();
    };

    public void delete(long id) {
        Agenda agenda = agendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agenda não encontrada !"));
        agendaRepository.delete(agenda);
    };

};
