const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/auth');


router.get('/', async (req, res) => {
  try {
    const { search, sortBy = 'createdAt', order = 'desc', limit = 100, skip = 0 } = req.query;
    
   
    let filter = {};
    
    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { ingredients: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
 
    const sortObject = {};
    sortObject[sortBy] = order === 'asc' ? 1 : -1;
    
    const recipes = await Recipe.find(filter)
      .sort(sortObject)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate('userId', 'name email');
    
    const total = await Recipe.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      message: 'Recipes fetched successfully',
      recipes,
      count: recipes.length,
      total,
      pagination: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: parseInt(skip) + recipes.length < total
      }
    });
  } catch (error) {
    console.error('Fetch recipes error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching recipes'
    });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, ingredients, image } = req.body;

   
    if (!title || !description || !ingredients || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and at least one ingredient'
      });
    }

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      image: image || null,
      userId: req.userId
    });

    await recipe.save();
    await recipe.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      recipe
    });
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating recipe'
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('userId', 'name email');
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe fetched successfully',
      recipe
    });
  } catch (error) {
    console.error('Fetch recipe error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching recipe'
    });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, ingredients, image } = req.body;
    

    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

  
    if (recipe.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this recipe'
      });
    }

   
    if (title) recipe.title = title;
    if (description) recipe.description = description;
    if (ingredients && ingredients.length > 0) recipe.ingredients = ingredients;
    if (image !== undefined) recipe.image = image;
    recipe.updatedAt = Date.now();

    await recipe.save();
    await recipe.populate('userId', 'name email');

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      recipe
    });
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating recipe'
    });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

  
    if (recipe.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this recipe'
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      recipe
    });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting recipe'
    });
  }
});

module.exports = router;
