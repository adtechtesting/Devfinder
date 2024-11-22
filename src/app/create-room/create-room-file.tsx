"use client";

import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PlusCircle, Github, Tag, FileText, Layout } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Creatroomaction } from "./actions";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(2).max(160),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
});

export function CreateRoomForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await Creatroomaction(values);
    toast({
      title: "Room Created",
      description: "Your Room was created successfully",
      className: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
    });
    router.push("/browse-rooms");
  }

  return (
    <div className="relative">
      {/* Decorative gradient card background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-lg -m-4 p-4" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 relative bg-white dark:bg-gray-950 rounded-lg p-6 shadow-xl hover:shadow-purple-500/10 transition-shadow duration-500"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                  <Layout className="w-4 h-4 text-purple-500" />
                  Room Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Give your BugFinder room name"
                    className="border-gray-200 dark:border-gray-800 focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormDescription className="text-gray-500 dark:text-gray-400">
                  Choose a descriptive name for your room
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Describe the bug in your code"
                    className="border-gray-200 dark:border-gray-800 focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormDescription className="text-gray-500 dark:text-gray-400">
                  Provide details about what you're working on
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                  <Github className="w-4 h-4 text-purple-500" />
                  GitHub Repository
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your GitHub repository URL"
                    className="border-gray-200 dark:border-gray-800 focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormDescription className="text-gray-500 dark:text-gray-400">
                  Link to your project repository
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-500" />
                  Tags
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="typescript, nextjs, tailwind"
                    className="border-gray-200 dark:border-gray-800 focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormDescription className="text-gray-500 dark:text-gray-400">
                  Add technologies you're using (comma-separated)
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
          >
            <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Create Room
          </Button>
        </form>
      </Form>
    </div>
  );
}
