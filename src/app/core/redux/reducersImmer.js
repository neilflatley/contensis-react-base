// Import feature reducers to be included with application startup
// import userReducer from '~/features/login/redux/reducers';
import testImmerReducer from '~/features/testImmer/redux/reducer';
// const featureReducers = { user: userReducer };

const featureReducersImmer = {
  testImmer: testImmerReducer,
};

export default { ...featureReducersImmer };
