import { useState } from "react";

function CoverLetter() {

  const [company, setCompany] =
    useState("");

  const [jobTitle, setJobTitle] =
    useState("");

  const [letter, setLetter] =
    useState("");

  const generateLetter = () => {

    const history =
      JSON.parse(
        localStorage.getItem(
          "analyses"
        )
      ) || [];

    if (history.length === 0) {

      alert(
        "Analyze a resume first."
      );

      return;
    }

    const latest = history[0];

    const skills =
      latest.matching_skills?.join(", ")
      || "Python";

    const generated = `
Dear Hiring Manager,

I am excited to apply for the ${jobTitle}
position at ${company}.

My background includes experience in
${skills}, and I have worked on AI,
machine learning, and full-stack
development projects.

I am passionate about building
impactful solutions and continuously
learning new technologies.

I believe my technical skills and
problem-solving abilities would make
me a valuable addition to your team.

Thank you for your time and
consideration.

Sincerely,
Arushi
`;

    setLetter(generated);
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