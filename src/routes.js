import { Router } from 'express';
import { libros } from './controller.js';

export const router = Router();

router.get('/libros', libros.getAll.bind(libros));
router.post('/libros', libros.add.bind(libros));
router.delete('/libros/:id', libros.delete.bind(libros));
router.delete('/libros', libros.delete.bind(libros));
router.put('/libros',libros.update);


