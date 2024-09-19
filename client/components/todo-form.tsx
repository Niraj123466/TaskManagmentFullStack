"use client";
import React, { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { newTodoState, NewTodo } from '@/app/state/atom';

export const TodoForm = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newTodo, setNewTodo] = useRecoilState(newTodoState);
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef?.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
        setNewTodo({ title: '', description: '', status: 'todo' });
    };

    const addTodo = async (todo: NewTodo) => {
        setIsLoading(true);
        try {
            await axios.post(
                'http://localhost:3000/api/todos',
                todo,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            toast.success(`Todo "${todo.title}" created.`);
        } catch (error) {
            console.error('Error adding todo:', error);
            toast.error("Failed to add todo. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.title.trim()) {
            toast.error("Todo title cannot be empty");
            return;
        }
        await addTodo(newTodo);

        disableEditing();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            disableEditing();
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTodo(prev => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (value: 'todo' | 'inProgress' | 'done') => {
        setNewTodo(prev => ({ ...prev, status: value }));
    };

    if (isEditing) {
        return (
            <form
                ref={formRef}
                onSubmit={onSubmit}
                className="w-[450px] border-b border-neutral-300 dark:border-neutral-700 p-4"
            >
                <Input
                    ref={inputRef}
                    id="title"
                    name="title"
                    value={newTodo.title}
                    onChange={handleInputChange}
                    placeholder="Enter todo title..."
                    className="mb-2 border-2"
                />
                <Input
                    id="description"
                    name="description"
                    value={newTodo.description}
                    onChange={handleInputChange}
                    placeholder="Enter todo description (optional)..."
                    className="mb-2 border-2"
                />
                <div className="flex items-center gap-x-2">
                    <Button variant={"default"} disabled={isLoading} type="submit" className="bg-white hover:bg-zinc-200 text-black">
                        {isLoading ? 'Adding...' : 'Add Todo'}
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={disableEditing}
                        className="text-neutral-400"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        );
    } else {
        return (
            <div className="p-4">
                <Button onClick={enableEditing} variant="default" className="text-black bg-zinc-100 hover:bg-zinc-200">
                    <Plus className="h-5 w-5 mr-2" />
                    Add a todo
                </Button>
            </div>
        );
    }
};