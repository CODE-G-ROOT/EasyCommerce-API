import { Router } from 'express'
import { findAll, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller';
import { validateIdDelited, validationProduct, validationPUTProduct } from '../middlewares/products.middleware';

const products = Router()

products.get('/', findAll) // Muestra todos los productos disponibles

products.post('/', validationProduct, createProduct);

products.put('/', validationPUTProduct, updateProduct);

products.delete('/',validateIdDelited, deleteProduct);

export default products
