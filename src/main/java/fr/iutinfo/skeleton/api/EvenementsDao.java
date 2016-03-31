package fr.iutinfo.skeleton.api;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;

import java.util.List;

public interface EvenementsDao {
	@SqlUpdate("create table event (id integer primary key autoincrement, intitule varchar(100), type varchar(100), dateDebut varchar(32), dateFin varchar(32), lieu varchar(32))")
	void createEvenementsTable();

	@SqlUpdate("insert into event (intitule,type,dateDebut, dateFin, lieu) values (:intitule, :type, :dateDebut, :dateFin, :lieu)")
	@GetGeneratedKeys
	int insert(@BindBean() Evenements event);

	@SqlQuery("select * from event where intitule = :intitule")
    @RegisterMapperFactory(BeanMapperFactory.class)
	Evenements findByName(@Bind("intitule") String intitule);

	@SqlUpdate("drop table if exists event")
	void dropEvenementsTable(); 

	@SqlQuery("select * from event order by id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	List<Evenements> all();

	@SqlQuery("select * from event where id = :id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Evenements findById(@Bind("id") int id);

	void close();
}
