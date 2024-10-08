import React from "react";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./Ticket.css";

const Ticket = () => {
  function getHoursAndMinutes(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${day} ${monthNames[month]} ${year} - ${hours}:${minutes}`;
  }

  let { logoutUser } = useContext(AuthContext);
  let { authTokens } = useContext(AuthContext);
  let [tickets, setTickets] = useState([]);
  React.useEffect(() => {
    getTickets();
  });

  let getTickets = async () => {
    let response = await fetch(
      "https://guptag.pythonanywhere.com/accounts/tickets/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    if (response.status === 200) {
      setTickets(data);
      // console.log(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
  return (
    <div>
      <div className="ticket-list">
        <p className="my-tickets">My Tickets</p>
        {tickets.map((ticket) => (
          <div key={ticket.ticket_id}>
            <img
              src="https://img.freepik.com/premium-vector/vector-drawing-cinema-ticket-cinema-ticket-icon_606226-42.jpg?w=2000"
              className="card-img-top ticket-pngg"
              alt="..."
            />
            <div className="ticket-info">
              <div>Ticket ID: {ticket.ticket_id}</div>
              <div>Price: {ticket.price}</div>
              <div>Show ID: {ticket.show}</div>
              <div>Seats: {ticket.seats}</div>
              <div>
                Purchase time: {getHoursAndMinutes(ticket.purchase_time)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;
