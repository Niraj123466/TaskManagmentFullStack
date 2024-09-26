"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewTodo, newTodoSchema } from "@/app/schema/index"; 
import axios from "axios";
import { toast } from "sonner";
import { useRecoilState } from "recoil"; 
import { newTodoState } from "@/app/state/atom"; 

type NewTodoFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const addTodo = async (todo: NewTodo) => {
  try {
    await axios.post(
      'http://localhost:3000',
      todo,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    toast.success(`Todo "${todo.title}" created.`);
  } catch (error) {
    console.error('Error adding todo:', error);
    toast.error("Failed to add todo. Please try again.");
  }
};

const CreateTodoForm = ({ setOpen }: NewTodoFormProps) => {
  const form = useForm<NewTodo>({
    resolver: zodResolver(newTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo", 
      priority: "low",
    },
  });

  const [newTodo, setNewTodo] = useRecoilState(newTodoState);

  const onSubmit = async (values: NewTodo) => {
    try {
      await addTodo(values);
      setNewTodo(values); 
      setOpen(false);  
      console.log(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error("Failed to add todo. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-fit flex flex-col gap-3 p-2"
      >
        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">
                  Title *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full border-gray-400 text-white"
                    placeholder="Enter todo title..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">
                  Description (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full border-gray-400"
                    placeholder="Enter description here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">
                  Status *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">
                  Priority *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex justify-end items-center mt-4">
          <Button type="submit">Create Todo</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTodoForm;
