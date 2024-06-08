import React from "react";

export default function ArticulosRegistro({
    AccionABMC,
    ArticulosFamilias,
    Item,
    Grabar,
    Volver
}) {
    if(!Item) return null;
    return (
        <form>
            <div className="container-fluid">

                <fieldset disabled={AccionABMC === 'C'}>

                    {/* Nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="Nombre" className="col-form-label">
                                Nombre<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input type="text" className="form-control" name="Nombre" value={Item?.Nombre} autoFocus/>
                        </div>
                    </div>

                    {/* Precio */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="Precio" className="col-form-label">
                                Precio<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input type="number" step=".01" className="form-control" name="Precio" value={Item.Precio}/>
                        </div>
                    </div>

                    {/* Stock */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="Stock" className="col-form-label">
                                Stock<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input type="number" className="form-control" name="Stock" value={Item.Stock}/>
                        </div>
                    </div>

                    {/* CodigoDeBarra */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="CodigoDeBarra" className="col-form-label">
                                Codigo de Barra<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input type="text" className="form-control" name="CodigoDeBarra" value={Item.CodigoDeBarra}/>
                        </div>
                    </div>

                    {/* IdArticuloFamilia */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="IdArticuloFamilia" className="col-form-label">
                                Familia<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select className="form-control" name="IdArticuloFamilia" value={Item?.IdArticuloFamilia}>
                                <option value="" key={1}></option>
                                {ArticulosFamilias.map((x) => (
                                    <option key={x.IdArticuloFamilia} value={x.IdArticuloFamilia}>{x.Nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* FechaAlta */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="FechaAlta" className="col-form-label">
                                Fecha de Alta<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input type="date" className="form-control" name="FechaAlta" value={Item?.FechaAlta}/>
                        </div>
                    </div>

                    {/* Activo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="Activo" className="col-form-label">
                                Activo<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select className="form-control" name="Activo" value={Item?.Activo} disabled>
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                        </div>
                    </div>

                </fieldset>

                {/* Botones Grabar, Cancelar/Volver */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== 'C' && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button type="button" className="btn btn-warning" onClick={() => Volver()}>
                            <i className="fa fa-undo"></i>
                            {AccionABMC === 'C' ? ' Volver' : ' Cancelar'}
                        </button>
                    </div>
                </div>

                {/* texto: Revisar los datos ingresados... */}
                <div className="row alert alert-danger mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    Revisar los datos ingresados...
                </div>
                
            </div>
        </form>
    );
}

export { ArticulosRegistro }