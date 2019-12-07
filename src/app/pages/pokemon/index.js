import React from 'react'
import { useParams } from "react-router-dom";
import {bindActionCreators} from 'redux';
import {useSelector, connect} from 'react-redux'
import { MetroSpinner } from "react-spinners-kit";
import { getPokemonDetail } from '../../store/app.actions';
import './style.css'

const PokemonDetail = (props) => {
    const { pokemonData, loadingDetail, errorDetail, fetchedDetail } = useSelector( state => state )
    const { name } = useParams()

    if ( !loadingDetail && !fetchedDetail) {
        props.getPokeDetail(name)
    }
    
    if( loadingDetail || !fetchedDetail ){ 
        return (<div className='spinnerContainer' align='center'>
            <MetroSpinner color="#bd0000"/>
            <h5>Loading information of {name}...</h5>
        </div>)
    } else {
        if (errorDetail) {
            return(<h4>
                There was an error loading the info of {name} :(
            </h4>)
        }
        return(<div>
            <div className='imagesRow'>
                <div align='center' className='imageHolder'>
                    <img src={pokemonData.sprites.front_default} alt={`${name} front`}/>
                </div>
                <div align='center' className='imageHolder'>
                    <img src={pokemonData.sprites.back_default} alt={`${name} back`}/>
                </div>
            </div>
            <div className='title' align='center'>
                <h4>Abilities</h4>
            </div>
            <div className='row'>
                {pokemonData.abilities.map(ability => <div align='center' key={ability.ability.name} className='col'>
                    {`${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.substring(1)}`}
                </div>)}
            </div>
            <div className='title' align='center'>
                <h4>Stats</h4>
            </div>
            <div className='row'>
                {pokemonData.stats.map(stat => <div align='center' key={stat.stat.name} className='col'>
                    {`${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.substring(1)}: `} <b>{stat.base_stat}</b>
                </div>)}
            </div>
            <div className='title' align='center'>
                <h4>Type</h4>
            </div>
            <div className='row'>
                {pokemonData.types.map(type => <div align='center' key={type.type.name} className='col'>
                    {`${type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1)}`}
                </div>)}
            </div>            
        </div>)
    }     
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getPokeDetail:getPokemonDetail
    }, dispatch)
  }

export default connect(null,matchDispatchToProps)(PokemonDetail)