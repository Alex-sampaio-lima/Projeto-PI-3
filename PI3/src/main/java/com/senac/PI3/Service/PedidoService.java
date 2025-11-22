package com.senac.PI3.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.senac.PI3.Repository.ClienteRepository;
import com.senac.PI3.Repository.PedidoRepository;
import com.senac.PI3.entities.Cliente;
import com.senac.PI3.entities.Pedido;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private AuthenticationService authenticationService;

    // Cliente - Pedido
    public List<Pedido> getMeusPedidos() {
        int clienteId = getCurrentClientId();
        return pedidoRepository.findByClienteId(clienteId);
    }

    // Criar Pedido USER
    // public Pedido createPedidoUser(Pedido pedido, int clientId) {
    //     Cliente cliente = clienteRepository.findById(clientId).orElseThrow(() -> new RuntimeException("Cliente não localizado !"));
    //     System.out.println("Pedido criado =" + pedido.getNomeProduto());
    //     validatePedidoAccess(pedido);
    //     pedido.setCliente(cliente);
    //     if (pedido.getDataPedido() == null) {
    //         pedido.setDataPedido(LocalDate.now());
    //     }
    //     return pedidoRepository.save(pedido);
    // }
    // CRUD 
    // Listar Todos Pedidos
    public List<Pedido> getAll() {
        if (isAdmin()) {
            System.out.println("Usuário é ADMIN - retornando todos os pedidos");
            return pedidoRepository.findAll();
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("CONTROLLER - Usuário: " + auth.getName());
        System.out.println("CONTROLLER - Roles: " + auth.getAuthorities());

        int clienteId = getCurrentClientId();
        System.out.println("Usuário é CLIENTE - retornando apenas pedidos do cliente ID: " + clienteId);
        return pedidoRepository.findByClienteId(clienteId);
    }

    // Listar por ID
    public Pedido getById(int id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado !"));
        validatePedidoAccess(pedido);
        return pedido;
    }

    // Criar Pedido
    public Pedido create(Pedido pedido, int clientId) {

        Cliente cliente = clienteRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Cliente não localizado !"));

        System.out.println("Pedido criado =" + pedido.getNomeProduto());

        
        pedido.setCliente(cliente);
        
        validatePedidoAccess(pedido);
        if (pedido.getDataPedido() == null) {
            pedido.setDataPedido(LocalDate.now());
        }

        return pedidoRepository.save(pedido);
    }

    // Atualizar Pedido
    @SuppressWarnings("null")
    public Pedido update(Pedido pedido) {
        Pedido pedidoExistente = pedidoRepository.findById(pedido.getId())
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado !"));

        validatePedidoAccess(pedidoExistente);

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
    }

    // Excluir Pedido
    @SuppressWarnings("null")
    public void delete(int id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não localizado !"));

        // Verifica se o usuário tem acesso a este pedido
        validatePedidoAccess(pedido);

        pedidoRepository.delete(pedido);
    }

    // Métodos
    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("DEBUG: Usuário não autenticado");
            return false;
        }

        System.out.println("DEBUG isAdmin() - Usuário: " + authentication.getName());
        System.out.println("DEBUG isAdmin() - Roles: " + authentication.getAuthorities());

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

        System.out.println("DEBUG isAdmin() - Resultado: " + isAdmin);
        return isAdmin;
    }

    private int getCurrentClientId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Cliente cliente = clienteRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        return cliente.getId();
    }

    private void validatePedidoAccess(Pedido pedido) {
        // Admin tem acesso a tudo
        if (isAdmin()) {
            return;
        }

        // Cliente só tem acesso aos próprios pedidos
        int idClienteAtual = getCurrentClientId();
        if (pedido.getCliente().getId() != idClienteAtual) {
            throw new org.springframework.security.access.AccessDeniedException("Acesso negado. Você só pode acessar seus próprios pedidos.");
        }
    }
};
