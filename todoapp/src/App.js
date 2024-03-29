import React from 'react';
import Navbar from './components/NavBar';

import { BrowserRouter, Route, HashRouter } from "react-router-dom";
import HomePage from './components/home/HomePage';
import NewsPage from './components/news/NewsPage';
import NewsPost from './components/news/NewsPost';
import SketchPage from './components/sketchit/SketchPage';
import CroppedShape from './components/sketchit/CroppedShape'

/* 
ACKNOWLEDGEMENT: Followed The Net Ninja tutorial to do this 

The Net Ninja features:
1. Creating todo form
2. Adding new todo
3. Listing todos
4. Deletion

My added features:
1. Due time selection
2. Update operation added
3. Modern looking design
4. Latest news

*/

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [
        { id: 1, content: "Design svg", status: 0 },
        { id: 2, content: "Integrate stuff", status: 1 },
      ]
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/sketchit" component={SketchPage} />
          <Route path="/news/:news_id" component={NewsPost}/>
          <Route path="/sketchit/:shape_id" component={CroppedShape}/>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
