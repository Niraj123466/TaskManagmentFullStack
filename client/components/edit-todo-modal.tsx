"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Edit2, Plus } from "lucide-react";
import EditTodoForm from "./form/edit-form";

const EditTodoModal = ({id}:{id:string}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Edit2 className="text-neutral-500 h-4 w-4 hover:cursor-pointer"/>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950">
        <DialogHeader>
          <DialogTitle>Edit details below</DialogTitle>
        </DialogHeader>
        <EditTodoForm setOpen={setOpen} id={id}/>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;