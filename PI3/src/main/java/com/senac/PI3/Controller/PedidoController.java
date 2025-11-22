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

import com.senac.PI3.Service.PedidoService;
import com.senac.PI3.entities.Pedido;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("pedido")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

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
    @PostMapping
    public ResponseEntity<Pedido> newPedido(@RequestBody Pedido novoPedido) {
        Pedido pedido = new Pedido();

        pedido.setNomeProduto(novoPedido.getNomeProduto());
        pedido.setValorTotal(novoPedido.getValorTotal());
        pedido.setDataPedido(novoPedido.getDataPedido());

        System.out.println("ID DO CLIENTE = " + novoPedido.getCliente().getId());

        Pedido pedidoCriado = pedidoService.create(pedido, novoPedido.getCliente().getId());

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
