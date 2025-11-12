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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.PI3.Service.ClienteService;
import com.senac.PI3.entities.Cliente;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> getAll() {
        return ResponseEntity.ok().body(clienteService.getAll());
    };

    @GetMapping(value = "/{id}")
    public ResponseEntity<Cliente> getId(@PathVariable long id) {
        return ResponseEntity.ok().body(clienteService.getById(id));
    };

    @PostMapping
    public ResponseEntity<Cliente> newCliente(@RequestBody Cliente novoCliente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(novoCliente));
    };

    @PutMapping(value = "/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable long id, @RequestBody Cliente cliente) {
        cliente.setId(id); // Aqui estou garantindo que o id certo será atualizado
        Cliente clienteAtualizado = clienteService.update(cliente);
        return ResponseEntity.ok(clienteAtualizado);
    };

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable long id) {
        clienteService.delete(id);
        return ResponseEntity.noContent().build();
    };

};
