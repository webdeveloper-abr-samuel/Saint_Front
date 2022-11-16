const initialState = {
  products: [],
  business: [],
  location: [],
  commercial: [],
  abrasive:[],
  productsHereTranfer:[],
  clients: []
};
const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case "PRODUCTS_CHANGE": return {
      ...state,
      products:action.payload
    }
    case "BUSINESS_CHANGE": return {
      ...state,
      business:action.payload
    }
    case "LOCATION_CHANGE": return {
      ...state,
      location:action.payload
    }
    case "COMMERCIAL_CHANGE": return {
      ...state,
      commercial:action.payload
    }
    case "ABRASIVE_CHANGE": return {
      ...state,
      abrasive:action.payload
    }
    case "PRODUCTS_HERETRANFER": return {
      ...state,
      productsHereTranfer:action.payload
    }
    case "DATA_CLIENTS": return {
      ...state,
      clients:action.payload
    }
  }
  return state;
}
export default productsReducer;