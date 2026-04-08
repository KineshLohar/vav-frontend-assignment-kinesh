import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

const DeleteConfirmDialog = ({
  trigger,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm p-6">
        <DialogHeader>
          <DialogTitle className="">
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>

        <DialogFooter className="mt-4 bg-transparent">
          <Button variant="outline" className='px-6 py-4.5 rounded-full'>Cancel</Button>
          <Button
            variant="destructive"
            className="px-6 py-4.5 rounded-full bg-red-600 text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;