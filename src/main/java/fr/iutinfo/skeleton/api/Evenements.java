package fr.iutinfo.skeleton.api;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Evenements implements Principal {
    final static Logger logger = LoggerFactory.getLogger(Evenements.class);

    private String intitule;
    private String type;
    private int id = 0;
    private String dateDebut;
    private String dateFin;
    private String lieu;
    private String nomOrganisateur;
    private int nbMax;
    private int nbMin;

    
    public Evenements(int id, String intitule) {
        this.id = id;
        this.intitule = intitule;
    }

    public Evenements(int id, String intitule, String type) {
        this.id = id;
        this.intitule = intitule;
        this.type = type;
    }

    public Evenements() {
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public String getDateDebut() {
    	return dateDebut;
    }
    
    public String getDateFin() {
    	return dateFin;
    }
    public void setDateDebut(String dateDebut) {
    	this.dateDebut=dateDebut;;
    }
    
    public void setDateFin(String dateFin) {
    	this.dateFin = dateFin;;
    }


    public String getNomOrganisateur() {
        return nomOrganisateur;
    }

    public void setAlias(String nomOrganisateur) {
        this.nomOrganisateur= nomOrganisateur;
    }

    public int getNbMax( ){
    	return nbMax;
    }

    public int getNbMin() {
        return nbMin;
    }
    public void setNbMax( int nbMax){
    	this.nbMax= nbMax;
    }

    public void setNbMin(int nbMin) {
        this.nbMin = nbMin;
    }

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return intitule;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

}
	

	

