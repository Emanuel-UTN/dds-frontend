import axios from "axios";

const urlSource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

async function Buscar(Nombre, Activo, Pagina){
    const resp = await axios.get(urlSource, {
        params: { Nombre, Activo, Pagina }
    });

    return resp.data;
}

async function BuscarPorId(item){
    const resp = await axios.get(`${urlSource}/${item.IdArticulo}`);

    return resp.data;
}

async function ActivarDesactivar(item){
    await axios.delete(`${urlSource}/${item.IdArticulo}`);
}

async function Grabar(item){
    if (item.IdArticulo === 0){
        await axios.post(urlSource, item);
    }else{
        await axios.put(`${urlSource}/${item.IdArticulo}`, item);
    }
}

export const articulosService = { Buscar, BuscarPorId, ActivarDesactivar, Grabar };