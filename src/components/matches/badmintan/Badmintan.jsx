import React, { useEffect, useState } from "react";
import { Button, Players } from "../../index";
import { toast } from "sonner"
import authService from "../../../connection/auth";
import { useParams } from "react-router-dom";
import Stomp from "stompjs";
import { useSelector } from "react-redux";
import { MatchContext } from "../../../context/MatchContextProvider";
import Loading from "../../Loading";

function Match() {
  const { matchId } = useParams();
  const { isAdmin, match, setMatch, socket, updateMatch } = React.useContext(MatchContext);
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.connect({}, () => {
        socket.subscribe(`/public/badmintonScoreUpdates/${matchId}`, (message) => {
          const match = JSON.parse(message.body).body;
          setTeamA(match.team1Score);
          setTeamB(match.team2Score);
          if(match.status !== status){
            setStatus(match.status)
          }
          if (match.status === "COMPLETED") {
            toast.success("Match Completed \n Winner is " + match.winner.name);
          }
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (match) {
      setTeamA(match.team1score);
      setTeamB(match.team2score);
      if(status !== match.status){
        setStatus(match.status)
      }
    }
  }, [match]);

  useEffect(() => {
    updateMatch();
  }, [status]);

  function send(e) {
    socket.send(
      `/app/updateBadmintonScore/${matchId}`,
      {},
      JSON.stringify({
        updateTeam: e.target.name,
        status,
      })
    );
  }

  function startMatch() {
    if (
      confirm(
        `Are you sure you want to start the match ${
          status === "ONGOING" ? "" : "again "
        }?`
      )
    ) {
      socket.send(
        `/app/startBadmintonMatch/${matchId}`,
        {},
        JSON.stringify({ status: "ONGOING" })
      )
    }
  }

  function undoMatch() {
    if (confirm(`Are you sure you want to undo the match?`)) {
      socket.send(
        `/app/updateBadmintonScore/${matchId}`,
        {},
        JSON.stringify({ undo : true })
      )
    }
  }

  return match ? (
    <div className=" p-4">
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">{match.team1?.name}</div>
          <div className="text-4xl font-bold">{teamA}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">{match.team2?.name}</div>
          <div className="text-4xl font-bold">{teamB}</div>
        </div>
      </div>
      <div className="flex justify-around mt-8">
        {/* Shows the players here */}
      </div>
      {isAdmin && (
        <div className="flex justify-around mt-8">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            name="1"
            onClick={send}
            disabled={status !=  "ONGOING"}
          >
            Add point to {match.team1.name}
          </Button>
          <Button onClick={status === "ONGOING" ? undoMatch : startMatch} >
            {status === "UPCOMING" ? "Start Match" : status === "ONGOING" ? "Undo" : "Restart"}
          </Button>
          {/* <Button onClick= {undoMatch} disabled={status === "UPCOMING"} > Undo </Button> */}
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4 "
            name="2"
            onClick={send}
            disabled={status !=  "ONGOING"}
          >
            Add point to {match.team2.name}
          </Button>
        </div>
      )}
      <div className="mt-8 bg-gray-200 p-4">
        <div className="text-xl font-bold mb-2">Key Points</div>
        <div className="team-key-points">
          <div className="bg-blue-200 p-2 mb-2 rounded-md">
            Match started at {match.startDate}
          </div>
          {
            match.status === "COMPLETED" && (
              <div className="bg-blue-200 p-2 mb-2 rounded-md">
                Match completed at {match.endDate}
              </div>
            )
          }
          {
            match.status === "COMPLETED" && (
              <div className="bg-blue-200 p-2 mb-2 rounded-md">
                Winner is <span className="font-bold text-red-600">{match.winner.name}</span>
              </div>
            )
          
          }
        </div>
      </div>
    </div>
  ) : (
    <Loading/>
  );
}

export default Match;
