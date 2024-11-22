"use client"
import {cn} from "@/lib/utils";
import Link from "next/link";
import {buttonVariants} from "./ui/button";
import TextareaAutosize from 'react-textarea-autosize';
import {useCallback, useEffect, useRef, useState} from "react";
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import {Post} from "@prisma/client";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {postPatchSchema, postPatchSchemaType} from "@/lib/validations/post";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {Icon} from "./ui/icon";
interface EditerProps {
    post: Pick<Post, "id" | "title" | "content" | "published">
}
export default function Editor({post}: EditerProps) {
    const ref = useRef<EditorJS>()
    const router = useRouter()

    const [isMounted, setIsMounted] = useState(false)

    const [ isSaving, setIsSaving] = useState(false)
    const initializeEditor = useCallback(async () => {
        const body = postPatchSchema.parse(post)
        const editor = new EditorJS({
            holder: "editorjs",
            placeholder: "ここに記事を書く",
            inlineToolbar: true,
            onReady() {
                ref.current = editor
            },
            data: body.content,
            tools: {
                header: Header,
                code: Code,
                list: List,
                image: Image

            }
        });

    }, [post])
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, [])
    useEffect(() => {
        if (isMounted) initializeEditor();

        return () => {
            ref.current?.destroy()
            ref.current = undefined;
        }
    }, [isMounted, initializeEditor])

    const {register, handleSubmit, formState: {errors}} = useForm<postPatchSchemaType>({
        resolver: zodResolver(postPatchSchema),
    })

    const onSubmit = async (data : postPatchSchemaType) => {
        setIsSaving(true);
        const blocks = await ref.current?.save();
        const response =  await fetch(`/api/posts/${post.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: data.title,
                content: blocks,
            })
        })

        setIsSaving(false);

        if(!response.ok){
            return toast({
                title: "問題が発生しました",
                description: "もう一度トライしてください",
                variant: "destructive"
            })
        }
        router.refresh();
        return toast({
            description: "正常に保存できました"
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full gap-10">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <Link href={"/dashboard"} className={cn(buttonVariants({variant: "ghost"}))}>もどる</Link>
                        <p className="text-sm text-muted-foreground">公開</p>
                    </div>
                    <button className={cn(buttonVariants())} type="submit">
                        {isSaving && (<Icon.spinner className="w-4 h-4 mr-2 animate-spin "/>)}
                        <span>保存</span>
                    </button>
                </div>
                <div className="w-[800px] mx-auto">
                    <TextareaAutosize 
                    {...register("title")}
                    id="title" 
                    defaultValue={post.title} 
                    autoFocus 
                    placeholder="Post Title" 
                    className="w-full resize-none overflow-hidden bg-transparent text-5xl focus: outline-none"
                    ></TextareaAutosize >
                </div>
                <div id="editorjs" className="min-h-[500px]">

                </div>
                <p className="text-sm text-gray-500">
                    Use
                    <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd>
                    to open the comand menu
                </p>
            </div>
        </form>
    )
}
