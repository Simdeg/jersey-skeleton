package fr.iutinfo.skeleton.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/userdb")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserDBResource {
	private static UserDao dao = BDDFactory.getDbi().open(UserDao.class);
    final static Logger logger = LoggerFactory.getLogger(UserDBResource.class);


    public UserDBResource() {
		try {
			dao.createUserTable();
			dao.insert(new User("Margaret","Tatcher"));
			dao.insert(new User("Bill","Clinton"));
			dao.insert(new User("John","john"));
			dao.insert(new User("bill","bill"));
			dao.insert(new User("mike","mike"));
		} catch (Exception e) {
			System.out.println("Table déjà là !");
		}
	}
	
	@POST
	public User createUser(User user) {
        
        int id = dao.insert(user);
        user.setId(id);
		return user;
	}

	@GET
	@Path("/{nom}")
	public User getUser(@PathParam("nom") String nom) {
		User user = dao.findByName(nom);
		if (user == null) {
			throw new WebApplicationException(404);
		}
		return user;
	}

	@GET
	public List<User> getAllUsers() {
		return dao.all();
	}

}
