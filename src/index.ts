import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from './mikro-orm.config';
import express from 'express';
import console from "console";
import { ApolloServer } from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    // Test code 
    /* const post = orm.em.create(Post, {title: 'First Post'});
    await orm.em.persistAndFlush(post);

    const posts = await orm.em.find(Post, {});
    console.log(posts); */

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
       context: () => ({ em: orm.em }) 
    })

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('listening on http://localhost: 4000')
    })
}

main().catch((err) => {
    console.error(err);
});