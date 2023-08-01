// navigation.js
import { useNavigate } from 'react-router-dom';
export const NavigateTo = (path) => {
const  navigate = useNavigate();
 return navigate(path);
};

