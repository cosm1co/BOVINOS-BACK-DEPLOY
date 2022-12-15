import Bovine from "../models/Bovine.js"

//GET ALL BOVINES
export const getAllBovines = async (req, res) => {
    try {
        const SENASA_ID = req.query.SENASA_ID
        const type = req.query.type
        const potrero = req.query.potrero
        const device = req.query.device
        let potreroName = {names:[]}
        let names = []
        const findBovine = await Bovine.find({})
        findBovine?.map((bovine) => {
            names.push(bovine.potrero)
           })
        const filterPotreros = names.filter((item,index)=>{
           return names.indexOf(item) === index;
          })
        potreroName.names = filterPotreros

        if(potrero){
            const findBovine = await Bovine.find({potrero: {$regex:`^${potrero}`, $options: 'i'}})
            findBovine.unshift(potreroName)
            res.status(200).json(findBovine)
        } else if (SENASA_ID){
            const findBovine = await Bovine.find({SENASA_ID: {$regex:`^${SENASA_ID}`, $options: 'i'}})
            findBovine.unshift(potreroName)
            res.status(200).json(findBovine)
        } else if (type){
            const findBovine = await Bovine.find({type: {$regex:`^${type}`, $options: 'i'}})
            findBovine.unshift(potreroName)
            res.status(200).json(findBovine)
        } else if (device){
            const findBovine = await Bovine.find({device: {$regex:`^${device}`, $options: 'i'}})
            findBovine.unshift(potreroName)
            res.status(200).json(findBovine)
        } else {
            findBovine.unshift(potreroName)
            res.status(200).json(findBovine)
        }
        // if (findBovine.length > 0){
        //     res.status(200).json(findBovine)
        // } else {
        //     res.status(200).json({msg: "no bovines found in database"})
        // }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//GET BOVINE BY ID
export const getBovineById = async (req, res) => {
    try {
        const { id } = req.params
        const findBovineId = await Bovine.findById(id)
        res.status(200).json(findBovineId)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//CREATE BOVINE
export const createBovine = async (req, res) => {
    try {
        const { SENASA_ID, type, weight, potrero, device, n_device } = req.body;
        const errors = [];
        if(!SENASA_ID) errors.push({text: "Please add a SENASA ID"})
        if(!type) errors.push({text: "Please add a bovine type"})
        if(!potrero) errors.push({text: "Please add a potrero"})
        if(!device) errors.push({text: "Please add a device"})
        if(!n_device) errors.push({text: "Please add the device number"})

        if(errors.length > 0){
            throw new Error(errors[0].text)

        } else {
            const newBovine = new Bovine({ SENASA_ID: SENASA_ID.toUpperCase(), type, weight, potrero: potrero.toUpperCase(), device, n_device: n_device.toUpperCase() });  
            const SaveBovine = await newBovine.save();
            res.status(200).json({msg: "bovine created successfully"})
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}


//UPDATE BOVINE
export const updateBovine = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let findBovineId = await Bovine.findById(id)
        
        if (findBovineId) {
            const bovineUpdated = await Bovine.findOneAndUpdate({ _id: id}, data)
            await bovineUpdated.save();
            const saveBovine = Bovine.findById(id)

            res.status(200).json({msg: "bovine updated successfully"});
        } else {
            throw new Error('bovine not found.')
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

//DELETE BOVINE
export const deleteBovine = async (req, res) => {
    try {
        let { id } = req.params;
        await Bovine.findByIdAndDelete({ _id: id})
        return res.status(200).send("bovine deleted successfully")
    } catch (error) {
        return res.status(400).json(error.message)
    }
}