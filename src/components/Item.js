import React from 'react';
import './styles/item.css';
import noImage from './styles/no-image.png'

const Item = (props) => {
    let image = props.recipy.thumbnail ? props.recipy.thumbnail : noImage;
    return ( 
        <div className='card'>
            <p className='title'>
            <a href={props.recipy.href} target='_blank' rel='noopener noreferrer' className='title'>{props.recipy.title}</a>
            </p>
            <div>
                <img alt='' className='thumbnail' src={image}></img>
            </div>
            <div className='info'>
                <strong>Ingredients: </strong>{props.recipy.ingredients}
            </div>
        </div>
    );
}

export default Item;