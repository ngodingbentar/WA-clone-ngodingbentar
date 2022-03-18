export const initialState = {
  user: null,
  activeTab: ''
}

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ACTIVE: "SET_ACTIVE"
}

const reducer = (state, action) => {
  console.log('action', action)
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      }
    case actionTypes.SET_ACTIVE:
      return {
        ...state,
        activeTab: action.activeTab
      }
    default:
      return state
  }
}

export default reducer