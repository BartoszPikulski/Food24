import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useFirebaseAuth();
    const location = useLocation();

    if (loading) {
        return <p>Loading...</p>
    }

    if (user && user?.uid) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;