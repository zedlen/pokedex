import { LOADING_POKE_LIST, FAILED_POKE_LIST, FETCHED_POKE_LIST, LOADING_POKE_DETAIL, FAILED_POKE_DETAIL, FETCHED_POKE_DETAIL } from "./constants"

const initialState = {
    loading: false,
    data:{},
    error: false,
    fetched: false,
    page:1,
    pokemonData:{},
    loadingDetail:false,
    errorDetail:false,
    fetchedDetail:false,
}

const appReducer = (state = initialState, action) => {        
    switch (action.type) {
        case LOADING_POKE_LIST:
            return {
                ...state,
                loading:true,
                pokemonData:{},
                loadingDetail:false,
                errorDetail:false,
                fetchedDetail:false,
            }
        case FAILED_POKE_LIST:
                return {
                    ...state,
                    loading:false,
                    error:true,
                    pokemonData:{},
                    loadingDetail:false,
                    errorDetail:false,
                    fetchedDetail:false,
                }
        case FETCHED_POKE_LIST:                
                return {
                    ...state,
                    loading:false,
                    data: action.data,
                    fetched: true,
                    page: state.page + action.page,
                    pokemonData:{},
                    loadingDetail:false,
                    errorDetail:false,
                    fetchedDetail:false,
                }
        case LOADING_POKE_DETAIL:
                return {
                    ...state,
                    loadingDetail:true,
                    loading: false,
                    data:{},
                    error: false,
                    fetched: false,
                }
        case FAILED_POKE_DETAIL:
                return {
                    ...state,
                    loadingDetail:false,
                    errorDetail:true,
                    loading: false,
                    data:{},
                    error: false,
                    fetched: false,
                }
        case FETCHED_POKE_DETAIL:
                return {
                    ...state,
                    loadingDetail:false,
                    pokemonData: action.data,
                    fetchedDetail: true,
                    loading: false,
                    data:{},
                    error: false,
                    fetched: false,                       
                }
        default:
            return state
    }
  }
  
  export default appReducer