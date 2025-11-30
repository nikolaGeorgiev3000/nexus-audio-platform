import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
