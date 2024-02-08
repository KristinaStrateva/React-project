const asyncHandler = require('express-async-handler');
const Collection = require('../models/Collection');
const Item = require('../models/Item');


// @desc Get last three added items
// @route GET /
// @access Private

const getLastThreeItems = asyncHandler(async (req, res) => {
    const homeDecorationsItems = await Collection.find().select('items').populate('item').lean();
    const giftSetsItems = await Collection.find().select('items').populate('item').lean();
    const customItemsItems = await Collection.find().select('items').populate('item').lean();

    const allItems = [...homeDecorationsItems, ...giftSetsItems, ...customItemsItems];

    if (!allItems) {
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
        owner: req.user._id
    });

    collection.items.push(newItem._id);
    await collection.save();

    res.status(201).json({ newItem });
});

module.exports = {
    getLastThreeItems,
    createItem,
}