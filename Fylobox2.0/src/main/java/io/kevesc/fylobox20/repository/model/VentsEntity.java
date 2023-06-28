package io.kevesc.fylobox20.repository.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "vents")
@Getter
@Setter
public class VentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Integer id;

    @Column(name = "price", updatable = false, nullable = false, length = 30)
    private int price;

    @ManyToMany
    @JoinColumn(name = "movies_id")
    private List<MoviesEntity>movies;


}
