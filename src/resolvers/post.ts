import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "src/types";

@Resolver()
export class PostResolver {
    // Fetch All Operation
    @Query(() => [Post])
    posts(@Ctx() {em} : MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    // Fetch One Operation
    @Query(() => Post, {nullable: true})
    post(@Arg("_id", () => Int) id: number, @Ctx() {em} : MyContext): Promise<Post| null> {
        return em.findOne(Post, { id });
    }

    // Create Operation
    @Mutation(() => Post)
    async createPost(@Arg("title", () => String) title: string, @Ctx() {em} : MyContext): Promise<Post> {
        const post = em.create(Post, { title });
        await em.persistAndFlush(post);
        return post;
    }

    // Update Operation
    @Mutation(() => Post)
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("title", () => String, {nullable: true}) title: string, @Ctx() {em} : MyContext): Promise<Post | null> {
        const post = await em.findOne(Post, {id});
        if (!post) {
            return null;
        }
        if (title !== undefined) {
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;
    }
    
    // Delete Operation
    @Mutation(() => Boolean)
    async deletePost(@Arg("id", () => Int) id: number, @Ctx() {em} : MyContext): Promise<boolean> {
        try {
            await em.nativeDelete(Post, {id});
        } catch {
            return false;
        }
        return true;
    }

}

