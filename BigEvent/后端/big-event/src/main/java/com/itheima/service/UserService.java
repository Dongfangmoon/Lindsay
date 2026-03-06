package com.itheima.service;

import com.itheima.pojo.User;
import org.springframework.stereotype.Service;

@Service

public interface UserService {

    // 根据用户名查找用户
    User findByUsername(String username);

    // 注册
    void register(String username, String password);

    // 更新
    void update(User user);

    // 更新头像
    void updateAvatar(String avatarUrl);

    void updatePwd(String newPwd);
}
