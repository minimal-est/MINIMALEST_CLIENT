import {jwtDecode} from "jwt-decode";

const accessToken = localStorage.getItem('accessToken');
const decodedToken = accessToken ? jwtDecode(accessToken) : null;
const email = decodedToken?.sub ?? '';

export default email;