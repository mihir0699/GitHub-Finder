import React , {Fragment, useState}from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from 'axios';
import Search from "./components/users/search";
import Alert from "./components/layout/alert";
import User from "./components/users/user";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/pages/about'

const App = ()=> {
  const [users, setUsers]= useState([]);
  const [user, setUser]= useState({});
  const [repos, setRepos]= useState([]);
  const [loading, setLoading]= useState(false);
  const [alert, setAlert] = useState(null);
  

 /*async componentDidMount(){
   this.setState({
     loading: true
   })
     const res =  await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     this.setState({users: res.data, loading: false});
  }
  */
 const getUserRepos = async(userName)=>{
  setLoading(true);
  const res = await axios.get(`http://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  setRepos(res.data);
  setLoading(false);
}
  const searchUsers =  async text =>{
    setLoading(true);
    const res = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  }

const getUser = async(userName)=>{
  setLoading(true);
  const res = await axios.get(`http://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  setUser(res.data);
  setLoading(false);
}
const clearUsers = ()=>{
  setLoading(false);
  setUsers([]);
}
const showAlert = (msg, type)=>{
 setAlert({msg, type});
  setTimeout(() => setAlert(null), 2000);
  
}

    return (
      <Router>
      <div className='App'>
        <Navbar title='Github Finder' />
        <div className= "container">
          <Alert alert= {alert} />
          <Switch>
            <Route exact path = '/' render = {props =>(
              <Fragment>
             <Search searchUsers={searchUsers} clearUsers = {clearUsers}  
              showClear={users.length>0? true:false}
                setAlert = {showAlert}
                />
              <Users loading = {loading} users = {users} />
              </Fragment>
            )} />

          <Route exact path='/about' component={About} />
          <Route exact path ='/users/:login' render = {props=>(
            <User {...props} getUser = {getUser} user={user} getUserRepos = {getUserRepos} repos= {repos} loading={loading} />
          )} />
          </Switch>
        
        </div>
      </div>
      </Router>
    );
  }


export default App;
