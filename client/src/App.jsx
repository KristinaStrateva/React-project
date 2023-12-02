import { Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/authContext';
import Path from './utils/paths';

import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import Navigation from './components/Navigation/Navigation';
import CollectionPage from './components/CollectionPage/CollectionPage';
import About from './components/AboutPage/About';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Logout from './components/Logout/Logout';
import DetailsPage from './components/DetailsPage/DetailsPage';
import EditPage from './components/DetailsPage/EditPage/EditPage';
import AddItemPage from './components/AddItemPage/AddItemPage';

import styles from './App.module.css';
import AuthGuard from './components/Guards/AuthGuard';
import MyItems from './components/MyItems/MyItems';

export default function App() {

    return (
        <ErrorBoundary>
            <AuthProvider>
                <div className={styles["home-container"]}>
                    <Navigation />

                    <Routes>
                        <Route path={Path.HomePage} element={<HomePage />} />
                        <Route path={Path.LoginPage} element={<LoginPage />} />
                        <Route path={Path.RegisterPage} element={<RegisterPage />} />
                        <Route path={Path.AboutPage} element={<About />} />
                        <Route path={Path.HomeDecorationsPage} element={<CollectionPage />} />
                        <Route path={Path.GiftSetsPage} element={<CollectionPage />} />
                        <Route path={Path.CustomTextOnWoodPage} element={<CollectionPage />} />
                        <Route path={Path.DetailsPage} element={<DetailsPage />} />

                        <Route element={<AuthGuard />}>
                            <Route path={Path.Logout} element={<Logout />} />
                            <Route path={Path.EditPage} element={<EditPage />} />
                            <Route path={Path.AddItemPage} element={<AddItemPage />} />
                            <Route path={Path.MyItems} element={<MyItems />} />
                        </Route>
                    </Routes>

                    <Footer />
                </div>
            </AuthProvider>
        </ErrorBoundary>
    )
};