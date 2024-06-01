"use client"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const formSchema = z.object({
  search: z.string().min(0).max(50),
})

export const SearchBar = () => {
  const params =useSearchParams()
  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search:params.get("search") ??"",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
   if(values.search){
       router.push(`/?search=${values.search}`)
   }
   else{
    router.push('/')
   }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 max-w-lg w-full ">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="relative w-[440px]">
                <FormControl>
                  <Input
                    {...field}
                    className="pl-10"
                    placeholder="Filter rooms by keywords, such as typescript, next.js, python"
                  />
                </FormControl>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mr-2"><SearchIcon></SearchIcon>Search</Button>
           {params.get("search") &&(
            <Button variant="link" onClick={()=>{
              form.setValue("search",""),
              router.push("/")
            }}>
             Clear
            </Button>
           )}
        </form>
      </Form>
    </div>
  )
}
