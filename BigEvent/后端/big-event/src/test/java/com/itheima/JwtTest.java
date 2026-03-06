package com.itheima;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtTest {
    /* JWT令牌:
       一、组成：
       1.Header头部(令牌类型和签名算法)
       2.Payload载荷(携带自定义信息，不能放敏感数据)
       3.Signature签名(对头部和载荷进行加密计算得来)
       二、使用：
       1.引入java-jwt坐标
       2.调用API生成和校验令牌
       3.解析令牌抛出异常，就证明令牌被篡改过或者已过期
    * */

    // 生成
    @Test
    public void testGen(){
        /* 注意事项：
           1.JWT校验时使用的签名密钥，必须和生成JWT令牌时使用的密钥是配套的
           2.JWT令牌中不能放敏感数据
           3.如果JWT令牌解析失败，则说明JWT令牌被篡改或者失效了，令牌非法
        * */
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", 1);
        claims.put("username", "张三");
        // 生成jwt代码
        String token = JWT.create()
                .withClaim("user", claims) // 添加载荷
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 设置过期时间
                .sign(Algorithm.HMAC256("itheima")); // 指定算法，配置密钥

        System.out.println(token);
    }

    // 验证
    @Test
    public void testParse(){
        // 1.如果篡改了头部和载荷部分的数据，那么验证就会失败
        // 2.如果密钥被修改了，那么验证就会失败
        // 3.如果token过期了，那么验证就会失败
        // 定义字符串，模拟用户传输过来的token
//        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
//                ".eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IuW8oOS4iSJ9LCJleHAiOjE3NjkwMDk2NjZ9" +
//                ".knnQo7UORPyOzlNv9RvNbdpqPNmmuYnAeKSeiZHhvG8";
//        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256("itheima")).build();
//
//        DecodedJWT decodedJWT = jwtVerifier.verify(token); // 验证token并生成一个解析后的JWT对象
//        Map<String, Claim> claims = decodedJWT.getClaims();
//        System.out.println(claims.get("user"));
    }

}
