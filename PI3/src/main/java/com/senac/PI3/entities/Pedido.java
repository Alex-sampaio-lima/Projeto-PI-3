package com.senac.PI3.entities;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
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
@Table(name = "tb_pedido")
public class Pedido implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Size(max = 255)
    private String nomeProduto;

    private double valorTotal;

    private LocalDate dataPedido;

    // Um pedido pertence a um cliente (N:1)
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    // Um pedido pertence a uma agenda (N:1)
    @ManyToOne
    @JoinColumn(name = "agenda_id")
    @Valid
    private Agenda agenda;

};
