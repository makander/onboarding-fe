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
    default:
      return state;
  }
};

export default authReducer;
