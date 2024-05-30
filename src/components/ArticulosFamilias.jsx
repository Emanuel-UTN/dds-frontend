import React, { useState, useEffect } from 'react';
import { articulosFamiliasMockService } from "../services/articulosFamilias-mock.service";

function ArticulosFamilias() {
    const tituloPagina = "Articulos Familias";

    const [articulosFamilias, setArticulosFamilias] = useState([]);

    useEffect(() => {
        buscarArticulosFamilias();
    }, []);

    async function buscarArticulosFamilias() {
        try {
            let data = await articulosFamiliasMockService.Buscar();
            setArticulosFamilias(data);
        } catch (error) {
            console.error("Error al buscar artículos familias:", error);
        }
    }

    return (
        <>
            <div className="tituloPagina">{tituloPagina}</div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: "40%" }}>IdArticuloFamilia</th>
                            <th style={{ width: "50%" }}>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulosFamilias.length > 0 ? (
                            articulosFamilias.map((articuloFamilia) => (
                                <tr key={articuloFamilia.IdArticuloFamilia}>
                                    <td>{articuloFamilia.IdArticuloFamilia}</td>
                                    <td>{articuloFamilia.Nombre}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No se encontraron artículos familias</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { ArticulosFamilias };