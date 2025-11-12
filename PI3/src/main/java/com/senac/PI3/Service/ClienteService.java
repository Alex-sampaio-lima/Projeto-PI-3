package com.senac.PI3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.entities.Cliente;

public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente create(Cliente cliente) {
        return clienteRepository.save(cliente);
    };

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    };

    public Cliente findById(long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.get();
    };

    public Cliente update(Cliente cliente) {
        Optional<Cliente> novoCliente = clienteRepository.findById(cliente.getId());
        updateCliente(novoCliente, cliente);
        return clienteRepository.save(novoCliente.get());
    };

    public void updateCliente(Optional<Cliente> novoCliente, Cliente cliente) {
        if (novoCliente.isPresent()) {
            Cliente clienteExistente = novoCliente.get();
            clienteExistente.setNome(cliente.getNome());
            clienteExistente.setEmail(cliente.getEmail());
            clienteExistente.setSenha(cliente.getSenha());
            clienteExistente.setTelefone(cliente.getTelefone());
            clienteExistente.setCpf(cliente.getCpf());

            clienteRepository.save(clienteExistente);
        }
    };

};
