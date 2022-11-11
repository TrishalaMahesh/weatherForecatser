import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../App.css'
import { Search } from '../svg/svg';

const HomePage = () => {

  const [searchString, setsearchString] = useState("")
  const [error, setError] = useState("")
  let history = useHistory();

  let search = () => {
    if (searchString) {
      setError("")
      sessionStorage.setItem("location", searchString)
      sessionStorage.setItem("units", "farenheit")
      history.push('/search/today');
    } else {
      setError("Please enter a location");
    }
  }

    return (
      <div className="container-fluid wallpaper">
        <header style={{ fontFamily: "Courier New", height:"50px", paddingTop:"10px", margin:"auto" }}>
          <h1>Weather Forecaster</h1>
        </header>
        <div className="center">
          <form>
            <input
              type="text"
              // className="rounded-pill"
              onChange={(e) => setsearchString(e.target.value)}
              placeholder="Search using city, state or country"
              required
            />
            <button
              type="button"
              className="fa fa-search"
              value="Search"
              onClick={(e) => search(e)}
            >
              <Search />
            </button>
            {error && <div style={{color: "red"}}>{error}</div>}
          </form>
        </div>
        <iframe style={{ position:"absolute", bottom:"5px", right: "5px", minHeight:"300px", minWidth:"300px", backgroundColor:"lightblue"}}src='https://webchat.botframework.com/embed/cmpe280-bot-chat?s=uwl6sNylEVY.oebpBxFV9xtAhPfwo34zluFXGFmy4lYioloJfXDd9PA' ></iframe>
        
      </div>
      
    )
}

export default HomePage;