import app from './app.js';
import { connectDB } from './database.js';
import { PORT } from "./config.js";
import { seedData } from './_seedData/seedData.js';

app.listen(app.get('port'), async () => {
    await connectDB()
    await seedData()
    console.log(`BASTO CRUD listening on port ${PORT}`)
})