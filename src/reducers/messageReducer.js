const messageReducer = (state, action) => {
  switch (action.type) {
    case 'INFO':
      return {
        ...state,
        status: 'info',
        message: action.payload,
      };
    case 'ERROR':
      return {
        ...state,
        status: 'negative',
        message: action.payload,
      };
    case 'SUCCESS':
      return {
        ...state,
        status: 'positive',
        message: action.payload,
      };
    case 'CLEAR':
      return {
        ...state,
        status: '',
        message: '',
      };
    default:
      return state;
  }
};

export default messageReducer;
