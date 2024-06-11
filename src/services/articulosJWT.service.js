import { config } from "../config";
import httpService from "./http.service";

const urlSource = config.urlResourceArticulosJWT;

async function Buscar(Nombre, Activo, Pagina){
    const resp = await httpService.get(urlSource, {params: {Nombre, Activo, Pagina}});
    
    return resp.data;
}

async function BuscarPorId(item){
    const resp = await httpService.get(`${urlSource}/${item.IdArticulo}`);

    return resp.data;
}

async function ActivarDesactivar(item){
    await httpService.delete(`${urlSource}/${item.IdArticulo}`);
}

async function Grabar(item){
    if (item.IdArticulo === 0){
        await httpService.post(urlSource, item);
    }else{
        await httpService.put(`${urlSource}/${item.IdArticulo}`, item);
    }
}

export const articulosJWTService = { Buscar, BuscarPorId, ActivarDesactivar, Grabar };