import React, { Component } from 'react';
import Duel from './components/Duel';
import Upload from './components/Upload';
import Home from './components/Home';
import Meme from './components/Meme';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import { Switch, Route, Redirect } from 'react-router-dom';
import { History } from 'history';
import './App.scss';

interface Props {
    history: History
}

class App extends Component<Props> {
    render() {
        return (
            <div className="app">
                <Header></Header>

                <SideMenu></SideMenu>
                
                <Switch>
                    <Route path="/memes/:id" component={Meme}/>
                    <Route path="/upload" component={Upload}/>
                    <Route path="/duel" component={Duel}/>
                    <Route path="/" component={Home}/>
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default App;
