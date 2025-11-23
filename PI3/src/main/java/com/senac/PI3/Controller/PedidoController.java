package com.senac.PI3.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.Service.PedidoService;
import com.senac.PI3.entities.Cliente;
import com.senac.PI3.entities.Pedido;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("pedido")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private ClienteRepository clienteRepository;

    // Cliente - Pedido
    // Lista todos os pedidos do cliente
    @GetMapping("/meus-pedidos")
    public ResponseEntity<List<Pedido>> getMeusPedidos() {
        List<Pedido> pedidos = pedidoService.getMeusPedidos();
        return ResponseEntity.ok().body(pedidos);
    }

    // CRUD 
    // Listar Todos Pedidos
    @GetMapping
    public ResponseEntity<List<Pedido>> getAll() {
        return ResponseEntity.ok().body(pedidoService.getAll());
    }

    // Listar Pedidos por ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Pedido> getId(@PathVariable int id) {
        return ResponseEntity.ok().body(pedidoService.getById(id));
    }

    // Criar Pedidos 
    // @PostMapping(value = "/{id}")
    @PostMapping()
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido novoPedido, Authentication authentication) {
        String username = authentication.getName();
        Cliente cliente = clienteRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("Cliente não encontrado !"));
        Pedido pedido = new Pedido();

        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            // ADMIN: Pode criar pedido para qualquer cliente
            // Se o novoPedido já veio com cliente, usa esse, senão usa o próprio
            if (novoPedido.getCliente() != null && novoPedido.getCliente().getId() > 0) {
                cliente = clienteRepository.findById(novoPedido.getCliente().getId())
                        .orElseThrow(() -> new RuntimeException("Cliente não encontrado !"));
            } else {
                // Se admin não especificou cliente, cria para si mesmo
                cliente = clienteRepository.findByEmail(username)
                        .orElseThrow(() -> new RuntimeException("Cliente não encontrado !"));
            }
        } else {
            // CLIENTE: Só pode criar pedido para si mesmo
            cliente = clienteRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado !"));
        }
        pedido.setNomeProduto(novoPedido.getNomeProduto());
        pedido.setFormaPagamento(novoPedido.getFormaPagamento());
        pedido.setStatus(novoPedido.getStatus());
        pedido.setObservacoes(novoPedido.getObservacoes());
        pedido.setValorTotal(novoPedido.getValorTotal());
        pedido.setDataPedido(novoPedido.getDataPedido());

        // pedido.setCliente(cliente);
        // System.out.println("CLIENTE EM SI " + pedido.getCliente().getEmail());
        Pedido pedidoCriado = pedidoService.create(pedido, cliente.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoCriado);
    }

    // Atualizar Pedidos
    @PutMapping(value = "/{id}")
    public ResponseEntity<Pedido> updatePedido(@PathVariable int id, @RequestBody Pedido pedido) {
        pedido.setId(id); // Aqui estou garantindo que o id certo será atualizado
        Pedido pedidoAtualizado = pedidoService.update(pedido);
        return ResponseEntity.ok(pedidoAtualizado);
    }

    // Deletar Pedidos
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable int id) {
        pedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }

};
