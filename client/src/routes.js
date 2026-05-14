import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
// HOC
import MainLayout from './hoc/mainLayout';
const Routes = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Switch>
                    <Route path='/' component={Home}/>
                </Switch>
            </MainLayout>
        </BrowserRouter>
    )
}
export default Routes;