package fr.iutinfo.skeleton.api;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;

import java.util.List;

public interface UserDao {
	@SqlUpdate("create table users (id integer primary key autoincrement, nom varchar(100), prenom varchar(100),pseudo varchar(100), email varchar(100), password varchar(32))")
	void createUserTable();

	@SqlUpdate("insert into users (nom,prenom,pseudo,email,password) values (:nom, :prenom,:pseudo, :email, :password)")
	@GetGeneratedKeys
	int insert(@BindBean() User user);

	@SqlQuery("select * from users where pseudo = :pseudo")
    @RegisterMapperFactory(BeanMapperFactory.class)
	User findByPseudo(@Bind("pseudo") String pseudo);

	@SqlUpdate("drop table if exists users")
	void dropUserTable();
	
	@SqlUpdate("Delete from users where id = :id")
	void deleteById(@Bind("id") int id);

	@SqlQuery("select * from users order by id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	List<User> all();

	@SqlQuery("select * from users where id = :id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	User findById(@Bind("id") int id);

	void close();
}
