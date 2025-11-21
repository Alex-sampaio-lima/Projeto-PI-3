package com.senac.PI3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //             .authorizeHttpRequests(authz -> authz
    //             // ✅ PERMITE TUDO - REMOVA DEPOIS!
    //             .anyRequest().permitAll()
    //             )
    //             .csrf(csrf -> csrf.disable())
    //             .headers(headers -> headers
    //             .frameOptions(frame -> frame.disable())
    //             );
    //     return http.build();
    // }
    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //             .authorizeHttpRequests(authz -> authz
    //             // H2 Console - vou deixar o acesso livre
    //             .requestMatchers("/h2-console/**").permitAll()
    //             // CLIENTES - Admin pode tudo, usuário só acessa próprio perfil
    //             .requestMatchers("/clientes", "/clientes/").hasRole("ADMIN") // Listar todos clientes - só ADMIN
    //             .requestMatchers(HttpMethod.POST, "/clientes").permitAll() // Cadastro aberto
    //             .requestMatchers(HttpMethod.PUT, "/clientes/**").authenticated() // Validação no service
    //             .requestMatchers(HttpMethod.DELETE, "/clientes/**").hasRole("ADMIN") // Deletar - só ADMIN
    //             .requestMatchers(HttpMethod.GET, "/clientes/**").authenticated() // Validação no service
    //             // PEDIDOS - Clientes podem criar e ver seus pedidos
    //             .requestMatchers(HttpMethod.POST, "/pedidos").authenticated() // Cliente cria pedido
    //             .requestMatchers(HttpMethod.GET, "/pedidos/meus-pedidos").authenticated() // Cliente vê seus pedidos
    //             .requestMatchers(HttpMethod.GET, "/pedidos").hasRole("ADMIN") // Listar todos pedidos - só ADMIN
    //             .requestMatchers(HttpMethod.GET, "/pedidos/**").authenticated() // Validação no service
    //             .requestMatchers(HttpMethod.PUT, "/pedidos/**").hasRole("ADMIN") // Editar pedidos - só ADMIN
    //             // ADMIN - Apenas administradores
    //             .requestMatchers("/admin/**").hasRole("ADMIN")
    //             // Demais requisições - autenticadas
    //             // .anyRequest().authenticated()
    //             )
    //             // .formLogin()
    //             // .httpBasic()
    //             // Configurações para H2
    //             .csrf(csrf -> csrf
    //             .ignoringRequestMatchers("/h2-console/**")
    //             )
    //             .headers(headers -> headers
    //             .frameOptions(frame -> frame.disable())
    //             );
    //     return http.build();
    // }
    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //             .authorizeHttpRequests(authz -> authz
    //             .requestMatchers("/h2-console/**").permitAll()
    //             .requestMatchers("/auth/**").permitAll() // Permite endpoints de autenticação
    //             // Clientes
    //             .requestMatchers("/cliente/registrar").permitAll() // Cadastro aberto
    //             .requestMatchers(HttpMethod.GET, "/cliente").hasRole("ADMIN") // Só admin pode ver todos clientes
    //             .requestMatchers(HttpMethod.POST, "/cliente").hasRole("ADMIN") // Só admin cria clientes
    //             .requestMatchers(HttpMethod.PUT, "/cliente/**").authenticated()
    //             .requestMatchers(HttpMethod.DELETE, "/cliente/**").hasRole("ADMIN")
    //             .requestMatchers(HttpMethod.GET, "/cliente/**").authenticated()
    //             // Pedidos
    //             .requestMatchers(HttpMethod.POST, "/pedido").authenticated() // Cliente cria pedido
    //             .requestMatchers(HttpMethod.GET, "/pedido/meus-pedido").authenticated() // Cliente vê seus pedidos
    //             .requestMatchers(HttpMethod.GET, "/pedido").hasRole("ADMIN") // Listar todos pedidos - só ADMIN
    //             .requestMatchers(HttpMethod.GET, "/pedido/**").authenticated() // Validação no service
    //             .requestMatchers(HttpMethod.PUT, "/pedido/**").hasRole("ADMIN") // Editar pedidos - só ADMIN
    //             .anyRequest().authenticated()
    //             )
    //             .formLogin(form -> form
    //             .loginPage("/login")
    //             .loginProcessingUrl("/auth/login") // Endpoint para login
    //             .defaultSuccessUrl("/cliente/meu-perfil", true)
    //             .permitAll()
    //             )
    //             .logout(logout -> logout
    //             .logoutUrl("/auth/logout")
    //             .logoutSuccessUrl("/login?logout")
    //             .permitAll()
    //             )
    //             .csrf(csrf -> csrf
    //             .ignoringRequestMatchers("/h2-console/**", "/auth/**")
    //             )
    //             .headers(headers -> headers
    //             .frameOptions(frame -> frame.disable())
    //             );
    //     return http.build();
    // }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((var authz) -> authz
                // CLIENTES - CONFORME SUAS REGRAS
                .requestMatchers(HttpMethod.GET, "/cliente").hasRole("ADMIN") // Listar todos - só ADMIN
                .requestMatchers(HttpMethod.GET, "/cliente/**").authenticated() // Listar específico - validação no service
                .requestMatchers(HttpMethod.POST, "/cliente").hasRole("ADMIN") // Criar - só ADMIN
                .requestMatchers(HttpMethod.PUT, "/cliente/**").authenticated() // Atualizar - validação no service
                .requestMatchers(HttpMethod.DELETE, "/cliente/**").authenticated() // Deletar - validação no service

                // PEDIDOS - CONFORME SUAS REGRAS
                .requestMatchers(HttpMethod.GET, "/pedido").hasRole("ADMIN") // Listar todos - só ADMIN
                .requestMatchers(HttpMethod.GET, "/pedido/**").authenticated() // Listar próprio - validação no service
                .requestMatchers(HttpMethod.POST, "/pedido").authenticated() // Criar - só usuário logado
                .requestMatchers(HttpMethod.PUT, "/pedido/**").authenticated() // Atualizar - validação no service
                .requestMatchers(HttpMethod.DELETE, "/pedido/**").authenticated() // Deletar - validação no service

                .anyRequest().permitAll()
                )
                .httpBasic(withDefaults())
                .csrf(csrf -> csrf.disable()) // DESABILITA CSRF COMPLETAMENTE
                .headers(headers -> headers
                .frameOptions(frame -> frame.disable())
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
};
