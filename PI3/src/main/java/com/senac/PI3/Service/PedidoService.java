package com.senac.PI3.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senac.PI3.Repository.AgendaRepository;
import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.Repository.PedidoRepository;
import com.senac.PI3.entities.Agenda;
import com.senac.PI3.entities.Cliente;
import com.senac.PI3.entities.Pedido;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private AgendaRepository agendaRepository;

    // public Pedido create(Pedido pedido, long clientId, long agendaId) {
    // List<Pedido> pedidosAtuais = null;

    // Cliente cliente = clienteRepository.findById(clientId)
    // .orElseThrow(() -> new RuntimeException("Cliente não localizado !"));

    // System.out.println("Pedido criado =" + pedido.getNomeProduto());

    // Agenda agenda = agendaRepository.findById(agendaId)
    // .orElseGet(() -> {
    // Agenda novaAgenda = new Agenda();
    // novaAgenda.setCliente(cliente);
    // return agendaRepository.save(novaAgenda);
    // });

    // if (agenda.getPedidos() != null) {
    // pedidosAtuais = agenda.getPedidos();
    // } else {
    // pedidosAtuais = new ArrayList<>();
    // }

    // System.out.println(pedidosAtuais);
    // System.out.println(agenda.getPedidos());

    // System.out.println("---------------------");
    // System.out.println(pedido);
    // System.out.println(pedidosAtuais);
    // System.out.println("---------------------");
    // pedidosAtuais.add(pedido);
    // pedido.setCliente(cliente);
    // pedido.setAgenda(agenda);

    // agenda.setPedidos(pedidosAtuais);

    // agenda.setPedidos(pedidosAtuais);

    // if (pedido.getDataPedido() == null) {
    // pedido.setDataPedido(LocalDate.now());
    // }

    // return pedidoRepository.save(pedido);
    // };

    public Pedido create(Pedido pedido, long clientId, long agendaId) {
        Cliente cliente = clienteRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Cliente não localizado !"));

        Agenda agenda = agendaRepository.findById(agendaId)
                .orElseGet(() -> {
                    Agenda novaAgenda = new Agenda();
                    novaAgenda.setCliente(cliente);
                    return agendaRepository.save(novaAgenda);
                });

        // Configura as relações
        pedido.setCliente(cliente);
        pedido.setAgenda(agenda);

        if (pedido.getDataPedido() == null) {
            pedido.setDataPedido(LocalDate.now());
        }

        // Salva o pedido
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        // Atualiza a lista da agenda (se necessário para outras operações)
        if (agenda.getPedidos() == null) {
            agenda.setPedidos(new ArrayList<>());
        }
        agenda.getPedidos().add(pedidoSalvo);
        agendaRepository.save(agenda);

        return pedidoSalvo;
    }

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
