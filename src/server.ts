import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized!');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
};

startServer();
