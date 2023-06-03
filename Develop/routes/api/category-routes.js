const router = require('express').Router();
const { Model } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  
  try {
    const categoryData= await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error); 
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  
  try{
  const categoryData= await Category.findByPk(req.params.id, {
    include: [{model: Product}],
  });
  if(!categoryData){
    res.status(404).json({message: 'No category found'});
    return;
  }
  res.status(200).json(categoryData);
} catch(error){
  res.status(500).json(error);
}
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      product_id: req.body.product_id,
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
