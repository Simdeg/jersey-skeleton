package fr.iutinfo.skeleton.api;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/evenement")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EvenementsDBResource {
	private static EvenementsDao dao = BDDFactory.getDbi().open(EvenementsDao.class);
    final static Logger logger = LoggerFactory.getLogger(EvenementsDBResource.class);


    public EvenementsDBResource() {
		try {
			dao.createEvenementsTable();
			dao.insert(new Evenements("la peche aux moules","rock"));
			dao.insert(new Evenements("vive la Biere","disco"));
			dao.insert(new Evenements("Greve generale","funk"));
			dao.insert(new Evenements("la peche aux moules le retour ","soul"));
			dao.insert(new Evenements("la peche aux moules le retour des du retour","dance"));
		} catch (Exception e) {
			System.out.println("Table déjà là !");
		}
	}
	
	@POST
	public Evenements createEvenements(Evenements event) {
        int id = dao.insert(event);
        event.setId(id);
		return event;
	}

	@GET
	@Path("/{intitule}")
	public Evenements getEvenements(@PathParam("intitule") String intitule) {
		Evenements event = dao.findByName(intitule);
		if (event == null) {
			throw new WebApplicationException(404);
		}
		return event;
	}

	@GET
	public List<Evenements> getAllEvenements() {
		return dao.all();
	}

}
