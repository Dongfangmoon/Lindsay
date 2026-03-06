package cn.easybuy.service.product;

import java.sql.Connection;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.junit.Test;

import cn.easybuy.dao.product.ProductDao;
import cn.easybuy.dao.product.ProductDaoImpl;
import cn.easybuy.entity.Product;
import cn.easybuy.utils.DataSourceUtil;
import cn.easybuy.utils.MyBatisUtil;

/**
 * 商品的业务类
 */
public class ProductServiceImpl implements ProductService {

	private Logger logger = Logger.getLogger(ProductServiceImpl.class);
	SqlSession sqlSession;

	@Test
	public void getProductById() {
		sqlSession = null;
		Product product = null;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			ProductDao productDao = sqlSession.getMapper(ProductDao.class);
			product = productDao.getProductById(733);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
		}
	}

	@SuppressWarnings("finally")
	@Override
	public Product getProductById(Integer productId) {
		sqlSession = null;
		Product product = null;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			ProductDao productDao = sqlSession.getMapper(ProductDao.class);
			product = productDao.getProductById(productId);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
			return product;
		}
	}

	@Test
	public void add() {
		sqlSession = null;
		Integer count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			Product product = new Product();
			product.setName("赞");
			product.setDescription("");
			product.setPrice((float) 1.0);
			product.setStock(50);
			product.setCategoryLevel1Id(555);
			product.setCategoryLevel2Id(666);
			product.setCategoryLevel3Id(777);
			product.setFileName("/EasyBuy/WebContent/static/images/zan.png");
			product.setIsDelete(0);
			count = sqlSession.getMapper(ProductDao.class).add(product);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
		}
	}

	@SuppressWarnings("finally")
	@Override
	public boolean add(Product product) {
		sqlSession = null;
		Integer count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			ProductDao productDao = sqlSession.getMapper(ProductDao.class);
			count = productDao.add(product);
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
		Integer count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			Product product = new Product();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	@SuppressWarnings("finally")
	@Override
	public boolean update(Product product) {
		sqlSession = null;
		Integer count = 0;
		try {
			sqlSession = MyBatisUtil.createSqlSession();
			ProductDao productDao = sqlSession.getMapper(ProductDao.class);
			count = productDao.update(product);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			MyBatisUtil.closeSqlSession(sqlSession);
			return count > 0;
		}
	}

	@SuppressWarnings("finally")
	@Override
	public boolean deleteProductById(Integer productId) {
		Connection connection = null;
		Integer count = 0;
		try {
			connection = DataSourceUtil.openConnection();
			ProductDao productDao = new ProductDaoImpl(connection);
			count = productDao.deleteProductById(productId);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DataSourceUtil.closeConnection(connection);
			return count > 0;
		}
	}

	@SuppressWarnings("finally")
	@Override
	public List<Product> getProductList(Integer currentPageNo, Integer pageSize, String proName, Integer categoryId,
			Integer level) {
		Connection connection = null;
		List<Product> productList = null;
		try {
			connection = DataSourceUtil.openConnection();
			ProductDao productDao = new ProductDaoImpl(connection);
			productList = productDao.getProductList(currentPageNo, pageSize, proName, categoryId, level);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DataSourceUtil.closeConnection(connection);
			return productList;
		}
	}

	@SuppressWarnings("finally")
	@Override
	public int count(String proName, Integer categoryId, Integer level) {
		Connection connection = null;
		Integer count = 0;
		try {
			connection = DataSourceUtil.openConnection();
			ProductDao productDao = new ProductDaoImpl(connection);
			count = productDao.queryProductCount(proName, categoryId, level);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DataSourceUtil.closeConnection(connection);
			return count;
		}
	}

	@SuppressWarnings("finally")
	@Override
	public boolean updateStock(Integer productId, Integer stock) {
		Connection connection = null;
		Integer count = 0;
		try {
			connection = DataSourceUtil.openConnection();
			ProductDao productDao = new ProductDaoImpl(connection);
			count = productDao.updateStock(productId, stock);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DataSourceUtil.closeConnection(connection);
			return count > 0;
		}
	}

}
