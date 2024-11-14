const { sequelize } = require('./db/connection');
const Restaurant = require('./models/Restaurant');
const Menu = require('./models/Menu');
const restaurantSeed = require('./seeds/restaurantSeed.json');

describe('Restaurant and Menu CRUD operations', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Restaurant.bulkCreate(restaurantSeed);
  });

  it('can create a new Restaurant', async () => {
    const restaurant = await Restaurant.create({
      name: "Four Leaf Clover",
      location: "Berkley Heights",
      cuisine: "Dessert",
    });

    expect(restaurant.name).toBe("Four Leaf Clover");
    expect(restaurant.location).toBe("Berkley Heights");
    expect(restaurant.cuisine).toBe("Dessert");
  });

  it('can create a new Menu', async () => {
    const menu = await Menu.create({
      title: "Dessert Menu",
    });

    expect(menu.title).toBe("Dessert Menu");
  });

  it('can update a Restaurant', async () => {
    const restaurant = await Restaurant.findOne({ where: { name: "Four Leaf Clover" } });
    restaurant.name = "The Clover";
    await restaurant.save();

    const updatedRestaurant = await Restaurant.findOne({ where: { id: restaurant.id } });

    expect(updatedRestaurant.name).toBe("The Clover");
  });

  it('can update a Menu', async () => {
    const menu = await Menu.findOne({ where: { title: "Dessert Menu" } });
    menu.title = "Updated Dessert Menu";
    await menu.save();

    const updatedMenu = await Menu.findOne({ where: { id: menu.id } });

    expect(updatedMenu.title).toBe("Updated Dessert Menu");
  });

  it('can delete a Restaurant', async () => {
    const restaurant = await Restaurant.findOne({ where: { name: "Four Leaf Clover" } });
    await restaurant.destroy();

    const deletedRestaurant = await Restaurant.findOne({ where: { name: "Four Leaf Clover" } });

    expect(deletedRestaurant).toBeNull();
  });

  it('can delete a Menu', async () => {
    const menu = await Menu.findOne({ where: { title: "Dessert Menu" } });
    await menu.destroy();

    const deletedMenu = await Menu.findOne({ where: { title: "Dessert Menu" } });

    expect(deletedMenu).toBeNull();
  });
});
