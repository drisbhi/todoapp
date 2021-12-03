import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [taskName, setTaskName] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [status, setStatus] = useState("pending");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    var today = new Date();
    today.setMinutes(today.getMinutes() + parseInt(timeTaken, 10));
    console.log("kya andar jayega", today);
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );
    if (!email || !name) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      email,
      name,
      taskName,
      timeTaken,
      status,
      boundTime: today
    };

    addContact(data);
    toast.success("Data added successfully!!");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Data</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="inputState" class="form-label">
                Select Time ( only in Mins)
              </label>
              <input
                className="form-control"
                type="number"
                placeholder="Time take to complete a task"
                value={timeTaken}
                onChange={(e) => setTimeTaken(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                disabled
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="form-group  m-3">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Data"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
