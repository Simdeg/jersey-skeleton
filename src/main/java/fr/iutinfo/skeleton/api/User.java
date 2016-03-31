package fr.iutinfo.skeleton.api;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class User implements Principal {
    final static Logger logger = LoggerFactory.getLogger(User.class);

    private String nom;
    private String prenom;
    private String pseudo;
    private int id = 0;
    private String email;
    private String password;

   private static User anonymous = new User("Anonymous", "anonym","","","");

    public User(String nom) {
        this.nom = nom;
    }

    public User(String nom, String prenom,String pseudo,String email,String password) {
        this.nom = nom;
        this.prenom = prenom;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
    }

    public User() {
    }
    
    

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public void setPassword(String password) {
        
        this.password = password;
    }

    public String getPassword () {
        return this.password;
    }

    
    @Override
    public boolean equals(Object arg) {
        if (getClass() != arg.getClass())
            return false;
        User user = (User) arg;
        return nom.equals(user.nom) && prenom.equals(user.prenom) && email.equals(user.email);
    }

    @Override
    public String toString() {
        return id + ": " + nom + ", " + prenom + " <" + email + ">";
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    

    public boolean isInUserGroup(){
        return ! (id == anonymous.getId());
    }

    public static User getAnonymousUser() {
        return anonymous ;
    }

    public boolean isAnonymous() {
        return this.getId() == getAnonymousUser().getId();
    }
    
    public boolean isGoodPassword(String password) {
        if (isAnonymous()) {
            return false;
        }
		return true;
   
    }

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return nom;
	}

	public String getPseudo() {
		return pseudo;
	}

	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}
}
