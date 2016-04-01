package fr.iutinfo.skeleton.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserDBResource {
	private static UserDao dao = BDDFactory.getDbi().open(UserDao.class);
    final static Logger logger = LoggerFactory.getLogger(UserDBResource.class);


    public UserDBResource() {
		try {
			dao.createUserTable();
			dao.insert(new User("Margaret","Tatcher","MT","Margaret.tah@gmail.com","1000"));
			dao.insert(new User("Bill","Clinton","BC","Bill.Cli@gmail.com","2000"));
			dao.insert(new User("John","john","JJ","JOHN.joh@gmail.com","3000"));
			dao.insert(new User("bill","bill","BB","Bill.bil@gmail.com","4000"));
			dao.insert(new User("mike","mike","MM","Mike.mik@gmail.com","5000"));
		} catch (Exception e) {
			logger.debug("Table déjà là !");
		}
	}
	
	@POST
	public User createUser(User user) {
        
        int id = dao.insert(user);
        user.setId(id);
		return user;
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteUser(@PathParam("id") int id) {
		dao.deleteById(id);
		
	}

	@GET
	@Path("/{pseudo}")
	public User getUser(@PathParam("pseudo") String pseudo) {
		User user = dao.findByPseudo(pseudo);
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
