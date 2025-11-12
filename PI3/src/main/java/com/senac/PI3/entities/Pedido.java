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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tb_pedido")
public class Pedido implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @NotBlank(message = "Nome do cliente é obrigatório")
    @Size(max = 255)
    private String nomeCliente;

    @NotBlank(message = "Nome do Produto não pode ser nulo")
    @Size(max = 255)
    private String nomeProduto;

    private double valorTotal;

    private LocalDate dataPedido;

    @ManyToOne
    @JoinColumn(name = "agenda_id")
    private Agenda agenda;

};
