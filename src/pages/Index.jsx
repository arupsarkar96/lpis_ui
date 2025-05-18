import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Index = () => {
    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex flex-grow-1">
                <Sidebar />
                <main className="flex-grow-1 bg-light" style={{ marginLeft: '250px' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Index;
