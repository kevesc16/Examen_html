package io.kevesc.fylobox20.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import io.kevesc.fylobox20.endpoint.User;
import io.kevesc.fylobox20.repository.UserRepository;
import io.kevesc.fylobox20.repository.model.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<User> getListUsers() {
        List<UserEntity> all = (List<UserEntity>)userRepository.findAll();
        List<User> users = new ArrayList<>();
        for(UserEntity ue: all){
            User user = new User();
            user.setId(ue.getId());
            user.setUsername(ue.getUsername());
            user.setPassword(ue.getPassword());
            user.setEmail(ue.getEmail());
            users.add(user);
        }
        return users;
    }

    public User getUserById(int id) {

        Optional<UserEntity> byId = userRepository.findById(id);

        boolean present = byId.isPresent();
        if(present){
            UserEntity ue = byId.get();
            User user = new User();
            user.setId(ue.getId());
            user.setUsername(ue.getUsername());
            user.setPassword(ue.getPassword());
            user.setEmail(ue.getEmail());
            return user;
        }

        return null;
    }

    public int addUser(User user) {
        //Optional<UserEntity> ByUserEntity= userRepository.findById(updateUserById());
        //boolean present = ByUserEntity.isPresent();
        //if(present){


        List<User> users = getListUsers();
        int id = users.size() + 1;
        user.setId(id);
        users.add(user);
        return id;
    }

    public User deleteUserById(int id) {
        List<User> users = getListUsers();
        for (User user : users) {
            if (user.getId() == id) {
                users.remove(user);
                return user;
            }
        }
        return null;
    }

    public User updateUserById(int id, User modifiedUser) {
        List<User> users = getListUsers();
        for (User user : users) {
            if (user.getId() == id) {
                user.setPassword(modifiedUser.getPassword());
                user.setUsername(modifiedUser.getUsername());
                user.setEmail(modifiedUser.getEmail());
                return user;
            }
        }
        return null;
    }

}
