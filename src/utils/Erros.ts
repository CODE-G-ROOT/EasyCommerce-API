import { Response } from "express";

// errores 200 (Producto creado)
export const handle200Status = (res: Response, message?: string) => {
  res.status(200).json({
    status: 200,
    message: message ? message : "Procedure successfully completed",
  });
};

// errores 201 (Producto creado)
export const handle201Status = (res: Response) => {
  res.status(201).json({
    status: 201,
    message: "Product has been sucessfully created"
  });
};
// errores 400 (Invalid parameter)
export const handle400Status = (res: Response, message?: string | object) => {
  res.status(400).json({
    status: 400,
    message: message ? message : "Bad Request",
  });
};

// errores 404 (Recurso no encontrado)
export const handle404Status = (res: Response, message?: string) => {
  res.status(404).json({
    status: 404,
    message: message ? message : "Not found",
  });
};

// errores 500 (Error interno del servidor)
export const handle500Status = (error: any, res: Response) => {
  console.error("Error interno del servidor:", error);
  res.status(500).json({
    status: 500,
    message: "A server error has occurred" 
  });
};

export const handle503Status = (res: Response) => {
  res.status(503).json({
    status: 503,
    message: "Tiempo de espera excedido"
  });
};
