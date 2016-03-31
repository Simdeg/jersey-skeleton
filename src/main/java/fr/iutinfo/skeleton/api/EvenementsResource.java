package fr.iutinfo.skeleton.api;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/evenement")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EvenementsResource {
	private static EvenementsDao dao = BDDFactory.getDbi().open(EvenementsDao.class);
    final static Logger logger = LoggerFactory.getLogger(EvenementsResource.class);


    public EvenementsResource() {
		try {
			dao.createEvenementsTable();
			dao.insert(new Evenements("la peche aux moules","rock","25/03/2016","26/03/2016","Saint-Jean DesBesants", 03, 58, 10));
			dao.insert(new Evenements("vive la Biere","disco","25/08/2016","26/08/2016","Saint-Tropez", 03, 38, 20));
			dao.insert(new Evenements("Greve generale","funk","27/04/2016","22/05/2016","Saint bri", 13, 88, 30));
			dao.insert(new Evenements("la peche aux moules le retour ","soul","25/03/2016","26/03/2016","Saints", 73, 158, 40));
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
	
	@PUT
	@Path("/{id}")
	public void updateEvenements(@PathParam("id") int id) {
		dao.updateById(id);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteEvenements(@PathParam("id") int id) {
		dao.deleteById(id);
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
