package com.senac.PI3.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "tb_agenda")
public class Agenda implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private List<Pedido> pedidos = new ArrayList();

    public void setPedidos( List<Pedido> pedidos ){
        this.pedidos.addAll(pedidos);
    }

    // Relacionamento: Uma agenda pertence a 1 cliente (1:1)
    @OneToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
};
