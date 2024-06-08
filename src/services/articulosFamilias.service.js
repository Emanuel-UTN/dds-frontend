import axios from "axios";

const urlSource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulosfamilias";

async function Buscar(){
    const resp = await axios.get(urlSource);

    return resp.data;
}

export const articulosFamiliasService = { Buscar };