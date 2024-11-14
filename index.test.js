const { sequelize } = require('./db/connection');
const Restaurant = require('./models/Restaurant');
const Menu = require('./models/Menu');
const MenuItem = require('./models/MenuItem');
const { seedRestaurant, seedMenu, seedItem } = require('./seeds/seedData');

describe('Restaurant, Menu, and MenuItem CRUD operations', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Restaurant.bulkCreate(seedRestaurant);
    await Menu.bulkCreate(seedMenu);
    await MenuItem.bulkCreate(seedItem);
  });

  it('can create a new Restaurant', async () => {
    const restaurant = await Restaurant.create({
      name: 'AppleBees',
      location: 'Texas',
      cuisine: 'FastFood',
    });

    expect(restaurant.name).toBe('AppleBees');
    expect(restaurant.location).toBe('Texas');
    expect(restaurant.cuisine).toBe('FastFood');
  });

  it('can create a new Menu', async () => {
    const menu = await Menu.create({
      title: 'Breakfast',
    });

    expect(menu.title).toBe('Breakfast');
  });

  it('can create a new MenuItem', async () => {
    const menuItem = await MenuItem.create({
      name: 'bhindi masala',
      image: 'someimage.jpg',
      price: 9.50,
      vegetarian: true,
    });

    expect(menuItem.name).toBe('bhindi masala');
    expect(menuItem.price).toBe(9.50);
    expect(menuItem.vegetarian).toBe(true);
  });

  it('can update a Restaurant', async () => {
    const restaurant = await Restaurant.findOne({ where: { name: 'AppleBees' } });
    restaurant.name = 'Updated AppleBees';
    await restaurant.save();

    const updatedRestaurant = await Restaurant.findOne({ where: { id: restaurant.id } });

    expect(updatedRestaurant.name).toBe('Updated AppleBees');
  });

  it('can update a Menu', async () => {
    const menu = await Menu.findOne({ where: { title: 'Breakfast' } });
    menu.title = 'Updated Breakfast';
    await menu.save();

    const updatedMenu = await Menu.findOne({ where: { id: menu.id } });

    expect(updatedMenu.title).toBe('Updated Breakfast');
  });

  it('can update a MenuItem', async () => {
    const menuItem = await MenuItem.findOne({ where: { name: 'bhindi masala' } });
    menuItem.name = 'Updated bhindi masala';
    await menuItem.save();

    const updatedMenuItem = await MenuItem.findOne({ where: { id: menuItem.id } });

    expect(updatedMenuItem.name).toBe('Updated bhindi masala');
  });

  it('can delete a Restaurant', async () => {
    const restaurant = await Restaurant.findOne({ where: { name: 'AppleBees' } });
    await restaurant.destroy();

    const deletedRestaurant = await Restaurant.findOne({ where: { name: 'AppleBees' } });

    expect(deletedRestaurant).toBeNull();
  });

  it('can delete a Menu', async () => {
    const menu = await Menu.findOne({ where: { title: 'Breakfast' } });
    await menu.destroy();

    const deletedMenu = await Menu.findOne({ where: { title: 'Breakfast' } });

    expect(deletedMenu).toBeNull();
  });

  it('can delete a MenuItem', async () => {
    const menuItem = await MenuItem.findOne({ where: { name: 'bhindi masala' } });
    await menuItem.destroy();

    const deletedMenuItem = await MenuItem.findOne({ where: { name: 'bhindi masala' } });

    expect(deletedMenuItem).toBeNull();
  });
});
