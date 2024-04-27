import { Router } from 'express'
import { findAll } from '../controllers/products.controller';

const products = Router()

products.get('/', findAll) // Muestra todos los productos disponibles

products.get('/img/:id', (req, res) => {
  const { id } = req.params
	res.json('mostrar un producto en específico' + id)
}); // Muestra un producto en específico

products.post('/', (_req, res) => {
  res.json("you're on post oproduct")
});

products.put('/:id', (req, res) => {
  const { id } = req.params
	res.json("you're on put products" + id)
});

products.delete('/:id', (req, res) => {
  const { id } = req.params
	res.json("you're on delete products " + id)
});

export default products
