const sequelize = require('./config/connection');
const User = require('./models/User');
const Card = require('./models/Card');
const Collection = require('./models/Collection');
const CollectionCard = require('./models/CollectionCard');

async function syncModels() {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: true });

    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('An error occurred while synchronizing models:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Call the syncModels function to synchronize the models with the database
syncModels();