import httpService from './http.service';
import { config } from '../config';
import modalService from './modalDialog.service';

const login = async (usuario, clave, navigateToComponent) => {
    let resp = await httpService.post(`${config.urlServidor}/api/login`, { usuario, clave });

    if(resp.data?.accessToken) {
        sessionStorage.setItem("usuarioLogeado", usuario);
        sessionStorage.setItem("accessToken", resp.data.accessToken);
        sessionStorage.setItem("refreshToken", resp.data.refreshToken);

        if(CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);
        {
            navigateToComponent();
        }
    }else{
        if(CambioUsuarioLogueado) CambioUsuarioLogueado(null);

        modalService.Alert("Usuario o Clave incorrectos");
    }
};

const logout = () => {
    sessionStorage.removeItem("usuarioLogeado");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    if(CambioUsuarioLogueado) CambioUsuarioLogueado(null);
};

const getUsuarioLogueado = () => {
    return sessionStorage.getItem("usuarioLogeado");
};

let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);

const AuthService = {
    login,
    logout,
    getUsuarioLogueado,
    subscribeUsuarioLogueado
}

export default AuthService;