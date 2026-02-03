const RESUME_URL = "/Nathan_Schrader_resume.pdf";

export default function MyResumePage() {
  return (
    <main className="doc-content resume-content">
      <h1 className="doc-title">Resume</h1>
      <p>
        <a href={RESUME_URL} download>
          Download PDF
        </a>
      </p>
      <iframe
        title="Nathan Schrader Resume"
        src={RESUME_URL}
        style={{ width: "100%", height: "90vh", border: "none" }}
      />
    </main>
  );
}
