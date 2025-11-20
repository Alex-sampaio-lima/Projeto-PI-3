package com.senac.PI3.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.entities.Cliente;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    @Autowired
    private ClienteRepository clienteRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;
    
    @PostConstruct
    public void init() {
        criarAdminSeNaoExistir();
    }

    private void criarAdminSeNaoExistir() {
        if (!clienteRepository.existsByEmail("admin@email.com")) {
            Cliente admin = new Cliente();
            admin.setNome("Administrador");
            admin.setEmail("admin@email.com");
            // admin.setSenha(passwordEncoder.encode("123456"));
            admin.setSenha("123456");
            admin.setCpf("000.000.000-00");
            admin.setRole(Cliente.UserRole.ADMIN);

            clienteRepository.save(admin);
            System.out.println("✅ Usuário ADMIN criado: admin@email.com / 123456");
        }
    }
}
