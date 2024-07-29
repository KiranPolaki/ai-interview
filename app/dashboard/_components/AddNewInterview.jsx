"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-md text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview?
            </DialogTitle>
            <DialogDescription>
              <form>
                <div>
                  <h2>
                    Add details about your job position/role, job description
                    and years of experience
                  </h2>
                  <div className="mt-6 my-3">
                    <label>Job Role/Job Position</label>
                    <Input placeholder="Full Stack Developer" required />
                  </div>
                  <div className="my-3">
                    <label>Job Description</label>
                    <Textarea placeholder="NextJs, NodeJs, SQL" required />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input placeholder="2" type="number" required />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="text-white bg-orange-500 hover:bg-orange-600"
                  >
                    Start Interview
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
