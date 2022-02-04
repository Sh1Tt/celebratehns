import React from "react";

import App from "next/app";

import Router from "next/router";

import UserContext from "../components/context/User";

import Layout from "../components/Layout";

import "../styles/globals.css";

import "../styles/emojipicker.css";

export default class MyApp extends App {
  initialState = null;

  state = this.initialState;

  store_id = 
  {
    username: 'coolapp-user',
    used_emoji: 'coolapp-user-emoji'
  };

  componentDidMount = () =>
  {
    // .. code 
  }

  storeEmoji = emoji =>
  {
    const storeEmojis = this.getStoreEmoji();

    const usedEmoji = storeEmojis ? [ emoji , ...storeEmojis.filter( storeEmoji => storeEmoji != emoji ) ] : [ emoji ];

    localStorage.setItem( this.store_id.used_emoji, usedEmoji.filter( ( e, i ) => i < 30 ).join() );

  }

  getStoreEmoji = () =>
  {
    if ( !localStorage.getItem( this.store_id.used_emoji ) ) localStorage.setItem( this.store_id.used_emoji, "" );

    const storeEmojis = localStorage.getItem( this.store_id.used_emoji ).replace( /[\"]/g, "" ) || null;

    return storeEmojis ? [ ...storeEmojis.split( /,/ ) ] : [];

  }

  render()
  {
    const { Component, pageProps } = this.props

    return (
      <UserContext.Provider value={ { 
          storeEmoji: this.storeEmoji,
          getStoreEmoji: this.getStoreEmoji
        } }>
        
        <Layout>
            <Component {...pageProps} />
        </Layout>
      
      </UserContext.Provider>
    );

  }

}