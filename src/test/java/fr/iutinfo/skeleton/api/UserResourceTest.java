package fr.iutinfo.skeleton.api;

import java.util.List;

import javax.ws.rs.core.Application;
import javax.ws.rs.core.GenericType;

import org.glassfish.jersey.test.JerseyTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class UserResourceTest extends JerseyTest {
	@Override
	protected Application configure() {
		return new Api();
	}

	@Before
	public void init() {
		UserDao dao = BDDFactory.getDbi().open(UserDao.class);
		dao.dropUserTable();
		dao.createUserTable();
		dao.insert(new User("Margaret", "Tatcher"));
		dao.insert(new User("Bill", "Clinton"));
	}

	@Test
	public void should_return_many_users_when_get_user() {
		List<User> users = target("/user").request().get(new GenericType<List<User>>() {
		});
		Assert.assertEquals(5, users.size());
	}
}
