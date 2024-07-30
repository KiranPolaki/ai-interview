"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Camera, Ghost, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  //cant get the data
  useEffect(() => {
    GetInterviewDetails();
  });
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-center">Lets get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 p-5 gap-5">
          <div className="flex flex-col p-2 gap-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position : </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack : </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience : </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-centers text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <div className="flex flex-col ">
              <Camera className="h-72 w-full my-7 p-14 bg-secondary rounded-lg border" />
              <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
                Enable camera and microphone
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Button className="bg-orange-500 hover:bg-orange-600">
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
