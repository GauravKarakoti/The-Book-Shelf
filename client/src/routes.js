import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Users/login';
import Logout from './components/Users/logout';
// ADMIN
import Admin from './components/Users/Admin';
import AddPosts from './components/Users/Admin/Posts/add';
import EditPost from './components/Users/Admin/Posts/edit';
import AdminPosts from './components/Users/Admin/Posts/posts';
// HOC
import MainLayout from './hoc/mainLayout';
import Auth from './hoc/auth';
import Article from './components/Article';
import Register from './components/Users/register';
const Routes = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Switch>
                    <Route path='/admin/posts/edit/:id' component={Auth(EditPost, true)}/>
                    <Route path='/admin/posts/create' component={Auth(AddPosts, true)}/>
                    <Route path='/admin/posts' component={Auth(AdminPosts, true)}/>
                    <Route path='/article/:id' component={Auth(Article)}/>
                    <Route path='/admin' component={Auth(Admin, true)}/>
                    <Route path='/logout' component={Auth(Logout, true)}/>
                    <Route path='/login' component={Auth(Login, false)}/>
                    <Route path='/register' component={Auth(Register, false)}/>
                    <Route path='/' component={Auth(Home)}/>
                </Switch>
            </MainLayout>
        </BrowserRouter>
    )
}
export default Routes;