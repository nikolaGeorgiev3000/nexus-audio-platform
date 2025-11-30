import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="catalog" element={<div className="pt-32 text-center">Catalog Page Coming Soon</div>} />
                <Route path="pricing" element={<div className="pt-32 text-center">Pricing Page Coming Soon</div>} />
            </Route>
        </Routes>
    );
}
