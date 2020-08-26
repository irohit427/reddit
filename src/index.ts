import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from './mikro-orm.config';
import console from "console";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    // Test code 
    /* const post = orm.em.create(Post, {title: 'First Post'});
    await orm.em.persistAndFlush(post);

    const posts = await orm.em.find(Post, {});
    console.log(posts); */
}

main().catch((err) => {
    console.error(err);
});