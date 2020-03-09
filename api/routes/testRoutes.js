'use strict';

const express = require('express');
const router = express.Router();
const Property = require('../models/propertyModel');

//create one Property
router.post('/', async (req, res) => {
    console.log('request in test post');
    console.log('req is ' + req);
    const property = new Property({
        estMaxPrice: req.body.estMaxPrice,
        estMinPrice: req.body.estMinPrice,
        hasSold: req.body.hasSold,
        landSize: req.body.landSize,
        mainImageUrl: req.body.mainImageUrl,
        name: req.body.name,
        noOfBathrooms: req.body.noOfBathrooms,
        noOfRooms: req.body.noOfRooms,
        salesforceId: req.body.salesforceId,
        soldPrice: req.body.soldPrice
    });

    try {
        const savedProperty = await property.save();
        res.json(savedProperty);
    } catch(err) {
        res.json({message: err});
    }
});

//get one Property based on mongoDB Id
router.get('/:propertyId', async (req, res) => {
    console.log("request in test get");
    console.log("req id is " + req.params.propertyId);
    try {
        const property = await Property.findById(req.params.propertyId);
        res.json(property);
    } catch(err) {
        res.json({message: err});
    }
});

//get all Properties 
router.get('/', async (req, res) => {
    try{
        //find() is a method of mongoose, if no parameter, return all
        const properties = await Property.find();
        res.json(properties);
    } catch(err) {
        res.json({message: err});
    }
});

//update one Property
router.patch('/:propertyId', async (req, res) => {
    try {
        const property = await Property.updateOne(
            {_id: req.params.propertyId}, 
            {$set: {
                estMaxPrice: req.body.estMaxPrice,
                estMinPrice: req.body.estMinPrice,
                hasSold: req.body.hasSold,
                landSize: req.body.landSize,
                mainImageUrl: req.body.mainImageUrl,
                name: req.body.name,
                noOfBathrooms: req.body.noOfBathrooms,
                noOfRooms: req.body.noOfRooms,
                salesforceId: req.body.salesforceId,
                soldPrice: req.body.soldPrice
                }
            }
        );
        res.json(property);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;