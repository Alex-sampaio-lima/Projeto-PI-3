package com.senac.PI3.entities;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(of = "id")

@Entity
@Table(name = "tb_cliente")
public class Cliente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false)
    @Size(max = 255)
    private String nome;

    @NotBlank(message = "O E-mail é obrigatório")
    @Column(nullable = false)
    @Size(max = 255)
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Column(nullable = false)
    @Size(max = 255)
    private String senha;

    private String telefone;

    @NotBlank(message = "O CPF é obrigatório")
    @Column(nullable = false)
    private String cpf;

    // Um cliente pode ter muitas agendas
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Agenda> agendas;
};
