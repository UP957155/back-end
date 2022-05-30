import { Router, Request, Response} from 'express';
const express = require('express');
const router: Router = express.Router();
const cors = require('cors');
const { carousels } = require('../data.json')
require('dotenv').config();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extends: false}));


router.get('/carousels', async(req: Request, res: Response) => {
    try {

        res.json(carousels)

    } catch (error) {
        console.log(error)
        res.json({
            error: 'SERVER ERROR',
            message: 'The API cannot find any carousels.'
        })
    }

})

router.post('/assetDetails', async(req: Request, res: Response) => {
    try {
        
        const { id } = req.body

        let assets: any[] = []

        carousels.forEach((c: any, index: number) => {

            if(c.items.find((asset: any) => asset.id === parseInt(id))){
                assets.push(c.items.find((asset: any) => asset.id === parseInt(id)))
            }
        })

        if(assets.length === 0) return res.json({
            error: "NOT FOUND",
            message: `Movie with id:${id} doesn't exist in our database`
        })

        res.json(assets[0])

    } catch (error) {
        console.log(error)
        res.json({
            error: 'SERVER ERROR',
            message: 'The API cannot find any asset.'
        })
    }
})

module.exports = router;