import React from 'react';
function Main(props){
  return (
    <header className="header flexC">
      <a href="###" className="Logo" style={{backgroundColor:'#fff'}}></a>
      <div className="LogoN">Covid-19 Tracker</div>
      <nav className="menu flexC">
        <a href="/" className={["menua", props.page == 'tracking' ? "on" : ''].join(' ')}>Tracking</a>
        <a href="/reporting" className={["menua", props.page == 'reporting' ? "on" : ''].join(' ')}>Reporting</a>
        <a href="/admin" className={["menua", props.page == 'admin' ? "on" : ''].join(' ')}>Admin</a>          
      </nav>
      <div className="hduser flexC">
        <p>Current User：</p>
        <a href="###" className="hduserA">test123</a>  
        <i className="hdTanH"></i>
        <div className="hdTanN">
          <div className="hdTanNr">
            <h3>02/19/2021&nbsp;&nbsp;+08:00</h3>
            <div className="hdTanNp">
              <p>Quarantine：normal</p>
              <p>Work：absence</p>
              <p>Health：normal</p>
              <p>Remarks：N/A</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    )
}
export default Main;