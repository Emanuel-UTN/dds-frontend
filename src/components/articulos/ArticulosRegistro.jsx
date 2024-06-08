import React from "react";
import { useForm } from "react-hook-form";

export default function ArticulosRegistro({
    AccionABMC,
    ArticulosFamilias,
    Item,
    Grabar,
    Volver
}) {
    if(!Item) return null;

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted }
    } = useForm({ values: Item });

    const onSubmit = (data) => {
        Grabar(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <input 
                                type="text"  
                                {...register("Nombre", {
                                    required: { value: true, message: 'Nombre es requerido' },
                                    minLength: {
                                        value: 4,
                                        message: 'Nombre debe tener al menos 4 caracteres'
                                    },
                                    maxLength: {
                                        value: 55,
                                        message: 'Nombre no puede tener mas de 55 caracteres'
                                    }
                                })}
                                className={"form-control " + (errors?.Nombre ? 'is-invalid' : '')}
                                autoFocus
                            />
                            {errors?.Nombre && touchedFields.Nombre && (
                                <div className="invalid-feedback">
                                    {errors?.Nombre?.message}
                                </div>
                            )}
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
                            <input 
                                type="number"
                                step=".01"
                                {...register("Precio", {
                                    required: { value: true, message: 'Precio es requerido' },
                                    min: {
                                        value: 0.01,
                                        message: 'Precio debe ser mayor a 0'
                                    },
                                    max: {
                                        value: 99999.99,
                                        message: 'Precio debe ser menor o igual a 99999.99'
                                    }
                                })}
                                className={"form-control " + (errors?.Precio ? 'is-invalid' : '')}
                            />
                            {errors?.Precio && touchedFields.Precio && (
                                <div className="invalid-feedback">
                                    {errors?.Precio?.message}
                                </div>
                            )}
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
                            <input 
                                type="number"
                                {...register("Stock", {
                                    required: { value: true, message: 'Stock es requerido' },
                                    min: {
                                        value: 0,
                                        message: 'Stock debe ser mayor a 0'
                                    },
                                    max: {
                                        value: 99999,
                                        message: 'Stock debe ser menor o igual a 99999'
                                    }
                                
                                })}
                                className={"form-control " + (errors?.Stock ? 'is-invalid' : '')}
                            />
                                {errors?.Stock && touchedFields.Stock && (
                                <div className="invalid-feedback">
                                    {errors?.Stock?.message}
                                </div>
                            )}
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
                            <input
                                type="text"
                                {...register("CodigoDeBarra", {
                                    required: { value: true, message: 'Codigo de Barra es requerido' },
                                    pattern: {
                                        value: /^[0-9]{13}$/,
                                        message: 'Codigo de Barra debe ser un número de 13 digitos'
                                    }
                                })}
                                className={"form-control" + (errors?.CodigoDeBarra ? ' is-invalid' : '')}
                            />
                            {errors?.CodigoDeBarra && touchedFields.CodigoDeBarra && (
                                <div className="invalid-feedback">
                                    {errors?.CodigoDeBarra?.message}
                                </div>
                            )}
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
                            <select
                                {...register("IdArticuloFamilia", {
                                    required: { value: true, message: 'Familia es requerida' }
                                })}
                                className={"form-control" + (errors?.IdArticuloFamilia ? ' is-invalid' : '')}
                            >
                                <option value="" key={1}></option>
                                {ArticulosFamilias.map((x) => (
                                    <option key={x.IdArticuloFamilia} value={x.IdArticuloFamilia}>{x.Nombre}</option>
                                ))}
                            </select>
                            {errors?.IdArticuloFamilia && touchedFields.IdArticuloFamilia && (
                                <div className="invalid-feedback">
                                    {errors?.IdArticuloFamilia?.message}
                                </div>
                            )}
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
                            <input
                                type="date"
                                {...register("FechaAlta", {
                                    required: { value: true, message: 'Fecha de Alta es requerida' }
                                })}
                                className={"form-control" + (errors?.FechaAlta ? ' is-invalid' : '')}
                            />
                            {errors?.FechaAlta && touchedFields.FechaAlta && (
                                <div className="invalid-feedback">
                                    {errors?.FechaAlta?.message}
                                </div>
                            )}
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
                            <select className="form-control" {...register("Activo")} disabled>
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
                {isSubmitted && !isValid && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
                
            </div>
        </form>
    );
}

export { ArticulosRegistro }