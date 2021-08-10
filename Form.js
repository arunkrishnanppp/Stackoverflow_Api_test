import React, { useState, useEffect } from "react";
import "./formapp.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ListItem from "./Components/ListItem";
import Buttons from "./Components/Buttons";
const FormApp = () => {
  const [question, setquestion] = useState();
  const [tagged, settagged] = useState();
  const [order, setorder] = useState();
  const [notTagged, setnotTagged] = useState("asc");
  const [fromdate, setfromdate] = useState(new Date());

  const [todate, settodate] = useState(new Date());

  const [Mindate, setMindate] = useState(new Date());
  const [Maxdate, setMaxdate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const [users, setUsers] = useState();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({
      question: question,
      tagged: tagged,
      notTagged: notTagged,
      FDate: fromdate,
      toDate: todate,
      minDate: Mindate,
      maxDate: Maxdate,
      order: order
    });
    //api.stackexchange.com/2.3/search?page=2&order=desc&sort=activity&intitle=django&site=stackoverflow
    https: console.log("submitted");
    //https://api.stackexchange.com/2.3/search?page=2&order=desc&sort=activity&intitle=django&site=stackoverflow

    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/search?page=${pageNumber}&order=desc&sort=activity&intitle=django&site=stackoverflow`
      );
      setUsers(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const onNext = async () => {
    try {
      setpageNumber(pageNumber + 1);
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/search?page=${pageNumber}&order=desc&sort=activity&intitle=django&site=stackoverflow`
      );
      setUsers(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const onPrev = async () => {
    try {
      setpageNumber(pageNumber - 1);
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/search?page=${pageNumber}&order=desc&sort=activity&intitle=django&site=stackoverflow`
      );
      setUsers(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(users);
  }, [users, setUsers]);
  return (
    <div className="mainapp" onSubmit={handleFormSubmit}>
      <form className="formapp">
        <div className="form-control">
          <select
            className="select"
            id="order"
            name="orderlist"
            onChange={(e) => {
              console.log(e.target.value);
              setorder(e.target.value);
            }}
          >
            <option value="asc">asc</option>
            <option value="decs">desc</option>
          </select>
        </div>
        <div className="form-control">
          <select className="select" name="orderlist">
            <option value="acticity">activity1</option>
            <option value="activity2">activity2</option>
          </select>
        </div>
        <div>
          <label for="question">Question</label>
          <input
            type="text"
            name="question"
            value={question}
            onChange={(event) => {
              console.log(event.target.value);
              setquestion(event.target.value);
            }}
            className="form-control"
            id="questionInput"
            placeholder="Question"
          />
        </div>
        <div>
          <label for="question">Tagged</label>
          <input
            type="text"
            name="question"
            value={tagged}
            onChange={(event) => {
              console.log(event.target.value);
              settagged(event.target.value);
            }}
            className="form-control"
            id="questionInput"
            placeholder="Question"
          />
        </div>
        <div>
          <label for="question">Not Tagged</label>
          <input
            type="text"
            name="question"
            value={question}
            onChange={(event) => {
              console.log(event.target.value);
              setnotTagged(event.target.value);
            }}
            className="form-control"
            id="questionInput"
            placeholder="Question"
          />
        </div>

        <div className="form-group form-control">
          <label>From Date</label>
          <DatePicker
            selected={fromdate}
            onChange={(date) => {
              setfromdate(date);
            }}
            name="startDate"
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="form-group form-control">
          <label>TO Date</label>
          <DatePicker
            selected={todate}
            onChange={(date) => settodate(date)}
            name="startDate"
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="form-group form-control">
          <label>From Date</label>
          <DatePicker
            selected={Mindate}
            onChange={(date) => {
              setMindate(date);
            }}
            name="startDate"
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="form-group form-control">
          <label>From Date</label>
          <DatePicker
            selected={Maxdate}
            onChange={(date) => {
              setMaxdate(date);
            }}
            name="startDate"
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {users && (
        <div className="listofusers">
          <Buttons pageNumber={pageNumber} onNext={onNext} onPrev={onPrev} />
          <table className="table">
            <thead>
              <tr>
                <th>Link</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return <ListItem link={user.link} title={user.title} />;
              })}
            </tbody>
          </table>
          <Buttons pageNumber={pageNumber} onNext={onNext} onPrev={onPrev} />
        </div>
      )}
    </div>
  );
};

export default FormApp;
