"use client"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Creatroomaction } from "./actions"


const formSchema = z.object({
  name: z.string().min(1).max(50),
  description:z.string().min(2).max(160),
  githubRepo:z.string().min(1).max(50),
  tags:z.string().min(1).max(50)

})
export  function Createroomform(){

      const router=useRouter()
      const {toast}=useToast()
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description:"",
      githubRepo:"",
      tags:""
    },
  })
   async function onSubmit(values: z.infer<typeof formSchema>) {
     await Creatroomaction(values)
    toast({
      title:"Room Created",
      description:"Your Room was created succesfully"
    })
     router.push("/browse-rooms")
   
  }
    return (
     <div >
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="give your bugfinder room name" />
              </FormControl>
              <FormDescription>
                Give the room name 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="describe about the bug in the code " />
              </FormControl>
              <FormDescription>
                Please describe what you are coding on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="give the github link of your project"/>
              </FormControl>
              <FormDescription>
                Enter your project link which you are working on 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>
              <FormDescription>
             Enter your programming languages, frameworks, libraries so people
                can find you content
              </FormDescription>
           
            </FormItem>
          )}
        />
      <Button type="submit">create a room</Button>
      </form>
    </Form>
     </div>
    )
}