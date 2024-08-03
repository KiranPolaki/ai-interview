"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

  useEffect(() => {
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResponse = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResponse);
    setInterviewData(result[0]);
  };
  return <div>Start</div>;
}

export default StartInterview;
