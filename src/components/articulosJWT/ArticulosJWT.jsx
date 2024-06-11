import React, { useState, useEffect } from "react";
import { articulosJWTService } from "../../services/articulosJWT.service";

function ArticulosJWT(){
    const tituloPagina = "Articulos JWT (solo para admins)";
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        BuscarArticulosJWT();
    }, []);

    async function BuscarArticulosJWT(){
        try {
            let data = await articulosJWTService.Buscar("", "", 1);
            setArticulos(data);
        } catch (error) {
            console.log("Error al buscar datos en el servidor!");
        }
    }

    return (
        <>
            <div className="tituloPagina">{tituloPagina}</div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style={{ width: "20%" }}>IdArticulo</th>
                        <th style={{ width: "50%" }}>Nombre</th>
                        <th style={{ width: "30%" }}>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos && articulos.map((articulo) => (
                        <tr key={articulo.IdArticulo}>
                            <td>{articulo.IdArticulo}</td>
                            <td>{articulo.Nombre}</td>
                            <td>{articulo.Precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

ArticulosJWT.NombreComponenteNoOfuscado = "ArticulosJWT";

export { ArticulosJWT };