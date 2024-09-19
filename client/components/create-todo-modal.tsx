"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTodoForm from "@/components/form/create-form";
import { useState } from "react";

const NewTodoModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <h3 className="text-sm lg:text-3xl bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-400 bg-clip-text text-transparent font-black hover:cursor-pointer ">
          Create Job
        </h3>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950">
        <DialogHeader>
          <DialogTitle>Enter the todo below</DialogTitle>
        </DialogHeader>
        <CreateTodoForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewTodoModal;