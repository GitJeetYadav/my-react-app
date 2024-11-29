import slice, {
  setIsLoggedIn,
  setUser,
  setUserRole,
  setUserDataList,
  addUserData,
  editUserData,
  getIsLoggedIn,
  getUser,
  getUserRole,
  getUserDataList,
} from '../store/hooks';

describe('data slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      user: null,
      userRole: "admin",
      userDataList: [],
    };
  });

  test('should handle initial state', () => {
    const action = { type: undefined };
    const state = slice.reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  test('should handle setIsLoggedIn', () => {
    const action = setIsLoggedIn(true);
    const state = slice.reducer(initialState, action);
    expect(state.isLoggedIn).toBe(true);
  });

  test('should handle setUser', () => {
    const user = { id: 1, name: 'John Doe' };
    const action = setUser(user);
    const state = slice.reducer(initialState, action);
    expect(state.user).toEqual(user);
  });

  test('should handle setUserRole', () => {
    const action = setUserRole('user');
    const state = slice.reducer(initialState, action);
    expect(state.userRole).toBe('user');
  });

  test('should handle setUserDataList', () => {
    const userDataList = [{ id: 1, name: 'John Doe' }];
    const action = setUserDataList(userDataList);
    const state = slice.reducer(initialState, action);
    expect(state.userDataList).toEqual(userDataList);
  });

  test('should handle addUserData', () => {
    const newUserData = { id: 2, name: 'Jane Smith' };
    const action = addUserData(newUserData);
    const state = slice.reducer(
      { ...initialState, userDataList: [{ id: 1, name: 'John Doe' }] },
      action
    );
    expect(state.userDataList).toEqual([{ id: 1, name: 'John Doe' }, newUserData]);
  });

  test('should handle editUserData', () => {
    const updatedUserData = { id: 1, name: 'John Doe Updated' };
    const action = editUserData(updatedUserData);
    const state = slice.reducer(
      { ...initialState, userDataList: [{ id: 1, name: 'John Doe' }] },
      action
    );
    expect(state.userDataList).toEqual([updatedUserData]);
  });

  test('editUserData should not modify userDataList if id is not found', () => {
    const updatedUserData = { id: 3, name: 'Nonexistent User' };
    const action = editUserData(updatedUserData);
    const state = slice.reducer(
      { ...initialState, userDataList: [{ id: 1, name: 'John Doe' }] },
      action
    );
    expect(state.userDataList).toEqual([{ id: 1, name: 'John Doe' }]);
  });

  // Selectors
  test('getIsLoggedIn selector', () => {
    const state = { data: { ...initialState, isLoggedIn: true } };
    expect(getIsLoggedIn(state)).toBe(true);
  });

  test('getUser selector', () => {
    const user = { id: 1, name: 'John Doe' };
    const state = { data: { ...initialState, user } };
    expect(getUser(state)).toEqual(user);
  });

  test('getUserRole selector', () => {
    const state = { data: { ...initialState, userRole: 'user' } };
    expect(getUserRole(state)).toBe('user');
  });

  test('getUserDataList selector', () => {
    const userDataList = [{ id: 1, name: 'John Doe' }];
    const state = { data: { ...initialState, userDataList } };
    expect(getUserDataList(state)).toEqual(userDataList);
  });
});

  