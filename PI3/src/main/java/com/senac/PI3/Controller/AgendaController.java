package com.senac.PI3.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.PI3.Service.AgendaService;
import com.senac.PI3.entities.Agenda;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("agenda")
public class AgendaController {
    @Autowired
    private AgendaService agendaService;

    @GetMapping
    public ResponseEntity<List<Agenda>> getAll() {
        return ResponseEntity.ok().body(agendaService.getAll());
    };

    @GetMapping(value = "/{id}")
    public ResponseEntity<Agenda> getById(@PathVariable long id) {
        return ResponseEntity.ok().body(agendaService.getById(id));
    };

    @PostMapping
    public ResponseEntity<Agenda> createAgenda(Agenda novaAgenda) {
        return ResponseEntity.status(HttpStatus.CREATED).body(agendaService.create(novaAgenda));
    };

    @PutMapping
    public ResponseEntity<Agenda> updateAgenda(@PathVariable long id, Agenda agenda) {
        agenda.setId(id); // apenas para ter certeza que é o id certo que será atualizado
        Agenda agendaAtualizada = agendaService.updateAgenda(agenda);
        return ResponseEntity.ok(agendaAtualizada);
    };

    @DeleteMapping
    public ResponseEntity<Void> deleteCliente(@PathVariable long id) {
        agendaService.delete(id);
        return ResponseEntity.noContent().build();
    };

};
