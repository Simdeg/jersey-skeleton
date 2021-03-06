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
    private int idUser;
    private int nbMax;
    private int nbMin;
    private int participe;

    
    public Evenements(String intitule) {
        this.intitule = intitule;
    }

    public Evenements(String intitule, String type) {
        this.intitule = intitule;
        this.type = type;
    }
    public Evenements(String intitule, String type, String dateDebut, String dateFin, String lieu, int nbMax, int nbMin,int participe, int idUser) {
        this.intitule = intitule;
        this.type = type;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.lieu = lieu;
        this.idUser = idUser;
        this.nbMax = nbMax;
        this.nbMin = nbMin;
        this.participe = participe;
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

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public int getParticipe() {
		return participe;
	}

	public void setParticipe(int participe) {
		this.participe = participe;
	}

}
	

	

