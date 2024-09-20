"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTodoForm from "@/components/form/create-form";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const NewTodoModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       <Button variant={"outline"} className=" border-2 border-zinc-200 text-white hover:bg-zinc-900 hover:text-white "> <Plus className="h-4 w-4 text-white"/> Add task</Button>
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