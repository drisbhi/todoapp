const initialState = [
  {
    id: 0,
    name: "Raman Sharma",
    email: "email@email.com",
    taskName: "string",
    timeTaken: 0,
    status: "pending",
    boundTime: ""
  },
  {
    id: 1,
    name: "Test Name",
    email: "test@test.com",
    taskName: "test data",
    timeTaken: 0,
    status: "pending",
    boundTime: " "
  }
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_STATUS":
      const id = state.findIndex((obj) => obj.id === action.payload);
      state[id].status = "done";
      const statusUpdate = state.filter((contact) =>
        contact.status === ""
          ? (contact.status = "done") // Object.assign(contact, (action.payload.status = "done"))
          : contact
      );
      state = statusUpdate;
      return state;
    case "UPDATE_STATUS_DATE":
      var date1 = new Date();
      const statusUpdate1 = state.filter((contact) =>
        date1.getTime() > contact.boundTime && contact.status !== "done"
          ? (contact.status = "missed")
          : contact
      );

      state = statusUpdate1;
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [
        {
          name: null,
          email: null,
          taskName: null,
          timeTaken: null,
          status: "pending",
          boundTime: null
        }
      ];
      return state;
    default:
      return state;
  }
};
