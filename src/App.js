import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from "./BlogDetails";
import Notfound from "./Notfound";
import EditBlogs from "./EditBlogs";

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/create">
                <Create />
            </Route>
            <Route path="/blogs/:id">
                <BlogDetails />
            </Route>
            <Route path="/edit/:id">
                <EditBlogs />
            </Route>
            <Route path="*">
                <Notfound />
            </Route>
          </Switch>          
        </div>    
    </div>
    </Router>
  );
}

export default App;
