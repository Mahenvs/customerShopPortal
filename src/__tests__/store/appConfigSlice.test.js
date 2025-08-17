import appConfigReducer, {
  setTheme,
  setUserName,
  setMessage,
  resetAppConfig,
  setLoggedIn,
  setBottomMessage,
  setVerifiedUser,
  initialState
} from '../../store/appConfigSlice';

describe('App Config Slice', () => {
  test('should return the initial state', () => {
    expect(appConfigReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle setTheme', () => {
    const action = setTheme('dark');
    const state = appConfigReducer(initialState, action);
    expect(state.theme).toBe('dark');
  });

  test('should handle setUserName', () => {
    const userPayload = { name: 'John', email: 'john@example.com' };
    const action = setUserName(userPayload);
    const state = appConfigReducer(initialState, action);
    expect(state.user).toEqual(userPayload);
  });

  test('should handle setMessage', () => {
    const messagePayload = {
      message: 'Something went wrong',
      status: true,
      type: 'error'
    };
    const action = setMessage(messagePayload);
    const state = appConfigReducer(initialState, action);
    expect(state.popUp).toEqual(messagePayload);
  });

  test('should handle setBottomMessage', () => {
    const bottomMessagePayload = {
      message: 'Bottom alert',
      status: false,
      type: 'info'
    };
    const action = setBottomMessage(bottomMessagePayload);
    const state = appConfigReducer(initialState, action);
    expect(state.bottomPopUp).toEqual({
      bottommessage: 'Bottom alert',
      status: false,
      type: 'info'
    });
  });

  test('should handle setLoggedIn', () => {
    const action = setLoggedIn(true);
    const state = appConfigReducer(initialState, action);
    expect(state.isLoggedIn).toBe(true);
  });

  test('should handle setVerifiedUser', () => {
    const action = setVerifiedUser(false);
    const state = appConfigReducer(initialState, action);
    expect(state.isVerifiedUser).toBe(false);
  });

  test('should handle resetAppConfig', () => {
    const modifiedState = {
      ...initialState,
      popUp: {
        message: 'Old Message',
        status: true,
        type: 'warning'
      }
    };
    const action = resetAppConfig();
    const state = appConfigReducer(modifiedState, action);
    expect(state.popUp).toEqual({
      message: null,
      status: false,
      type: null
    });
  });
});
