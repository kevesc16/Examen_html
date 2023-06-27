package io.kevesc.fylobox20.endpoint;
import io.kevesc.fylobox20.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



import java.util.List;


@RestController
@RequiredArgsConstructor
public class UserController {
    final private UserService service;

    @GetMapping("/users")
    public ResponseEntity<GetUsersResponse> getUsers() {
        GetUsersResponse response = new GetUsersResponse();
        response.setUsers(service.getListUsers());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<GetUsersResponse> getUsers(@PathVariable("id") int id) {
        User userById = service.getUserById(id);
        if (userById != null) {
            GetUsersResponse response = new GetUsersResponse();
            response.setUsers((List<User>) userById);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/users")
    public ResponseEntity<PostResponse> post(@RequestBody User user) {
        int id = service.addUser(user);
        PostResponse response = new PostResponse();
        response.setId(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<PutResponse> put(@PathVariable("id") int id, @RequestBody User user){
        User updated = service.updateUserById(id, user);
        if (updated != null) {
            PutResponse response = new PutResponse();
            response.setUser(updated);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<DeleteResponse> delete(@PathVariable("id") int id) {
        User deleted = service.deleteUserById(id);
        if (deleted != null) {
            DeleteResponse response = new DeleteResponse();
            response.setUser(deleted);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

























}
