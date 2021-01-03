import React from 'react';
import HomePage from '../../Route/HomePage';
import AdminPage from '../../Route/Admin'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class App extends React.PureComponent {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
