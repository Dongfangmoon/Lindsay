package cn.easybuy.utils;

import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyBatisUtil {
	private static SqlSessionFactory factory;

	static {// 在静态代码块下,factory指挥被创建一次MyBatisUtil m = new MyBatisUtil();
		System.out.println("static factory===============");
		try {
			InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
			factory = new SqlSessionFactoryBuilder().build(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static SqlSession createSqlSession() {
		return factory.openSession(true);// true为自动提交事务
	}

	public static void closeSqlSession(SqlSession sqlSession) {
		if (null != sqlSession) {
			sqlSession.close();
		}
	}

}
