const asyncHandler = require('express-async-handler');

const Collection = require('../models/Collection');
const Item = require('../models/Item');

// @desc Get all items from collection
// @route GET /:collectionName
// @access Public

const getAllItemsFromCollection = asyncHandler(async (req, res) => {
    const { collectionName } = req.params;

    const collection = await Collection.findOne({ pathName: collectionName }).populate('items').lean();

    const items = collection.items;

    if (items.length === 0) {
        return res.status(400).json({ message: 'This collection is empty!' });
    }

    res.status(200).json(items);
})

// @desc Get last three added items
// @route GET /
// @access Private

const getLastThreeItems = asyncHandler(async (req, res) => {
    const homeDecorationsCollection = await Collection.findOne({name: 'Home Decorations'}).populate('items').lean();
    const homeDecorationsItems = homeDecorationsCollection.items;

    const giftSetsCollection = await Collection.findOne({name: 'Gift Sets'}).populate('items').lean();
    const giftSetsItems = giftSetsCollection.items;

    const customItemsCollection = await Collection.findOne({name: 'Custom Items'}).populate('items').lean();
    const customItemsItems = customItemsCollection.items;

    const allItems = [];

    if (homeDecorationsItems) {
        allItems.push(...homeDecorationsItems);
    }

    if (giftSetsItems) {
        allItems.push(...giftSetsItems);
    }

    if (customItemsItems) {
        allItems.push(...customItemsItems);
    }

    if (allItems.length === 0) {
        return res.status(400).json({ message: 'No items found' });
    }

    const lastThreeItems = allItems.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);

    res.json(lastThreeItems);
});

// @desc Create new item
// @route POST /add-item
// @access Private

const createItem = asyncHandler(async (req, res) => {
    const { collectionName, name, imageUrl, description } = req.body;

    const collection = await Collection.findOne({ name: collectionName });

    if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
    }

    const newItem = await Item.create({
        collectionName: collection._id,
        name,
        imageUrl,
        description,
        // owner: req.user._id
    });

    collection.items.push(newItem._id);
    await collection.save();

    res.status(201).json(newItem);
});

module.exports = {
    getAllItemsFromCollection,
    getLastThreeItems,
    createItem,
}