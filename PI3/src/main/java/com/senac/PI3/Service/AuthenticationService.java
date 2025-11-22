package com.senac.PI3.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.entities.Cliente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Service
public class AuthenticationService {

    @Autowired
    ClienteRepository clienteRepository;

    public void validateAdminAccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Usuário não autenticado !");
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));

        if (!isAdmin) {
            throw new AccessDeniedException("Acesso negado. Apenas administradores podem realizar esta ação.");
        }

    }

    public void validateUserAccess(int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Usuário não autenticado !");
        }

        // DEBUG: Ver quais authorities estão presentes
        System.out.println("=== DEBUG Authorities ===");
        authentication.getAuthorities().forEach(authority -> {
            System.out.println("Authority: " + authority.getAuthority());
        });
        System.out.println("=========================");

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));

        if (isAdmin) {
            return;
        }

        String userName = authentication.getName();

        Cliente cliente = clienteRepository.findByEmail(userName).orElseThrow(() -> new AccessDeniedException("Usuário não encontrado !"));

        int idUsuarioAtual = cliente.getId();

        // Se não for ADMIN, só pode acessar o próprio perfil
        if (idUsuarioAtual != id) {
            throw new AccessDeniedException("Acesso negado. Você só pode acessar seu próprio perfil.");
        }
    }
};
