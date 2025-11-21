package com.senac.PI3.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.entities.Cliente;

import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getSenha()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Busca o cliente completo
            Cliente cliente = clienteRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

            System.out.println("🔍 Usuário encontrado: " + cliente.getEmail());
            System.out.println("🔍 Senha no banco: " + cliente.getSenha());
            System.out.println("🔍 Senha enviada: " + loginRequest.getSenha());

            // Retorna resposta JSON
            return ResponseEntity.ok(Map.of("message", "Login realizado com sucesso"));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of(
                    "error", "Credenciais inválidas",
                    "message", e.getMessage()
            ));
        }
    }

    // Classe para receber dados de login
    @Getter
    @Setter
    public static class LoginRequest {

        private String email;
        private String senha;

    }
}
