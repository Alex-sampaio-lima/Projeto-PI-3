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

    @Autowired
    private AuthenticationService authenticationService;

    // Cadastro - Login - Autenticação
    public Cliente registrar(Cliente cliente) {
        if (clienteRepository.existsByEmail(cliente.getEmail())) {
            throw new RuntimeException("Email já cadastrado!");
        }

        cliente.setEmail(cliente.getEmail());
        cliente.setSenha(cliente.getSenha());
        cliente.setRole(Cliente.UserRole.USER);

        return clienteRepository.save(cliente);
    }

    public Cliente atualizarPerfil(Cliente cliente) {
        Cliente clienteExistente = clienteRepository.findById(cliente.getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        if (cliente.getNome() != null) {
            clienteExistente.setNome(cliente.getNome());
        }
        if (cliente.getEmail() != null) {
            clienteExistente.setEmail(cliente.getEmail());
        }
        if (cliente.getSenha() != null && !cliente.getSenha().isEmpty()) {
            clienteExistente.setSenha(cliente.getSenha());
        }
        if (cliente.getTelefone() != null) {
            clienteExistente.setTelefone(cliente.getTelefone());
        }
        if (cliente.getCpf() != null) {
            clienteExistente.setCpf(cliente.getCpf());
        }

        return clienteRepository.save(clienteExistente);
    }

    // CRUD - Cliente
    public Cliente create(Cliente cliente) {
        if (cliente == null) {
            throw new RuntimeException("Cliente não encontrado !");
        }
        authenticationService.validateAdminAccess();
        return clienteRepository.save(cliente);
    }

    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    public Cliente getById(int id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.get();
    }

    public Cliente buscarUsuarioPorEmail(String email) {
        return clienteRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email não localizado !"));
    }

    public Cliente update(Cliente cliente) {
        Cliente clienteExistente = clienteRepository.findById(cliente.getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        // Nesta parte do código ele verifica se os atributos que estão sendo passados
        // por parametro não são nulos, se não forem ele troca o que está sendo passado
        // por parametro pelo o que está no banco de dados

        if (cliente.getEmail() != null) {
            clienteExistente.setEmail(cliente.getEmail());
        }
        if (cliente.getSenha() != null) {
            clienteExistente.setSenha(cliente.getSenha());
        }
        if (cliente.getTelefone() != null) {
            clienteExistente.setTelefone(cliente.getTelefone());
        }
        if (cliente.getCpf() != null) {
            clienteExistente.setCpf(cliente.getCpf());
        }
        System.out.println("Cliente Existente = " + clienteExistente.toString());
        System.out.println("Cliente = " + cliente.toString());

        return clienteRepository.save(cliente);
    }

    @SuppressWarnings("null")
    public void delete(int id) {

        authenticationService.validateAdminAccess();

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado !"));
        clienteRepository.delete(cliente);
    }

};
