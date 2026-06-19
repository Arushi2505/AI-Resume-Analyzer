import { useState } from "react";
import axios from "axios";

function CoverLetter() {

  const [company, setCompany] =
    useState("");

  const [jobTitle, setJobTitle] =
    useState("");

  const [letter, setLetter] =
    useState("");

  const generateLetter = async () => {

  const resume =
    document.getElementById("resumeFile")
    ?.files?.[0];

  if (!resume) {
    alert("Please upload your resume.");
    return;
  }

  if (!company || !jobTitle) {
    alert("Enter company and job title.");
    return;
  }

  const formData = new FormData();

  formData.append(
    "resume",
    resume
  );

  formData.append(
    "job_description",
    `
Company: ${company}

Role: ${jobTitle}
`
  );

  try {

    const response =
      await axios.post(

        "http://127.0.0.1:8000/generate-cover-letter",

        formData

      );

    setLetter(
      response.data.cover_letter
    );

  }

  catch(err){

    console.log(err);

    alert(
      "Failed to generate."
    );

  }

};

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      to-blue-100
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-6
      ">
        Cover Letter Generator
      </h1>

      <div className="
        bg-white
        rounded-xl
        shadow
        p-6
      ">
        <div className="mb-4">

        <input

        id="resumeFile"

        type="file"

        accept=".pdf"

        className="w-full border rounded-lg p-3"

        />

        </div>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          className="
            w-full
            p-3
            border
            rounded-lg
            mb-4
          "
        />

        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) =>
            setJobTitle(e.target.value)
          }
          className="
            w-full
            p-3
            border
            rounded-lg
            mb-4
          "
        />

        <button
          onClick={generateLetter}
          className="
            bg-green-600
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Generate Cover Letter
        </button>

      </div>

      {letter && (

  <div>

    <textarea
      value={letter}
      readOnly
      className="
        mt-8
        w-full
        h-96
        p-6
        rounded-xl
        bg-white
        shadow
      "
    />

    <div className="flex gap-4 mt-4">

  <button
    onClick={() =>
      navigator.clipboard.writeText(letter)
    }
    className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-blue-700
    "
  >
    Copy Cover Letter
  </button>

  <button
    onClick={() => {

      const blob = new Blob(
        [letter],
        {
          type: "text/plain"
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "cover_letter.txt";

      a.click();

      URL.revokeObjectURL(url);

    }}
    className="
      bg-green-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-green-700
    "
  >
    Download Cover Letter
  </button>

</div>

  </div>

)}

    </div>
    
  );
}


export default CoverLetter;