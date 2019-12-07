import React from 'react'
import { MetroSpinner } from "react-spinners-kit";
import {bindActionCreators} from 'redux';
import {useSelector, connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { getPokemonList } from '../../store/app.actions';
import './style.css'

const HomePage = (props) =>{    
    const { loading, error, data, fetched, page } = useSelector(state=>state)
    if ( !loading && !fetched) {
        props.getPokes()
    }    
    if( loading || !fetched ){ 
        return (<div className='spinnerContainer' align='center'>
            <MetroSpinner color="#bd0000"/>
        </div>)
    } else {
        if (error) {
            return(<h4>
                There was an error loading the list :(
            </h4>)
        }
        return(<div className='containerList'>
            {data.results.map((pokemon)=><Link to={`/pokemon/${pokemon.name}`} className='pokemon item' align='center' key={pokemon.name}>
                <div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[pokemon.url.split('/').length - 2]}.png`}/>
                </div>
                <div>
                    {`#${pokemon.url.split('/')[pokemon.url.split('/').length - 2]} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}`}
                </div>                                                 
            </Link>)}
            <div className='pagination'>
                <div className='buttonPagination previousPage' onClick={()=> data.previous?props.getPokes(data.previous.replace('https://pokeapi.co',''),-1):null}>
                    <span>{data.previous ? 'Previous' : null}</span>
                </div>
                <div className='buttonPagination' align='center'>
                    <span>Page {page} of {Math.ceil(data.count/20)}</span>
                </div>
                <div className='buttonPagination nextPage' align='right' onClick={()=> data.next?props.getPokes(data.next.replace('https://pokeapi.co',''),1):null}>
                    <span>{data.next ? 'Next' : null}</span>
                </div>
            </div>
        </div>)
    } 
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getPokes:getPokemonList
    }, dispatch)
  }
  
export default connect(null,matchDispatchToProps)(HomePage)