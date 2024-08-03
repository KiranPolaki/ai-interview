"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
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
import { chatSession } from "@/utils/GeminiAIModal";
import { useState } from "react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState(0);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `JobPosition:${jobPosition}, JobDescription:${jobDesc}, JobExperience:${jobExperience}years. with this information give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers, where questions and answers are in fields of a json format.`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(JSON.parse(MockJsonResponse));
    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("Inseter ID : ", resp);
    } else {
      console.log("Error cant insert");
    }

    if (resp) {
      setOpenDialog(false);
      route.push(`/dashboard/interview/${resp(0).mockId}`);
    }

    setLoading(false);
  };
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
              <form onSubmit={onSubmit}>
                <div>
                  <div>
                    Add details about your job position/role, job description
                    and years of experience
                  </div>
                  <div className="mt-6 my-3">
                    <label className="text-black font-semibold">
                      Job Role/Job Position
                    </label>
                    <Input
                      placeholder="Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => {
                        setJobPosition(e.target.value);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label className="text-black font-semibold">
                      Job Description
                    </label>
                    <Textarea
                      placeholder="NextJs, NodeJs, SQL"
                      required
                      value={jobDesc}
                      onChange={(e) => {
                        setJobDesc(e.target.value);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label className="text-black font-semibold">
                      Years of experience
                    </label>
                    <Input
                      placeholder="2"
                      type="number"
                      required
                      max="100"
                      value={jobExperience}
                      onChange={(e) => {
                        setJobExperience(e.target.value);
                      }}
                    />
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
                    type="submit"
                    className="text-white bg-orange-500 hover:bg-orange-600"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Generating from AI
                      </div>
                    ) : (
                      "Start Interview"
                    )}
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
