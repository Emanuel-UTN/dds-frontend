import React, { useState, useEffect } from "react";
import moment from "moment";

import ArticulosBuscar from "./ArticulosBuscar";
import ArticulosListado from "./ArticulosListado";
import ArticulosRegistro from "./ArticulosRegistro";

import { articulosService } from "../../services/articulos.service";
import { articulosFamiliasService } from "../../services/articulosFamilias.service";
import modalDialogService from "../../services/modalDialog.service";


function Articulos(){
    const TituloAccionABMC = {
        A: "(Agregar)",
        M: "(Modificar)",
        C: "(Consultar)",
        B: "(Eliminar)",
        L: "(Listado)"
    };

    const [ AccionABMC, setAccionABMC ] = useState("L");
    
    const [ Nombre, setNombre ] = useState("");
    const [ Activo, setActivo ] = useState("");

    const [ Items, setItems ] = useState(null);
    const [ Item, setItem ] = useState(null); // usado en BuscarPorId (Modificar, Consultar)
    const [ RegistrosTotal, setRegistrosTotal ] = useState(0);
    const [ Pagina, setPagina ] = useState(1);
    const [ Paginas, setPaginas ] = useState([]);
    const [ ArticulosFamilias, setArticulosFamilias ] = useState(null);

    // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
    useEffect(() => {
        async function BuscarArticulosFamilias(){
            let data = await articulosFamiliasService.Buscar();
            setArticulosFamilias(data);
        }
        BuscarArticulosFamilias();
    }, []);

    async function Buscar(_pagina){
        if (_pagina && _pagina !== Pagina) setPagina(_pagina);
        // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
        else _pagina = Pagina;

        const data = await articulosService.Buscar(Nombre, Activo, _pagina);

        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);

        // Generar array de paginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) arrPaginas.push(i);

        setPaginas(arrPaginas);
    }

    async function BuscarPorId(item, accionABMC){
        const data = await articulosService.BuscarPorId(item);
        setItem(data);
        setAccionABMC(accionABMC);
    }

    function Consultar(item){
        BuscarPorId(item, 'C');
    }

    function Modificar(item){
        if(!item.Activo){
            modalDialogService.Alert("No se puede modificar un registro Inactivo.");
            return;
        }
        BuscarPorId(item, 'M');
    }

    async function Agregar(){
        setAccionABMC('A');
        setItem({
            IdArticulo: 0,
            Nombre: "",
            Precio: "",
            CodigoDeBarra: "",
            IdArticuloFamilia: "",
            Stock: "",
            FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
            Activo: true
        });
        modalDialogService.Alert("Preparando el Alta...");
    }

    function Imprimir(){
        modalDialogService.Alert("En Desarrollo...");
    }

    async function ActivarDesactivar(item){
        modalDialogService.Confirm(
            "Esta seguro que quiere " +
            (item.Activo ? "desactivar" : "activar") +
            " este registro?",
            undefined,
            undefined,
            undefined,
            async () => {
                await articulosService.ActivarDesactivar(item);
                await Buscar();
            }
        )
    }

    async function Grabar(item){
        // Agregar o Modificar
        try {
            await articulosService.Grabar(item);
        } catch (error) {
            modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
            return;
        }

        await Buscar();
        Volver();

        setTimeout(() => {
            modalDialogService.Alert(
                "Registro " +
                (accionABMC === "A" ? "agregado" : "modificado") +
                " correctamente."
            )
        }, 0);
    }

    function Volver(){
        setAccionABMC("L");
    }

    return (
        <div>
            <div className="tituloPagina">
                Articulos <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && (
                <ArticulosBuscar
                    Nombre = {Nombre}
                    setNombre = {setNombre}
                    Activo = {Activo}
                    setActivo = {setActivo}
                    Buscar = {Buscar}
                    Agregar = {Agregar}
                />
            )}

            {/* Tabla de Resultado de busqueda y Paginador */}
            {AccionABMC === "L" && Items?.length > 0 && (
                <ArticulosListado
                    {...{
                        Items,
                        Consultar,
                        Modificar,
                        ActivarDesactivar,
                        Imprimir,
                        Pagina,
                        RegistrosTotal,
                        Paginas,
                        Buscar
                    }}
                />
            )}

            {AccionABMC === "L" && Items?.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )}

            {/* Formulario de Alta/Modificacion/Consulta */}
            {AccionABMC !== "L" && (
                <ArticulosRegistro
                    {...{ AccionABMC, ArticulosFamilias, Item, Grabar, Volver }}
                />
            )}
        </div>
    )
}

export { Articulos };