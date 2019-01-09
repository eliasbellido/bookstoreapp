import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorid: ''
        };
    }
    
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        console.log(this.props);
        if(data.loading){
            return( <option disabled>Cargando Autores...</option>)
        }else{
            return data.authors.map(author => {
                return ( <option key={author.id} value={author.id}>{author.name}</option>);
            })
        }
    }
    
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name: this.state.name,
                genre: this.state.genre,
                authorid: this.state.authorid
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }
    render() {      
      return (
        <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
            <div className="field">
                <label>Nombre del libro:</label>
                <input type="text" onChange = {
                    (e) => this.setState({name: e.target.value})
                }/>
            </div>

            <div className="field">
                <label>Género:</label>
                <input type="text" onChange = {
                    (e) => this.setState({genre: e.target.value})
                }/>
            </div>

            <div className="field">
                <label>Autor:</label>
                <select onChange = {
                    (e) => this.setState({authorid: e.target.value})
                }>
                    <option>Seleccione autor</option>
                    {this.displayAuthors()}
                </select>
            </div>

            <button>+</button>
        </form>
      )
    }
  }

  export default compose(
      graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
      graphql(addBookMutation, {name: "addBookMutation"})
  )(AddBook);