import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import BoardList from "./BoardList";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">목록</Link>
                        </li>
                    </ul>
                </nav>

                <Route exact path='/' component={BoardList}/>
            </div>
        </Router>
    );
}

export default App;
