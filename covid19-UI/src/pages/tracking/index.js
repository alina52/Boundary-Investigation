import React, { useState, useEffect, useRef } from "react";
// import './style.css';
import Header from "../../components/header/";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import iconTh from '@/assets/images/iconTh.png'

import {gets, posts} from '@/util/axios'

function Main(props) {
  const [leftOpen, setLeftOpen] = useState(false);
  const changeLeftOpen = function () {
    setLeftOpen(!leftOpen);
  };
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [quarantine, setQuarantine] = React.useState(1);

  const quarantineChange = (event) => {
    setQuarantine(event.target.value*1);
  }
  const [staff, setStaff] = React.useState(1);

  const staffChange = (event) => {
    setStaff(event.target.value*1);
  };
  const [health, setHealth] = React.useState(1);

  const healthChange = (event) => {
    setHealth(event.target.value*1);
  };
  // 左侧列表数据
  const [persons, setPersons] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  useEffect(()=>{
    // 异步请求左侧列表接口
    gets({
        url: '/api/persons.json',
        params: {}
    }).then(res=>{
      setPersons(res)
    });
    // 异步请求右侧列表接口
    gets({
        url: '/api/history.json',
        params: {}
    }).then(res=>{
      setHistory(res);
    });
  }, []);
  // 渲染左侧列表
  function readerPersons(v, i){
    if(v.new){
      return(
        <a href="###" className="IndAcca flexC fl-bet" key={i}>
          <p className="CloRed">{v.name}</p>
          <i className="IndAccI">ADM</i>
          <span>{v.times}</span>
          <div className="AdmN titleN2">
            <p>{v.summary}</p>
          </div>
        </a>
      )
    }else{
      return (
        <a href="###" className="IndAcca flexC fl-bet" key={i}>
          <p>{v.name}</p>
          <span>{v.times}</span>
        </a>
      )
    }
  }

  return (
    <div>
      <Header page="tracking" />
      {/* 左边start */}
      <div className="IndDk flex">
        {
          /* persons.map((v, i)=>{
            return (<span keys={i}>{v}</span>);
          }) */
        }
        <div className="IndLeft">
          <div className="title flexC">
            <h3>Search a user</h3>
            <i className="WenH"></i>
            <div className="titleN titleN1">
              <p>
                Search uid or name for other users if you want to update for
                them by click their name in result
              </p>
            </div>
          </div>
          <div className="searchK flexC">
            <i className="searchI"></i>
            <input type="text" className="IndSeaI" placeholder="Search User" />
          </div>
          <div className="title flexC">
            <h3>Accountable Persons</h3>
            <i className="WenH"></i>
            <div className="titleN titleN2">
              <p>Person Tag is managed by Site Admin</p>
            </div>
            <a href="###" className="titAcc CloRed">
              Details
            </a>
          </div>
          <div className="IndDD IndAcc">
            <div className={["IndAccN", leftOpen ? "" : "IndAccNo"].join(" ")}>
              {
                persons.map((v, i)=>{
                  return readerPersons(v, i);
                })
              }
            </div>
            <a
              href="###"
              onClick={changeLeftOpen}
              className={[
                "IndAccBut",
                "flexC",
                "fl-cen",
                !leftOpen ? "" : "IndAccOn",
              ].join(" ")}
            >
              <i className="IndAccJ"></i>
            </a>
          </div>
        </div>
        {/* 左边end */}
        {/* 中间start */}
        <div className="IndCon IndDD">
          <div className="title flexC">
            <h3>Staff Quarantine Status</h3>
          </div>
          <div className="IndConK">
            <div className="IndConD flexC">
              <RadioGroup className="flex" aria-label="gender" name="quarantineRadio" value={quarantine} onChange={quarantineChange}>
                <FormControlLabel value={1} control={<Radio />} label="Normal in Shangha" />
                <FormControlLabel value={2} control={<Radio />} label="Normal outside Shanghai" />
                <FormControlLabel value={3} control={<Radio />} label="Quarantined in Shanghai" />
                <FormControlLabel value={4} control={<Radio />} label="Suspected" />
                <FormControlLabel value={5} control={<Radio />} label="Confirmed" />
              </RadioGroup>
            </div>
            {
              quarantine == 1?
              <div className="IndConF IndDD">
                <div className="flex">
                  <div className="IndCoTH">
                    <img src={iconTh} />
                  </div>
                  <div className="IndConFs">
                    <div className="IndConFt">
                      <div className="IndConFtit flexC">
                        <p>Normal in working city</p>
                      </div>
                      <div className="IndConFtp">
                        Could either WFH or go to office as been in city for more
                        than 14 days & no health issues.
                      </div>
                    </div>
                  </div>
                </div>
              </div>:''
            }
            {
              quarantine == 2?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Normal outside working city</p>
                    </div>
                    <div className="IndConFtp">
                      in another city and could WFH.
                    </div>
                  </div>
                  <div className="IndConFG">
                    <input
                      type="text"
                      placeholder=""
                      value="China"
                      className="IndConI"
                    />
                    <input
                      type="text"
                      placeholder="Current Province"
                      value=""
                      className="IndConI"
                    />
                    <input
                      type="text"
                      placeholder="Current City"
                      value=""
                      className="IndConI"
                    />
                    <div className="IndCoZS CloRed">
                      Please input your current position.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''}
            {
              quarantine == 3?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Quarantined</p>
                    </div>
                    <div className="IndConFtp">
                      14 days Quarantine, other than Infected or Suspected, but
                      quarantined per XXXX guideline, e.g.travel from other city
                      back to Shanghai on 02/10/2020, then should fill in
                      02/10/2020.
                    </div>
                  </div>
                  <div className="IndConFG">
                    <input
                      type="text"
                      placeholder="Quarantine since MM/YYYY"
                      value=""
                      className="IndConI"
                    />
                    <div className="IndCoZS CloRed">
                      Please input your quarantine date.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            {
              quarantine == 4?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Suspected</p>
                      <a href="###" className="IndConFta CloRed">
                        more details
                      </a>
                    </div>
                    <div className="IndConFtp IndConFtpO">
                      <p>
                        Suspected to be infected, please provide details in
                        Remarks and to XXXXX.
                      </p>
                      <p style={{ paddingLeft: "2%" }}>
                        a.Quarantine issued by the medical doctors / local
                        authorities, e.g. Close contact with infected person.
                      </p>
                      <p style={{ paddingLeft: "2%" }}>
                        b.Display symptoms and had been to Hubei or have been in
                        close contact with people been to Hubei.
                      </p>
                    </div>
                  </div>
                  <div className="IndConFG">
                    <input
                      type="text"
                      placeholder=""
                      value="China"
                      className="IndConI"
                    />
                    <input
                      type="text"
                      placeholder="Current Province"
                      value=""
                      className="IndConI"
                    />
                    <input
                      type="text"
                      placeholder="Current City"
                      value=""
                      className="IndConI"
                    />
                    <div className="IndCoZS CloRed">
                      Please input your current position.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            {
              quarantine == 5?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Confirmed</p>
                    </div>
                    <div className="IndConFtp">
                      Confirmed Infected Cases, please provide details in
                      Remarks and to XXXX, Confirmed infected as diagnosed by
                      the medical doctors.
                    </div>
                  </div>
                  <div className="IndConFG">
                    <input
                      type="text"
                      placeholder=""
                      value="China"
                      className="IndConI"
                    />
                    <input
                      type="text"
                      placeholder="Current Province"
                      value=""
                      className="IndConI"
                    />
                    <input
                      type="text"
                      placeholder="Current City"
                      value=""
                      className="IndConI"
                    />
                    <div className="IndCoZS CloRed">
                      Please input your current position.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            <div className="IndCoZS IndCoBZ CloRed">
              Please choose your quarantine status
            </div>
          </div>

          <div className="title flexC">
            <h3>Staff Work / Normal Absence / Sick?</h3>
          </div>
          <div className="IndConK">
            <div className="IndConD flexC">
              <RadioGroup className="flex" aria-label="gender" name="staffRadio" value={staff} onChange={staffChange}>
                <FormControlLabel value={1} control={<Radio />} label="In Office" />
                <FormControlLabel value={2} control={<Radio />} label="Work From Home" />
                <FormControlLabel value={3} control={<Radio />} label="Normal Absence" />
                <FormControlLabel value={4} control={<Radio />} label="Sick Leave" />
              </RadioGroup>
            </div>
            {
              staff == 1?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>In Office</p>
                      <a href="###" className="IndConFta CloRed">
                        more details
                      </a>
                    </div>
                    <div className="IndConFtp IndConFtpO">
                      <p style={{ paddingLeft: "2%" }}>
                        a.Submit access to office request 1 day in advance to
                        your manager, XXXX and XXXX. Staff can update the daily
                        tracker to submit the request. Request for visitors
                        needs to be submitted by NTSH host via email.
                      </p>
                      <p style={{ paddingLeft: "2%" }}>
                        b.All XXXX staff, vendor staff visitors, who want to
                        enter into XXXX 31F and 35F offices regardless of
                        reason, should register at 31F front door of NTSH office
                        when first entering into XXXX office areas on the day.
                      </p>
                      <p style={{ paddingLeft: "2%" }}>
                        c.Security guard will measure your temperature at the
                        front door.
                      </p>
                      <p style={{ paddingLeft: "2%" }}>
                        d.35F staff please go to 31Ffirst to register before
                        entering into 35F office.
                      </p>
                      <p style={{ paddingLeft: "2%" }}>
                        e.Staff who entered into office without prior
                        notification and registration may be subject to force
                        leave arrangement according to government’s guideline.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            {
              staff == 2?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>WFH</p>
                    </div>
                    <div className="IndConFtp">
                      work from home remotely with 8 hours working time
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            {
              staff == 3?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Normal Absence</p>
                    </div>
                    <div className="IndConFtp">
                      (AL, Family case, etc.excl sick leave)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            {
              staff == 4?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Sick Leave</p>
                    </div>
                    <div className="IndConFtp">
                      normal sick leave(
                      <span className="CloRed">not due to corona virus</span>),
                      please provide details in Remarks.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
          }
            <div className="IndCoZS IndCoBZ CloRed">
              Please choose your work status
            </div>
          </div>

          <div className="title flexC">
            <h3>Health Status</h3>
          </div>
          <div className="IndConK">
            <div className="IndConD flexC">
              <RadioGroup className="flex" aria-label="gender" name="healthRadio" value={health} onChange={healthChange}>
                <FormControlLabel value={1} control={<Radio />} label="Normal" />
                <FormControlLabel value={2} control={<Radio />} label="Fever" />
                <FormControlLabel value={3} control={<Radio />} label="Other Symptoms" />
              </RadioGroup>
            </div>
            {
              health == 1?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Normal</p>
                    </div>
                    <div className="IndConFtp">no health issues.</div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            {
              health == 2?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Fever</p>
                    </div>
                    <div className="IndConFtp">
                      body temperature equals or greater than 37.3, please
                      provide details in Remarks.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            {
              health == 3?
            <div className="IndConF IndDD">
              <div className="flex">
                <div className="IndCoTH">
                  <img src={iconTh} />
                </div>
                <div className="IndConFs">
                  <div className="IndConFt">
                    <div className="IndConFtit flexC">
                      <p>Other Symptoms</p>
                    </div>
                    <div className="IndConFtp">
                      Please provide details in Remarks
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''
            }
            <div className="IndCoZS IndCoBZ CloRed">
              Please choose your health status
            </div>
          </div>

          <div className="title flexC">
            <h3>Remarks</h3>
          </div>
          <div className="IndConK">
            <textarea
              className="IndTex"
              id="htmer"
              placeholder="Please input your remarks."
            ></textarea>
            <div className="IndCoZS IndCoBZ CloRed">Please input remarks</div>
          </div>

          <div className="IndConZ">
            <div className="Indsdu" style={{ color: "orange" }}>
              Please submit for you（and your team）before 10AM HKT everyday.
            </div>
            <p>You can change the date for tomorrow or other days.</p>
          </div>
          <div className="IndConV flexC">
            <div className="flexC">
              <FormControlLabel
                control={
                  <Switch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="Bulk Update"
              />
            </div>
          </div>
          <div
            className="IndDate"
            style={{ display: state.checkedA ? "block" : "none" }}
          >
            <div className="IndDateT">
              <h3>For this & next week</h3>
              <p>
                You can use the check box to select one or more dates to update.
                the existing data will be overridden.
              </p>
            </div>
            <div className="IndDateN">
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">14</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">15</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">16</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">17</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">18</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">19</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">20</p>
                </div>
              </label>

              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">21</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">22</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">23</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">24</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">25</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">26</p>
                </div>
              </label>
              <label className="Datelab">
                <div>
                  <input type="checkbox" name="deta" />
                  <p className="CloRed">27</p>
                </div>
              </label>
            </div>
            <div className="IndDatB flex fl-end">
              <button className="IndBut IndButo">Update</button>
            </div>
          </div>
        </div>
        {/* 中间end */}
        {/* 右边 start*/}
        <div className="IndRight">
          <div className="title flexC">
            <h3>History</h3>
          </div>
          <select className="Indsel">
            {
              history.map((v, i)=>{
                return  <option value={i} key={i}>{v.num}:{v.time} {v.text}</option>;
              })
            }
          </select>
        </div>
        {/* 右边end */}
      </div>
    </div>
  );
}

export default Main;
