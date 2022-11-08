const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('./../models/Drone.model')

router.get('/drones', async(req, res, next) => {
  // Iteration #2: List the drones
  try {
    const allDrones = await Drone.find()
    res.render('drones/list', { allDrones })
  } catch (error) {
    next(error)
  }
});

router.get('/drones/create', async(req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    res.render('drones/create-form')
  } catch (error) {
    next(error)
  }

});

router.post('/drones/create', async(req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed} = req.body
  try {
    await Drone.create({name, propellers, maxSpeed})
    res.redirect('/drones')
  } catch (error) {
    res.render('/drones/create')
  }
});

router.get('/drones/:id/edit', async(req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const droneEdit = await Drone.findById(req.params.id)
    res.render('drones/update-form', { droneEdit })
  } catch (error) {
    next(error)
  }
});

router.post('/drones/:id/edit', async(req, res, next) => {
  // Iteration #4: Update the drone
  const { name, propellers, maxSpeed} = req.body
  try {
    await Drone.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
    res.redirect('/drones')
  } catch (error) {
    res.render('/drones/:id/edit')
  }
});

router.post('/drones/:id/delete', async(req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const droneDelete = await Drone.findByIdAndDelete(req.params.id)
    res.redirect('/drones')
  } catch (error) {
    next(error)
  }
});

module.exports = router;
