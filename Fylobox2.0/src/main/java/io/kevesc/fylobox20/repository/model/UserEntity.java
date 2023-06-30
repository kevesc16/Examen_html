package io.kevesc.fylobox20.repository.model;


import javax.persistence.*;



import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "users")
@Getter
@Setter
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Integer id;

    @Column(name = "nombre", updatable = true, nullable = false, length = 30)
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 30)
    private String apellido;

    @Column(name = "genero", nullable = false, length = 30)
    private String genero;

    @Column(name = "correo",updatable = true, nullable = false, length = 30)
    private String correo;

    @Column(name = "telefono", nullable = true, length = 100)
    private String telefono;

    @Column(name = "usuario", nullable = false, length = 100)
    private String usuario;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    /*@ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;*/
}


