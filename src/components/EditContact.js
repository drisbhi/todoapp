import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useNavigate();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
    setTaskName(currentContact.taskName);
    setTimeTaken(currentContact.timeTaken);
    setStatus(currentContact.status);
    setTimeBoundary(currentContact.boundTime);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [taskName, setTaskName] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [status, setStatus] = useState("");
  const [timeBoundary, setTimeBoundary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var today = new Date();
    today.setMinutes(today.getMinutes() + parseInt(timeTaken, 10));
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !name) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }

    const data = {
      id: currentContact.id,
      email,
      name,
      taskName,
      timeTaken,
      status,
      boundTime: today
    };

    updateContact(data);
    toast.success("Data updated successfully!!");
    history("/");
  };
  console.log(status, "status");
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={taskName}
                  placeholder={"Task Name"}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="inputState" class="form-label">
                  Select Time ( only in Mins)
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Time take to complete a task"
                  value={timeTaken}
                  onChange={(e) => setTimeTaken(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="inputState" class="form-label">
                  Status
                </label>
                <select
                  id="inputState"
                  class="form-select p-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="missed">Missed</option>
                </select>
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center"> No To-Do Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
