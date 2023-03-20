const db = require("../config/connection");
const { User, Product, Category, Order, Brand } = require("../models");
const express = require("express");
const app = express();
const userSeeds = require("./users.json");
const categorySeeds = require("./categories.json");
const brandSeeds = require("./brands.json");
const productSeeds = require("./products.json");

const PORT = 3001;

db.once("open", async () => {
  try {
    // delete all existing documents from collections
    await Category.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Brand.deleteMany({});

    // create documents using the seeds data
    await User.create(userSeeds);
    await Category.create(categorySeeds);
    await Brand.create(brandSeeds);

    for (let i = 0; i < productSeeds.length; i++) {
      const product = productSeeds[i];

      // Retrieve the ObjectIds of the categories based on their names
      const categoryIds = [];
      for (let j = 0; j < product.categories.length; j++) {
        const category = await Category.findOne({
          name: product.categories[j],
        });
        categoryIds.push(category._id);
      }

      // Retrieve the ObjectId of the brand based on its name
      const brand = await Brand.findOne({ name: product.brand });
      if (!brand) {
        throw new Error(`Brand not found: ${product.brand}`);
      }

      // Create the product using the retrieved categoryIds and brand._id
      const createdProduct = await Product.create({
        ...product,
        categories: categoryIds,
        brand: brand._id,
      });

      // Add the created product to each category and brand
      for (let j = 0; j < product.categories.length; j++) {
        const categoryName = product.categories[j];

        // Add the created product to the category
        await Category.findOneAndUpdate(
          { name: categoryName },
          {
            $addToSet: {
              products: createdProduct._id,
            },
          }
        );

        // Add the created product to the brand
        await Brand.findOneAndUpdate(
          { _id: brand._id },
          {
            $addToSet: {
              products: createdProduct._id,
            },
          }
        );
      }
    }

    // start the server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
