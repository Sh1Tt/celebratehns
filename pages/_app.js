import React from "react";

import App from "next/app";

import Router from "next/router";

import UserContext from "../components/context/User";

import Layout from "../components/Layout";

import "../styles/globals.css";

export default class MyApp extends App {
  initialState = {
    user: null,
  };

  state = this.initialState;

  store_id = 
  {
    username: 'coolapp-user',
  };

  componentDidMount = () =>
  {
    const user = localStorage.getItem( this.store_id.username );

    if ( user )
    {
      this.setState( {
        user
      } );
  
    }
    else
    {
      // Router.push( '/signin' );
  
    }
  
  }

  signIn = ( username, passwd ) => 
  {
    // Authentication function here

    localStorage.setItem( this.store_id.username, username );

    this.setState(
      { 
        user: username
      }, () => 
      { 
        // Router.push( '/dashboard' );
      }
    );

  }

  signOut = () =>
  {
    localStorage.removeItem( this.store_id.username );
    
    this.setState( this.initialState );

    Router.push( '/' );

  }

  render()
  {
    const { Component, pageProps } = this.props

    return (
      <UserContext.Provider value={ { 
          user: this.state.user,
          signIn: this.signIn,
          signOut: this.signOut
        } }>
        
        <Layout>
            <Component {...pageProps} />
        </Layout>
      
      </UserContext.Provider>
    );

  }

}