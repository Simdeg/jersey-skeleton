package fr.iutinfo.skeleton.api;

import java.util.List;

import javax.ws.rs.core.Application;
import javax.ws.rs.core.GenericType;

import org.glassfish.jersey.test.JerseyTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class EvenementsResourceTest extends JerseyTest{
	@Override
    protected Application configure() {
        return new Api();
    }

	@Before
	public void initializeDataBase() {
		EvenementsDao dao = BDDFactory.getDbi().open(EvenementsDao.class);
		dao.dropEvenementsTable();
		dao.createEvenementsTable();
		dao.insert(new Evenements("event1","type 1"));
		dao.insert(new Evenements("event2","type 2"));
	}
	
	@Test
	public void should_return_many_envents_when_get_evenements () {
		List<Evenements> events = target("/evenement").request().get(new GenericType<List<Evenements>>(){});
		Assert.assertEquals(2, events.size());
	}
	
}
