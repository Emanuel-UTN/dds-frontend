import React, { useState, useEffect } from "react";
import moment from "moment";

import ArticulosBuscar from "./ArticulosBuscar";
import ArticulosListado from "./ArticulosListado";
import ArticulosRegistro from "./ArticulosRegistro";

import { articulosFamiliasMockSevice as articulosFamiliasService } from "../../services/articulosFamiliasMockService";


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

    async function Buscar(){
        setAccionABMC("L");
        // Hardcodeamos 2 articulos para probar

        setItems([
            {
                IdArticulo: 108,
                Nombre: "Adaptador usb wifi tl-wn722n",
                Precio: 219.0,
                CodigoDeBarra: "0693536405046",
                IdArticuloFamilia: 9,
                Stock: 898,
                FechaAlta: "2017-01-23T00:00:00",
                Activo: false,        
            },
            {
                IdArticulo: 139,
                Nombre: "Aire acondicionado daewoo 3200fc dwt23200fc",
                Precio: 5899.0,
                CodigoDeBarra: "0779816944014",
                IdArticuloFamilia: 7,
                Stock: 668,
                FechaAlta: "2017-01-04T00:00:00",
                Activo: true,
              }        
        ]);
        alert("Buscando...");
    }

    async function BuscarPorId(item, accionABMC){
        setAccionABMC(accionABMC);
        setItem(item);

        if(accionABMC === 'C'){
            alert("Consultando...");
        }
        if(accionABMC === 'M'){
            alert("Modificando...");
        }
    }

    function Consultar(item){
        BuscarPorId(item, 'C');
    }

    function Modificar(item){
        if(!item.Activo){
            alert("No se puede modificar un registro Inactivo.");
            return;
        }
        BuscarPorId(item, 'M');
    }

    async function Agregar(){
        setAccionABMC('A');
        setItem({
            IdArticulo: 0,
            Nombre: "",
            Precio: 0,
            CodigoDeBarra: "",
            IdArticuloFamilia: 1,
            Stock: 0,
            FechaAlta: moment().format("YYYY-MM-DD"),
            Activo: true
        });
        alert("Preparando el Alta...");
        console.log(Item);
    }

    function Imprimir(){
        alert("En Desarrollo...");
    }

    async function ActivarDesactivar(item){
        const resp = window.confirm(
            "Esta seguro que quiere " +
            (item.Activo ? "desactivar" : "activar") +
            " el registro?"
        );
        if (resp) {
            alert("Activando/Desactivando...");
        }
    }

    async function Grabar(item){
        alert(
            "Registro " +
            (accionABMC === "A" ? "agregado" : "modificado") +
            " correctamente."
        )

        Volver();
    }

    function Volver(){
        setAccionABMC("L");
    }

    return (
        <div>
            <div className="tituloPagina">
                
            </div>
        </div>
    )
}