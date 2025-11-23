package com.senac.PI3.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.entities.Cliente;
import com.senac.PI3.entities.Cliente.UserRole;

import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
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

            // Cria resposta com dados do usuário
            LoginResponse response = new LoginResponse();
            response.setMessage("Login realizado com sucesso");
            response.setUser(new UserInfo(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getRole()));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of(
                    "error", "Credenciais inválidas",
                    "message", e.getMessage()
            ));
        }
    }

    @Getter
    @Setter
    public static class LoginResponse {

        private String message;
        private UserInfo user;
    }

    // Classe para receber dados de login
    @Getter
    @Setter
    public static class LoginRequest {

        private String email;
        private String senha;
    };

    @Getter
    @Setter
    public static class UserInfo {

        public UserInfo(int id, String nome, String email, UserRole role) {
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.role = role;
        }

        private int id;
        private String nome;
        private String email;
        private UserRole role;
    };

};
