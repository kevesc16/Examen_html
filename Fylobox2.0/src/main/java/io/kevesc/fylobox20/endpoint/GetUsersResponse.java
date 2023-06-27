package io.kevesc.fylobox20.endpoint;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUsersResponse {
    private List<User> users;

    public void setUsers(List<User> listUsers) {
    }
}
