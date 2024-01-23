import conf from "../../conf/conf";
import axios from "axios";

class Database {
  constructor() {
    this.databaseUrl = conf.databaseUrl;
    this.userTable = conf.userTable;
  }

  async login(email, password) {
    try {
      const userData = await axios.post(`${this.databaseUrl}/verifyUser`, {
        email,
        password,
      });

      (userData)

      if (userData.error) {
        throw new Error(userData.error);
      } else {
        if (userData.data.email) return userData.data;
        else throw new Error("User not found");
      }
    } catch (error) {
      throw error;
    }
  }

  // create user : that create and insert into user table

  async createUser(
    email,
    password,
    university,
    fname,
    lname,
    mobileno,
    ...rest
  ) {
    try {
      const userData = await axios
        .post(`${conf.databaseUrl}/signup`, {
          email,
          password,
          mobileno,
          university,
          fname,
          lname,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(error.message);
        });

      if (userData.error) {
        throw new Error(userData.error);
      } else {
        return userData;
      }
    } catch (error) {
      throw error;
    }
  }

  // delete user : that delete user from user table

  async deleteUser(email, ...rest) {
    try {
      const userData = await axios
        .post(`${this.databaseUrl}/deleteUser`, {
          email,
          ...rest,
        })
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(error.message);
        });

      if (userData.error) {
        throw new Error(userData.error);
      } else {
        return userData;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // update user : that update user table

  async updateUser(email, password, university, ...rest) {
    try {
      const userData = await axios
        .post(`${this.databaseUrl}/updateUser`, {
          email,
          password,
          university,
          ...rest,
        })
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(error.message);
        });

      if (userData && userData.error) {
        throw new Error(userData.error && "Not able to send request");
      } else {
        return userData;
      }
    } catch (error) {
      throw error;
    }
  }

  // create tournament : that create and insert into tournament table
  async createTournament(tournamentName, game,  teamSize, startDate, endDate, user, teams) {
    try {

      const tournamentData = await axios
        .post(`${this.databaseUrl}/tournaments`, {
          user,
          tournamentName,
          game,
          teams,
          teamSize,
          startDate,
          endDate
        })
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(error.message);
        });

      if ((tournamentData && tournamentData.error) || !tournamentData.user) {
        throw new Error(tournamentData.error && "Not able to send request");
      } else {
        return tournamentData;
      }
    } catch (error) {
      throw error;
    }
  }

  // get tournament from tournament id
  async getTournament(tournamentId) {
    try {
      const tournamentData = await axios
        .get(`${this.databaseUrl}/getTournament/${tournamentId}`)
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(error.message);
        });

        if ((tournamentData && tournamentData.error) || !tournamentData.user) {
          throw new Error(tournamentData.error && "Not able to send request");
        } else {
          return tournamentData;
        }
      } catch (error) {
        throw error;
      }
  }

  // get all tournaments
  async getAllTournaments() {
    try {
      const tournamentData = await axios
        .get(`${this.databaseUrl}/getTournaments`)
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(error.message);
        });

      if (tournamentData.error) {
        throw new Error(tournamentData.error);
      } else {
        return tournamentData;
      }
    } catch (error) {
      throw error;
    }
  }

  // get teams from tournament id
  async getTeams(tournamentId) {
    try {
      const teamData = await axios
        .get(`${this.databaseUrl}/tournament/${tournamentId}`, {
          tournamentId,
        })
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(error.message);
        });

      if (teamData.error) {
        throw new Error(teamData.error);
      } else {
        return teamData;
      }
    } catch (error) {
      throw error;
    }
  }

  // get all teams
  async getAllTeams() {
    try {
      const teamData = await axios
        .post(`${this.databaseUrl}/getAllTeams`)
        .then((response) => response.data)
        .catch((error) => {
          throw new Error(error.message);
        });

      if (teamData.error) {
        throw new Error(teamData.error);
      } else {
        return teamData;
      }
    } catch (error) {
      throw error;
    }
  }

  // createTeam tha tadd entry in team table
  async createTeam(name, id){
    try {
      const teamData = await axios.post(`${conf.databaseUrl}/team`, {
        name,
        tournament : {id}
      }).then((response) => response.data)
      .catch((error) => {
        throw new Error(error.message);
      })
  
      if(teamData.error){
        throw new Error(teamData.error);
      }
      else
        return teamData;
    } catch (error) {
      throw error
    }
  }


  
}

const database = new Database();
export default database;
