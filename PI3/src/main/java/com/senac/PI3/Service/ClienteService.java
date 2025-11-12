package com.senac.PI3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.entities.Cliente;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente create(Cliente cliente) {
        return clienteRepository.save(cliente);
    };

    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    };

    public Cliente getById(long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.get();
    };

    public Cliente update(Cliente cliente) {
        Cliente clienteExistente = clienteRepository.findById(cliente.getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        if (cliente.getNome() != null) {
            clienteExistente.setNome(cliente.getNome());
        }
        if (cliente.getEmail() != null) {
            clienteExistente.setEmail(cliente.getEmail());
        }
        if (clienteExistente.getSenha() != null) {
            clienteExistente.setSenha(cliente.getSenha());
        }
        if (clienteExistente.getTelefone() != null) {
            clienteExistente.setTelefone(cliente.getTelefone());
        }
        if (clienteExistente.getCpf() != null) {
            clienteExistente.setCpf(cliente.getCpf());
        }

        return clienteRepository.save(clienteExistente);
    };

};
