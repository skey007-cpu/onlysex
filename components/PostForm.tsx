'use client';

import { Models } from 'node-appwrite';
import React, { use } from 'react';
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
// const { toast } = useToast();
import { useToast } from '@/hooks/use-toast';
import FileUploader from './FileUploader';
import { createPost } from '@/lib/actions/user.actions';



type PostFormProps = {
    post?: Models.Document;
    action: "Create" | "Update";
    userId: string;
    accountId: string;

};

const PostForm = ({ post, action, userId, accountId }: PostFormProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    });

    const values = useWatch({
        control: form.control,
    });



    console.log("WATCHING VALUES 👉", values);

    const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
        console.log("FORM VALUES 👉", value);
        // ACTION = CREATE
        const newPost = await createPost({ ...value, userId, });

        if (!newPost) {
            // console.log({ newPost }, "Post failed. Please try again")
            toast({
                title: `Post failed. Please try again.`,
            });
        }
        router.push("/onlyboard");
        console.log('Posted whith sucess')

        console.log(newPost)
    };



    return (
        <Form {...form}>

            <form
                className="flex flex-col gap-9 w-full  max-w-5xl">

                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Art, Expression, Learn"
                                    type="text"
                                    className="p-20 shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

            </form>
            <FileUploader
                ownerId={userId}
                accountId={accountId}
                caption={values?.caption}
                tags={values?.tags}
                location={values?.location}
            />
        </Form>
    )
}

export default PostForm

















export const PostValidation = z.object({
    caption: z
        .string()
        .min(5, { message: "Minimum 5 characters." })
        .max(2200, { message: "Maximum 2,200 caracters" }),
    // file: z.custom<File[]>(),
    location: z
        .string()
        .min(1, { message: "This field is required" })
        .max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
    // mediaUrl: z.string().optional(),
});

