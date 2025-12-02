import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Genre from '../pages/Genre';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="genre/:slug" element={<Genre />} />
                <Route
                    path="catalog"
                    element={<div className="pt-32 text-center text-slate-900 dark:text-slate-200 transition-colors">Catalog Page Coming Soon</div>}
                />
                <Route
                    path="pricing"
                    element={<div className="pt-32 text-center text-slate-900 dark:text-slate-200 transition-colors">Pricing Page Coming Soon</div>}
                />
            </Route>
        </Routes>
    );
}
