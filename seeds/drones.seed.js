require('./../db/index')
const { default: mongoose } = require('mongoose');
const Drone = require('./../models/Drone.model')

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

  
seed()

async function seed () {
    try {
        await Drone.deleteMany()
        const createDrones = await Drone.create(drones)
        console.log('amount of drones created:', createDrones.length) 
        mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
}