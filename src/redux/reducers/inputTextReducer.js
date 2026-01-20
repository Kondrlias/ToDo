const initialValue = {
  text: '',
};

const inputTextReducer = (store = initialValue, action) => {
  switch (action.type) {
    case 'change':
      return { ...store, text: action.payload };
    case 'clear':
      return { text: '' };
    default:
      return store;
  }
};

export default inputTextReducer;
