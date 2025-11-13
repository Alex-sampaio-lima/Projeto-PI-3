package com.senac.PI3.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senac.PI3.Repository.PedidoRepository;
import com.senac.PI3.entities.Pedido;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido create(Pedido pedido) {
        return pedidoRepository.save(pedido);
    };

    public List<Pedido> getAll() {
        return pedidoRepository.findAll();
    };

    public Pedido getById(long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado !"));
        return pedido;
    };

    public Pedido update(Pedido pedido) {
        Pedido pedidoExistente = pedidoRepository.findById(pedido.getId())
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado !"));
        if (pedido.getNomeCliente() != null) {
            pedidoExistente.setNomeCliente(pedido.getNomeCliente());
        }
        if (pedido.getNomeProduto() != null) {
            pedidoExistente.setNomeProduto(pedido.getNomeProduto());
        }
        if (pedido.getValorTotal() != 0 && pedido.getValorTotal() != pedidoExistente.getValorTotal()) {
            pedidoExistente.setValorTotal(pedido.getValorTotal());
        }
        if (pedido.getDataPedido() != null) {
            pedidoExistente.setDataPedido(pedido.getDataPedido());
        }

        return pedidoRepository.save(pedidoExistente);
    };

    public void delete(long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não localizado !"));
        pedidoRepository.delete(pedido);
    };
};
