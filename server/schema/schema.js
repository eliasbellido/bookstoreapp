const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){                
                //return  _.find(authors, { id: parent.authorid });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, { authorid: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { 
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                //code to get data from db/other source
                console.log(typeof(args.id));
                //return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
               // return _.find(authors, { id:args.id });
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                //return books;
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});