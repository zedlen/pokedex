import axios from 'axios';
import { LOADING_POKE_LIST, FAILED_POKE_LIST, FETCHED_POKE_LIST, LOADING_POKE_DETAIL, FETCHED_POKE_DETAIL, FAILED_POKE_DETAIL } from './constants';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/',
});

export function getPokemonList(url = '/api/v2/pokemon/', move=0){
    return function (dispatch){
        dispatch({type:LOADING_POKE_LIST})        
        if (url.includes('?')) {
            const auxUrl = url.split('?')
            const params = auxUrl[1].split('&')            
            url = auxUrl[0] + '?'
            for (let index = 0; index < params.length; index++) {
                const element = params[index];
                if (element.includes('limit')) {
                    url += 'limit=20&'
                } else {
                    url += element+'&'
                }
                
            }
        }
        axiosInstance.get(url)
            .then(response => {
                if (response.status === 200) {                    
                    dispatch({type:FETCHED_POKE_LIST, data: response.data, page: move})
                } else {
                    dispatch({type: FAILED_POKE_LIST})    
                }
            })
            .catch( err => {
                console.error('error al obtener lista de pokemones', err)
                dispatch({type: FAILED_POKE_LIST})
            })
    }
}

export function getPokemonDetail(name=''){
    return function (dispatch){
        dispatch({type:LOADING_POKE_DETAIL})                     
        axiosInstance.get(`/api/v2/pokemon/${name}`)
            .then(response => {
                if (response.status === 200) {
                    
                    dispatch({type:FETCHED_POKE_DETAIL, data: response.data})
                } else {
                    dispatch({type: FAILED_POKE_DETAIL})    
                }
            })
            .catch( err => {
                console.error('error al obtener lista de pokemones', err)
                dispatch({type: FAILED_POKE_DETAIL})
            })
    }
}