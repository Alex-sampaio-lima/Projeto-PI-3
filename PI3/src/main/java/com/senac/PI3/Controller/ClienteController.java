package com.senac.PI3.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.PI3.Service.AuthenticationService;
import com.senac.PI3.Service.ClienteService;
import com.senac.PI3.entities.Cliente;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private AuthenticationService authenticationService;

    // Seção de Cadastro - Login - Autenticação
    // Cadastro de Cliente
    @PostMapping("/registrar")
    public ResponseEntity<Cliente> registrarCliente(@RequestBody Cliente novoCliente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.registrar(novoCliente));
    }

    @GetMapping("/meu-perfil")
    public ResponseEntity<Cliente> getMeuPerfil() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Cliente cliente = clienteService.buscarUsuarioPorEmail(email);
        cliente.setSenha(null);

        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/meu-perfil")
    public ResponseEntity<Cliente> atualizarMeuPerfil(@RequestBody Cliente clienteAtualizado) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Cliente cliente = clienteService.buscarUsuarioPorEmail(email);
        clienteAtualizado.setId(cliente.getId());

        Cliente clienteSalvo = clienteService.atualizarPerfil(clienteAtualizado);
        clienteSalvo.setSenha(null);

        return ResponseEntity.ok(clienteSalvo);
    }

    // CRUD - Cliente
    // Listar Todos os Clientes
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Cliente>> getAll() {
        return ResponseEntity.ok().body(clienteService.getAll());
    }

    // Listar Cliente por ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Cliente> getId(@PathVariable int id) {
        authenticationService.validateUserAccess(id);
        return ResponseEntity.ok().body(clienteService.getById(id));
    }

    // Criar Cliente 
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Cliente> newCliente(@RequestBody Cliente novoCliente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(novoCliente));
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Cliente> updateCliente(@PathVariable int id, @RequestBody Cliente cliente) {
        cliente.setId(id); // Aqui estou garantindo que o id certo será atualizado
        Cliente clienteAtualizado = clienteService.update(cliente);
        return ResponseEntity.ok(clienteAtualizado);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable int id) {
        clienteService.delete(id);
        return ResponseEntity.noContent().build();
    }

};
