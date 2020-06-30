import React from 'react';
import Axios from 'axios';
import Item from './Item';
import logo from './styles/logo.svg';
import CookBoardLogo from './styles/CookBoardLogo.png';
import './styles/App.css';

class RecipySearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: '',
            dish: '',
            page: 1,
            results: [],
            loading: true
        }
    }

    componentDidMount() {
        Axios.get(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=mushrooms&q=${this.state.dish}&p=${this.state.page.toString()}`)
        .then(this.handleSuccess)
        .catch((error)=>console.log(error)) 
    }

    handleChange = (e) => {
        if(e.target.name === 'dish'){
            this.setState({dish: e.target.value})
        }else if (e.target.name === 'ingredients'){
            this.setState({ingredients: e.target.value})
        }
        
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({page: 1})

        if(this.state.dish.trim() !== '' || this.state.ingredients.trim() !== '' ){
            this.fetchData(this.state.page);
        }
    }

    handleSuccess = (response) => {
        this.setState({results: response.data.results, loading: false})

    }

    fetchData = (page) => {
        if(this.state.ingredients.trim() !== '') {
            let str = this.state.ingredients;
            let str2 = str.split(' ').join(',');
            Axios.get(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${str2}&q=${this.state.dish}&p=${page.toString()}`)
            .then(this.handleSuccess)
            .catch((error)=>console.log(error))   
        }else{
            Axios.get(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${this.state.ingredients}&q=${this.state.dish}&p=${page.toString()}`)
            .then(this.handleSuccess)
            .catch((error)=>console.log(error))               
        }
    }

    handleRender = () => {
        if(this.state.loading){
            return (
                <div>
                    <p className='message'>
                        Application is loading, please wait...
                    </p>
                    <img src={logo} className="App-logo" alt="logo" />
                 </div>
            );
        }

        if (this.state.results.length !== 0){
            return this.state.results.map(el => {
                return (
                    <div key={el.href}>
                        <Item recipy={el} />
                    </div>
                );
            });
        }else{
            return (
                <div className='message'>
                    <p>Sorry nothing was found for {this.state.dish} {this.state.ingredients}</p>
                </div>
            );
        }
    }

    nextPage = (e) => {
        let newPage = this.state.page;
        if(e.target.value === 'next'){
            newPage += 1;
            this.setState({page: newPage, loading: true});          
        }else if (e.target.value === 'previous' && newPage > 1){
            newPage -= 1;
            this.setState({page: newPage, loading: true});
        }
        this.fetchData(newPage);
    }


    render () {
        return (
            <div className='App'>
                <div onSubmit={this.handleSubmit}>
                    <form className='form'>
                        <label htmlFor='dish'>Type of dish:</label>
                        <input className='input' type='text' name='dish' onChange={this.handleChange} value={this.state.dish}></input> <br />
                        <label htmlFor='ingredients'> Ingredients:</label>
                        <input className='input' type='text' name='ingredients' onChange={this.handleChange} placeholder='Ex. mushrooms' value={this.state.ingredients}></input> <br />
                        <button className='button' type='submit'>SUBMIT</button>
                    </form>
                    <img className='cookboard' src={CookBoardLogo} alt="" />
                    <div className='content'>
                        {this.handleRender()}
                    </div>
                    <p className='sign'>Bon Apetit</p>
                </div>
                <div className='bottom'>
                    <button className='button' value='previous' onClick={this.nextPage}>PREVIOUS</button>
                    <span> Page: {this.state.page.toString()} </span>
                    <button className='button' value='next' onClick={this.nextPage}>NEXT</button>
                </div>
            </div>
        );
    }
}

export default RecipySearchForm