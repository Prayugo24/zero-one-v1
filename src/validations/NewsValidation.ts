import { body } from "express-validator"

export const createNewsValidate = [
    body('title')
        .not().isEmpty().withMessage('Title harus diisi'),
    body('content')
        .not().isEmpty().withMessage('Content harus diisi'),
    body('topics_ids')
        .not().isEmpty().isArray({ min: 1 }).withMessage('topics_ids harus dipilih, minimal 1'),
    body('status')
        .not().isEmpty().withMessage('Status harus dipilih')
        .isIn(['DRAFT', 'DELETED','PUBLISHED']).withMessage('Status tidak valid'),   
]

export const updateNewsStatus = [
    body('status')
        .not().isEmpty().withMessage('Status harus dipilih')
        .isIn(['DRAFT', 'DELETED','PUBLISHED']).withMessage('Status tidak valid'),   
]

export const createTopic = [
    body('name')
        .not().isEmpty().withMessage('Content harus diisi'),
]