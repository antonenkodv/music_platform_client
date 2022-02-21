import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import './App.scss';
import './index.scss';
import Routes from './routes'
import reportWebVitals from './reportWebVitals';
import {InMemoryCache, ApolloClient, ApolloProvider, ApolloLink, from, HttpLink} from "@apollo/client";
import {Provider} from "react-redux";
import {rootReducer} from "./store/reducers";
import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createUploadLink} from 'apollo-upload-client'
import {onError} from "@apollo/client/link/error";

const uploadLink = createUploadLink({uri: 'http://localhost:5000/graphql'});

const httpLink = new HttpLink({uri: 'http://localhost:5000/graphql'})

const requestMiddleware = new ApolloLink((operation, forward) => {//call before eacch request
    operation.setContext(({headers = {}}) => ({
        headers: {
            ...headers,
            "x-token": localStorage.getItem("token") || "",
            "x-refresh-token": localStorage.getItem("refreshToken") || ""
        }
    }))
    return forward(operation)
})

const responseMiddleware = new ApolloLink((operation, forward) => { // call after eache request come back
    return forward(operation).map(response => {
        const context = operation.getContext()
        const token = context.response.headers.get("x-token")
        const refreshToken = context.response.headers.get("x-refresh-token")

        token && localStorage.setItem("token",token)
        refreshToken && localStorage.setItem("refreshToken",refreshToken)
        return response;
    })
})

const errorLink = onError(({graphQLErrors , networkError }) =>{

    if (graphQLErrors)
        graphQLErrors.forEach(({message , locations , path})=>
        console.log(`[GRAPHQL ERROR] MESSAGE :${message}, LOCATION: ${locations} , Path : ${path}`)
        )
    if (networkError) console.log(`[NETWORK ERROR]: ${networkError}`);

})
const apolloClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
    link: from([requestMiddleware , responseMiddleware , uploadLink , errorLink , httpLink])//upload link should be at the end???
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

const App = (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <Routes/>
        </Provider>
    </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
