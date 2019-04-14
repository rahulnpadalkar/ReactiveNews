import React, { Component } from 'react';
import './App.css';
import './fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from './components/AppBar/AppBar';
import PostList from './components/PostList/PostList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab:"New"
    }
  }

  changeState(tabName) {
    this.setState({
      activeTab: tabName
    });
  }

  render() {
    return (
      <div className="container-fluid" >
        <AppBar parentStateModifier={this.changeState.bind(this)} activeTab={this.state.activeTab}/>
        <PostList activeTab={this.state.activeTab}/>
      </div>
    );
  }
}

export default App;
