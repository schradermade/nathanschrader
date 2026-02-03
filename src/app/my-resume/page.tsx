const RESUME_URL = "/Nathan_Schrader_Resume.pdf";
const RESUME_VIEWER_URL = `${RESUME_URL}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`;

export default function MyResumePage() {
  return (
    <main className="doc-content resume-content">
      <h1 className="doc-title">Resume</h1>
      <p>
        <a href={RESUME_URL} download>
          Download PDF
        </a>
      </p>
      <p className="resume-helper">
        If the embed is limited on iPad, tap{" "}
        <a href={RESUME_URL} target="_blank" rel="noreferrer">
          Open full PDF
        </a>
        .
      </p>
      <object
        title="Nathan Schrader Resume"
        data={RESUME_VIEWER_URL}
        type="application/pdf"
        className="resume-frame"
      >
        <p>
          Your browser can’t display the PDF inline.{" "}
          <a href={RESUME_URL} target="_blank" rel="noreferrer">
            Open full PDF
          </a>
          .
        </p>
      </object>
    </main>
  );
}
