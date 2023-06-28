package io.kevesc.fylobox20.repository.model;


import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "movies")
@Getter
@Setter
public class MoviesEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id", updatable = false, nullable = false)
        private Integer id;

        @Column(name = "name", updatable = false, nullable = false, length = 30)
        private String name;

        @ManyToMany
        @JoinColumn(name = "vents_id")
        private List<VentsEntity> vents;
}
