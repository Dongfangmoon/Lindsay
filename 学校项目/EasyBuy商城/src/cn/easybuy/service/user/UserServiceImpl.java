package cn.easybuy.service.user;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.junit.Test;

import cn.easybuy.dao.user.UserDao;
import cn.easybuy.dao.user.UserDaoImpl;
import cn.easybuy.entity.User;
import cn.easybuy.utils.DataSourceUtil;
import cn.easybuy.utils.MyBatisUtil;

public class UserServiceImpl implements UserService {

	private Logger logger = Logger.getLogger(UserServiceImpl.class);
	SqlSession sqlSession;
	User user;
	Integer count;
	Connection connection;

	@Test
	public void getUser() {
		sqlSession = null;
		user = null;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			UserDao userDao = sqlSession.getMapper(UserDao.class);
			user = userDao.getUser(12, "ck");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
		}
	}

	@SuppressWarnings("finally")
	@Override
	public User getUser(Integer userId, String loginName) {
		sqlSession = null;
		user = null;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			UserDao userDao = sqlSession.getMapper(UserDao.class);
			user = userDao.getUser(userId, loginName);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
			return user;
		}
	}

	@Test
	public void add() {
		sqlSession = null;
		count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			User user = new User();
			user.setLoginName("hh");
			user.setUserName("哈哈");
			user.setPassword("123456");
			user.setSex(0);
			user.setIdentityCode("555555555555555555");
			user.setEmail("555555555@qq.com");
			user.setMobile("55555555555");
			count = sqlSession.getMapper(UserDao.class).add(user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
		}
	}

	@Override
	public boolean add(User user) {
		sqlSession = null;
		count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			UserDao userDao = sqlSession.getMapper(UserDao.class);
			count = userDao.add(user);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
		}
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}

	@Test
	public void deleteUserById() {
		sqlSession = null;
		count = 0;
		String delid = "9";
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			count = sqlSession.getMapper(UserDao.class).deleteUserById(delid);
			sqlSession.commit();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
		}
	}

	@SuppressWarnings("finally")
	@Override
	public boolean deleteUserById(Integer userId) {
		sqlSession = null;
		count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			UserDao userDao = sqlSession.getMapper(UserDao.class);
			count = userDao.deleteUserById(userId + "");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
			return count > 0;
		}
	}

	@Test
	public void update() {
		sqlSession = null;
		count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			User user = new User();
			user.setId(9);
			user.setLoginName("xx");
			user.setUserName("嘻嘻");
			user.setType(0);
			user.setSex(1);
			user.setIdentityCode("333333333333333333");
			user.setEmail("333333333@qq.com");
			user.setMobile("33333333333");
			count = sqlSession.getMapper(UserDao.class).update(user);
			sqlSession.commit();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			sqlSession.rollback();
			count = 0;
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
		}

	}

	@SuppressWarnings("finally")
	@Override
	public boolean update(User user) {
		sqlSession = null;
		count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			UserDao userDao = sqlSession.getMapper(UserDao.class);
			count = userDao.update(user);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
			return count > 0;
		}
	}

	@SuppressWarnings("finally")
	@Override
	public List<User> getUserList(Integer currentPageNo, Integer pageSize) {
		connection = null;
		List<User> userList = null;
		try {
			connection = DataSourceUtil.openConnection();
			UserDao userDao = new UserDaoImpl(connection);
			userList = userDao.getUserList(currentPageNo, pageSize);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DataSourceUtil.closeConnection(connection);
			return userList;
		}
	}

	@SuppressWarnings("finally")
	@Override
	public int count() {
		connection = null;
		count = null;
		try {
			connection = DataSourceUtil.openConnection();
			UserDao userDao = new UserDaoImpl(connection);
			count = userDao.count();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DataSourceUtil.closeConnection(connection);
			return count;
		}
	}
}
