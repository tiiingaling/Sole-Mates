// define the data types for the content in the models

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        orders: [Product]!
    }

    type Product {
        _id: ID
        title: String
        description: String
        image: String
        price: Int
        createdAt: String
    }

    type Brand {
        _id: ID
        name: String
        createdAt: String
        products: [Product]!
    }

    type Category{
        _id: ID
        name: String
        createdAt: String
        products: [Product]!
    }

    type Order{
        _id: ID
        total: Int
        createdAt: String
        items: [Product]!
        customerName: String
        customerAddress: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        categories: [Category]
        category(name:String!):Category
        products: [Product]
        product(productId: ID!): Product
        orders: [Order]
        order(orderId: ID!): Order
        brands: [Brand]
        brand(name: String!): Brand
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        newOrder(customerName: String!, customerAddress:String!, items:String ,total:Int!): Order
    }
`
module.exports = typeDefs;