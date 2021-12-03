import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ contacts, deleteContact, doneContact, timeChecking }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      timeChecking();
    }, 10000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add New Task
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Task Name</th>
                <th scope="col">Time Taken </th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.taskName}</td>
                    <td>{contact.timeTaken}</td>
                    <td>{contact.status}</td>
                    <td>
                      <div className="d-flex p-2">
                        <Link
                          to={`/edit/${contact.id}`}
                          className="btn btn-sm btn-primary m-1 d-inline-flex p-2"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteContact(contact.id)}
                          className="btn btn-sm btn-danger m-1 d-inline-flex p-2"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => doneContact(contact.id)}
                          className="btn btn-sm btn-success m-1 d-inline-flex p-2 "
                        >
                          Done
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No Data found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
  doneContact: (id) => {
    dispatch({ type: "UPDATE_STATUS", payload: id });
  },
  timeChecking: (id) => {
    dispatch({ type: "UPDATE_STATUS_DATE", payload: id });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
