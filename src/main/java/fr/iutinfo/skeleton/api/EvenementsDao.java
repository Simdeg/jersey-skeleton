package fr.iutinfo.skeleton.api;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;

import java.util.List;

public interface EvenementsDao {
	@SqlUpdate("create table event (id integer primary key autoincrement, intitule varchar(100), type varchar(100), dateDebut varchar(32), dateFin varchar(32), lieu varchar(32), idUser varchar(4), nbMax varchar(32), nbMin varchar(32), participe varchar (100))")
	void createEvenementsTable();

	@SqlUpdate("insert into event (intitule,type,dateDebut, dateFin, lieu, idUser, nbMax, nbMin, participe) values (:intitule, :type, :dateDebut, :dateFin, :lieu, :idUser, :nbMax, :nbMin, :participe)")
	@GetGeneratedKeys
	int insert(@BindBean() Evenements event);

	@SqlQuery("select * from event where intitule = :intitule")
    @RegisterMapperFactory(BeanMapperFactory.class)
	Evenements findByName(@Bind("intitule") String intitule);

	@SqlUpdate("drop table if exists event")
	void dropEvenementsTable(); 
	
	@SqlUpdate("delete from event where id= :id")
	void deleteById(@Bind("id") int id);	
	
	@SqlUpdate("update into event where id= :id (intitule,type,dateDebut, dateFin, lieu, idUser, nbMax, nbMin, participe) values (:intitule, :type, :dateDebut, :dateFin, :lieu, :idUser, :nbMax, :nbMin, :participe)")
	@GetGeneratedKeys
	int updateById(@Bind("id") int id, @BindBean()Evenements event);
	
	@SqlQuery("select * from event order by id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	List<Evenements> all();

	@SqlQuery("select * from event where id = :id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Evenements findById(@Bind("id") int id);

	void close();
}
