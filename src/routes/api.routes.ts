import { Router } from 'express'
import { host, port } from '../utils/utils';

const api = Router()

api.get('/', (_req, res) => {
  res.json(
    {
      products: `http://${host}:${port}/products`,
      pedidos: `http://${host}:${port}/pedidos`
    }
  );
})

export default api
