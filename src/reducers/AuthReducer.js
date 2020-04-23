const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userIsAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        userIsAuthenticated: false,
        user: {},
      };
    case 'UPDATE':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
