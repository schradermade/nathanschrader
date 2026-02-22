/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TLDR } from '@/components/TLDR';
import { Callout } from '@/components/Callout';
import { Mermaid } from '@/components/Mermaid';
import { getPortfolioPath, resolvePortfolioPath } from '@/lib/portfolio-routes';

type Section = {
  id: string;
  label: string;
  content: React.ReactNode;
};

const buildBaseSections = ({
  onDiagramClick,
}: {
  onDiagramClick: (svg: string) => void;
}): Section[] => [
  {
    id: 'cover',
    label: 'Cover',
    content: (
      <section>
        <span className="kicker">Cover</span>
        <h1 className="doc-title">HVACOps.ai — Technical Dossier</h1>
        <p className="doc-subtitle">
          A professional AI engagement plan and architecture proposal for
          technicians, stakeholders, and reviewers.
        </p>
        <TLDR
          items={[
            'Shows how I frame an HVAC AI problem and scope a safe engagement.',
            'Demonstrates Cloudflare-first architecture with clear tradeoffs.',
            'Defines trust posture: evidence-only answers, refusal rules, and escalation.',
            'Includes observability, incident response, and audit-grade logging.',
            'Uses real HVACOps constraints: offline use, multi-tenant, job-scoped context.',
          ]}
        />
        <div className="cover-links">
          <a href="https://hvacops.ai" target="_blank" rel="noreferrer">
            hvacops.ai
          </a>
          <a
            href="https://github.com/schradermade/hvac-ai"
            target="_blank"
            rel="noreferrer"
          >
            github.com/schradermade/hvac-ai
          </a>
        </div>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> confirm hosting domain,
          link the live demo, and add a PDF export workflow.
        </div>
      </section>
    ),
  },
  {
    id: 'executive-summary',
    label: 'Executive Summary',
    content: (
      <section>
        <span className="kicker">Executive Summary</span>
        <h2>Executive Summary</h2>
        <p>
          The HVACOps AI copilot is a job-scoped assistant designed for
          technicians working under real-world constraints: incomplete data,
          safety-critical workflows, and strict time pressure. The product goal
          is not to answer questions, but to support a decision in the field
          with evidence-based responses and a clear audit trail.
        </p>
        <p>
          This dossier outlines how we move from discovery to a pilot-ready
          system in four weeks, while keeping trust, security, and reliability
          as first-class requirements. The system design is Cloudflare-first:
          Workers orchestrate requests, D1 stores structured job context,
          Vectorize and R2 handle retrieval and artifacts, and AI Gateway
          mediates model calls with logging and caching.
        </p>
        <TLDR
          items={[
            'Define the job: decision support inside a job-scoped workflow.',
            'Trust posture: evidence-based answers or abstain.',
            'Cloudflare-first backend for low latency and predictable cost.',
            'Auth and tenancy boundaries enforced via dedicated Auth Worker.',
            'Evaluation built into the delivery plan from week two.',
          ]}
        />
        <h3>Who this is for</h3>
        <ul>
          <li>
            HVAC owners and dispatch: fewer callbacks, better documentation,
            faster resolution.
          </li>
          <li>
            Technicians: fast context assembly, safety-aware reminders, and
            evidence-backed summaries.
          </li>
          <li>
            Security reviewers: explicit tenant isolation, least-privilege
            services, and auditability.
          </li>
          <li>
            Engineering leadership: a clear scope, risk register, and delivery
            cadence.
          </li>
        </ul>
        <Callout variant="decision">
          We will ship a job-scoped copilot first, not a general HVAC chatbot,
          to keep context, safety, and ownership explicit.
        </Callout>
        <h3>What success looks like</h3>
        <ul>
          <li>Accuracy: 95% of answers grounded in retrieved evidence.</li>
          <li>Latency: P95 response under 2.5 seconds for a typical query.</li>
          <li>Adoption: 50% of technicians use AI copilot weekly.</li>
          <li>Safety: zero unsafe suggestions in the high-risk eval set.</li>
        </ul>
        <Callout variant="tradeoff">
          We prefer determinism over creativity: temperature stays low, and
          structured output is enforced.
        </Callout>
        <h3>Non-goals</h3>
        <ul>
          <li>No autonomous troubleshooting without evidence.</li>
          <li>No wiring diagram interpretation without a manual reference.</li>
          <li>
            No cross-tenant insights or aggregate analytics in the copilot
            response.
          </li>
        </ul>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> confirm the initial
          success metrics with stakeholders, prioritize risk categories
          (electrical, gas, refrigerant), and validate the minimum viable eval
          set.
        </div>
      </section>
    ),
  },
  {
    id: 'engagement-plan',
    label: 'Engagement Plan',
    content: (
      <section>
        <span className="kicker">Engagement Plan</span>
        <h2>Engagement Plan (Week-by-Week)</h2>
        <TLDR
          items={[
            'Week 0 is discovery: access, data audit, and risk inventory.',
            'Week 1 builds instrumentation and a baseline eval set.',
            'Week 2 ships a prototype with retrieval + structured output.',
            'Week 3 runs a pilot with guardrails and audit logging.',
            'Week 4 hardens the system and delivers runbooks.',
          ]}
        />
        <h3>Week 0 — Discovery + Access</h3>
        <ul>
          <li>Stakeholder map and workflow walkthroughs.</li>
          <li>
            Data inventory: notes, job events, equipment, manuals, attachments.
          </li>
          <li>Threat model draft and trust boundary diagram.</li>
        </ul>
        <Callout variant="mitigation">
          Run a sampling audit of 50 recent jobs to quantify evidence coverage
          and identify gaps.
        </Callout>
        <h3>Week 1 — Instrumentation + Baseline</h3>
        <ul>
          <li>RAG pipeline skeleton with structured context builder.</li>
          <li>Initial eval set (golden questions) with scoring rubric.</li>
          <li>Logging schema for citations, abstentions, and latency.</li>
        </ul>
        <Callout variant="tradeoff">
          Prioritize low-latency structured context for first responses, then
          enrich with retrieval.
        </Callout>
        <h3>Week 2 — Prototype + Eval Harness</h3>
        <ul>
          <li>Working copilot endpoint with citations and JSON output.</li>
          <li>Automatic regression tests for retrieval and response schema.</li>
          <li>First reliability dashboard.</li>
        </ul>
        <Callout variant="mitigation">
          Introduce hybrid retrieval (vector + keyword) and limit to job-scoped
          filters.
        </Callout>
        <h3>Week 3 — Pilot + Guardrails</h3>
        <ul>
          <li>Limited pilot with a small technician cohort.</li>
          <li>Refusal policies for high-risk requests.</li>
          <li>Audit trail per answer (context + evidence + output).</li>
        </ul>
        <Callout variant="risk">
          Any answer without citations must be an abstain, not a best guess.
        </Callout>
        <h3>Week 4 — Hardening + Runbooks</h3>
        <ul>
          <li>Incident response playbooks.</li>
          <li>Metrics reviews (latency, safety, adoption).</li>
          <li>Security review and tenancy boundary verification.</li>
        </ul>
        <Callout variant="mitigation">
          Ship runbooks alongside monitoring dashboards and alert routing.
        </Callout>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> confirm pilot cohort,
          define owner for eval set maintenance, and decide whether to include
          AI Gateway caching in week two or three.
        </div>
      </section>
    ),
  },
  {
    id: 'requirements',
    label: 'Requirements & Constraints',
    content: (
      <section>
        <span className="kicker">Requirements</span>
        <h2>Requirements &amp; Constraints</h2>
        <TLDR
          items={[
            'Job-scoped context is mandatory; no cross-tenant retrieval.',
            'Offline-friendly UX and low latency at the edge.',
            'Structured data is authoritative; unstructured is supportive.',
            'Accuracy thresholds differ by content type and risk.',
          ]}
        />
        <h3>Latency &amp; Offline Constraints</h3>
        <ul>
          <li>P95 response time under 2.5 seconds for typical queries.</li>
          <li>
            First response should succeed even with limited connectivity by
            using cached context.
          </li>
          <li>Mobile-friendly streaming responses for long answers.</li>
        </ul>
        <Callout variant="tradeoff">
          We accept slightly less context if it keeps the first answer under the
          latency budget.
        </Callout>
        <h3>Accuracy Requirements by Content Type</h3>
        <ul>
          <li>Procedures: must be backed by explicit evidence or refuse.</li>
          <li>Part numbers: require exact keyword matches.</li>
          <li>Error codes: must cite source notes or manuals.</li>
          <li>
            Wiring diagrams: never interpret without a linked manual reference.
          </li>
        </ul>
        <Callout variant="risk">
          High-risk procedures (electrical, gas, refrigerant) require evidence
          plus safety reminders.
        </Callout>
        <h3>Data Sources &amp; Trust Levels</h3>
        <p>
          <strong>Authoritative</strong>: job records, equipment inventory, and
          structured events in D1.
        </p>
        <p>
          <strong>Supporting</strong>: technician notes, office notes, call logs
          in Vectorize.
        </p>
        <p>
          <strong>External</strong>: manuals and attachments stored in R2; only
          referenced with citations.
        </p>
        <Callout variant="decision">
          Structured facts always lead; retrieval is additive and never
          overrides system-of-record data.
        </Callout>
        <h3>Permissions &amp; Tenancy</h3>
        <ul>
          <li>Auth Worker issues first-party JWTs.</li>
          <li>API Worker validates JWTs via JWKS and enforces tenant scope.</li>
          <li>Retrieval filters always include tenant and job identifiers.</li>
        </ul>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> finalize accuracy
          targets by content type and determine which manual formats are
          supported in the first release.
        </div>
      </section>
    ),
  },
  {
    id: 'architecture',
    label: 'Architecture',
    content: (
      <section>
        <span className="kicker">Architecture</span>
        <h2>Architecture</h2>
        <TLDR
          items={[
            'Cloudflare Workers orchestrate AI requests at the edge.',
            'D1 holds structured job context; Vectorize + R2 serve retrieval.',
            'AI Gateway handles model routing, caching, and logging.',
            'Job-scoped context is enforced at every layer.',
          ]}
        />
        <h3>System Context</h3>
        <Mermaid
          chart={`
flowchart TB
  Tech[Technician App] -->|HTTPS| Worker[Cloudflare Workers API]
  Worker -->|Job context| D1[(D1: Structured Data)]
  Worker -->|Retrieval| Vectorize[(Vectorize)]
  Worker -->|Artifacts| R2[(R2 Manuals/Photos)]
  Worker -->|LLM calls| Gateway[AI Gateway]
  Gateway --> Model[LLM Provider]
  Worker --> Logs[Analytics + Audit Logs]
`}
          onClick={onDiagramClick}
        />
        <Callout variant="decision">
          Cloudflare-first architecture is chosen for global latency, integrated
          services, and cost predictability.
        </Callout>
        <h3>Data Flow (Ingestion → Retrieval → Response)</h3>
        <ol>
          <li>
            Structured context pulled from D1 (job, client, property,
            equipment).
          </li>
          <li>
            Semantic retrieval queries Vectorize for notes and event history.
          </li>
          <li>
            Prompt assembly combines structured facts + retrieved evidence.
          </li>
          <li>Model inference runs via AI Gateway with logging and caching.</li>
          <li>
            Post-processing enforces schema and citations, then logs an audit
            trail.
          </li>
        </ol>
        <Callout variant="tradeoff">
          We do not precompute everything: on-demand context stays fresh but
          adds latency.
        </Callout>
        <h3>Tenancy Model</h3>
        <ul>
          <li>Each request carries a tenant-scoped JWT.</li>
          <li>Retrieval filters include tenant_id and job_id.</li>
          <li>
            Audit logs store tenant context, evidence IDs, and output hashes.
          </li>
        </ul>
        <Callout variant="risk">
          Any missing tenant filter is a data isolation failure; these checks
          are non-negotiable.
        </Callout>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> confirm whether Durable
          Objects are needed for session state in the first release and define
          retention policies for R2 artifacts.
        </div>
      </section>
    ),
  },
  {
    id: 'llm-reliability',
    label: 'LLM Reliability Plan',
    content: (
      <section>
        <span className="kicker">Reliability</span>
        <h2>LLM Reliability Plan</h2>
        <TLDR
          items={[
            'LLM output must be evidence-based or abstain.',
            'Structured JSON responses enforce deterministic behavior.',
            'Hybrid retrieval (vector + keyword) improves recall and precision.',
            'Evaluation is continuous: golden set, regressions, and human review.',
          ]}
        />
        <h3>Grounding Rules</h3>
        <ul>
          <li>Every factual claim needs a citation.</li>
          <li>If no evidence is found, respond with a safe abstention.</li>
          <li>Structured data overrides unstructured retrieval.</li>
        </ul>
        <Callout variant="decision">
          We treat abstention as a product feature, not an error path.
        </Callout>
        <h3>Reliability Pipeline</h3>
        <Mermaid
          chart={`
flowchart LR
  Input[User Question] --> Context[Structured Context Builder]
  Context --> Retrieval[Hybrid Retrieval]
  Retrieval --> Prompt[Prompt + Schema]
  Prompt --> Model[LLM Inference]
  Model --> Post[Post-Processor]
  Post --> Output[Answer + Citations]
  Post --> Audit[Audit Log]
`}
          onClick={onDiagramClick}
        />
        <h3>Structured Output Schema</h3>
        <ul>
          <li>answer: concise response.</li>
          <li>citations: list of evidence references with snippets.</li>
          <li>confidence: low | medium | high.</li>
          <li>follow_ups: suggested clarifying questions.</li>
        </ul>
        <Callout variant="tradeoff">
          Schema enforcement reduces model flexibility but prevents UI breakage.
        </Callout>
        <h3>Refusal &amp; Escalation</h3>
        <ul>
          <li>Safety-critical requests require explicit evidence.</li>
          <li>
            If high risk and evidence is weak, escalate to a checklist or
            supervisor.
          </li>
          <li>
            Unsupported requests receive an explicit out-of-scope response.
          </li>
        </ul>
        <Callout variant="risk">
          Any ungrounded advice in electrical, gas, or refrigerant workflows is
          unacceptable.
        </Callout>
        <h3>Evaluation Plan</h3>
        <ul>
          <li>Golden set: curated questions with expected citations.</li>
          <li>Regression tests: run on every prompt or retrieval change.</li>
          <li>Human review loop: weekly sampling of production answers.</li>
        </ul>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> choose initial model(s),
          define minimum coverage for the golden set, and set thresholds for
          auto-rollback.
        </div>
      </section>
    ),
  },
  {
    id: 'observability',
    label: 'Observability & Operations',
    content: (
      <section>
        <span className="kicker">Operations</span>
        <h2>Observability &amp; Operations</h2>
        <TLDR
          items={[
            'Every answer has an audit trail: context, retrieval, and output.',
            'Latency and safety metrics are first-class dashboards.',
            'Incident playbooks define rollback and safe mode steps.',
          ]}
        />
        <h3>Request Tracing</h3>
        <ul>
          <li>Request ID tied to user, job, tenant, and model call.</li>
          <li>Logs include retrieval IDs, citation count, and output hash.</li>
          <li>Trace spans cover context assembly, retrieval, and inference.</li>
        </ul>
        <Callout variant="decision">
          Auditability is required for trust and post-incident review.
        </Callout>
        <h3>Metrics That Matter</h3>
        <ul>
          <li>P95 response latency</li>
          <li>Citation coverage rate</li>
          <li>Abstention rate (by risk category)</li>
          <li>Eval pass rate by release</li>
          <li>Cost per session (via AI Gateway)</li>
        </ul>
        <Callout variant="tradeoff">
          We track fewer metrics, but make them actionable and tied to product
          decisions.
        </Callout>
        <h3>Incident Playbook (Condensed)</h3>
        <ol>
          <li>
            Detect anomaly (latency spike, unsafe output, or retrieval failure).
          </li>
          <li>
            Flip to safe mode (abstain without evidence; disable risky tools).
          </li>
          <li>Roll back prompt or retrieval changes.</li>
          <li>Postmortem with evidence logs and remediation steps.</li>
        </ol>
        <Callout variant="risk">
          Without safe mode, the only recovery path is a full outage.
        </Callout>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> choose the alerting
          thresholds and define ownership for eval regression triage.
        </div>
      </section>
    ),
  },
  {
    id: 'security',
    label: 'Security & Privacy',
    content: (
      <section>
        <span className="kicker">Security</span>
        <h2>Security &amp; Privacy</h2>
        <TLDR
          items={[
            'Auth Worker issues first-party JWTs; API Worker validates via JWKS.',
            'Tenant isolation is enforced in context and retrieval layers.',
            'Least-privilege tokens for all services and queues.',
          ]}
        />
        <h3>Threat Model Snapshot</h3>
        <Mermaid
          chart={`
flowchart LR
  User[Technician] --> App[Mobile App]
  App --> Auth[Auth Worker]
  Auth --> JWT[Signed JWT]
  App --> API[API Worker]
  API --> D1[(D1 Data)]
  API --> Vectorize[(Vectorize)]
  API --> R2[(R2 Artifacts)]
  API --> LLM[AI Gateway]
`}
          onClick={onDiagramClick}
        />
        <Callout variant="risk">
          The highest risk is cross-tenant leakage through retrieval or logging.
        </Callout>
        <h3>Auth &amp; Tenancy</h3>
        <ul>
          <li>PKCE login through Cloudflare Access OIDC.</li>
          <li>
            Auth Worker issues short-lived access tokens and rotating refresh
            tokens.
          </li>
          <li>
            API Worker validates JWTs and enforces tenant_id on every query.
          </li>
        </ul>
        <Callout variant="decision">
          We do not ship Access client secrets in the mobile app; the Auth
          Worker brokers all sensitive flows.
        </Callout>
        <h3>Data Retention &amp; Privacy</h3>
        <ul>
          <li>R2 lifecycle policies for manuals and transcripts.</li>
          <li>Audit logs retain evidence references, not raw PII.</li>
          <li>
            Secure secrets storage via Worker secrets and scoped service
            bindings.
          </li>
        </ul>
        <Callout variant="mitigation">
          Redact or hash sensitive fields before logging, and store only what is
          required for audits.
        </Callout>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> confirm retention
          periods, audit access policies, and security review cadence.
        </div>
      </section>
    ),
  },
  {
    id: 'what-i-built',
    label: 'What I Built So Far',
    content: (
      <section>
        <span className="kicker">Status</span>
        <h2>What I Built So Far</h2>
        <TLDR
          items={[
            'A job-scoped copilot architecture designed for Cloudflare.',
            'Auth flow with dedicated Auth Worker and JWT validation.',
            'Structured context + retrieval pipeline defined in detail.',
          ]}
        />
        <h3>Architecture Snapshot</h3>
        <ul>
          <li>Feature-based client architecture for HVACOps mobile.</li>
          <li>
            Cloudflare-first backend plan (Workers, D1, Vectorize, R2, AI
            Gateway).
          </li>
          <li>Job-scoped AI copilot flow with citations and audit trail.</li>
        </ul>
        <Callout variant="tradeoff">
          The current plan favors a reliable, auditable pipeline over fast but
          opaque LLM calls.
        </Callout>
        <h3>Current Limitations</h3>
        <ul>
          <li>
            Retrieval and eval harness are designed but not yet validated with
            live data.
          </li>
          <li>
            Manual ingestion and wiring diagram handling need final workflows.
          </li>
          <li>Observability dashboards require implementation.</li>
        </ul>
        <h3>Next Build Steps</h3>
        <ol>
          <li>
            Stand up the Workers endpoints and Auth Worker in a staging
            environment.
          </li>
          <li>
            Populate D1 with real job/event data and validate retrieval
            precision.
          </li>
          <li>Implement eval suite and gating for prompt updates.</li>
        </ol>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> decide the first pilot
          data set and determine the production model provider.
        </div>
      </section>
    ),
  },
  {
    id: 'appendix',
    label: 'Appendix',
    content: (
      <section>
        <span className="kicker">Appendix</span>
        <h2>Appendix</h2>
        <TLDR
          items={[
            'Schemas are high-level and intentionally stable.',
            'Eval rubric prioritizes grounded answers and safe abstentions.',
            'Glossary aligns terminology across stakeholders.',
          ]}
        />
        <h3>API Schema (High-Level)</h3>
        <pre>
          {`{
  "answer": "...",
  "citations": [{ "doc_id": "...", "snippet": "...", "type": "note|event|manual" }],
  "confidence": "low|medium|high",
  "follow_ups": ["..."]
}`}
        </pre>
        <h3>Data Schema (Excerpt)</h3>
        <ul>
          <li>
            jobs: id, tenant_id, property_id, client_id, job_type, scheduled_at,
            status
          </li>
          <li>
            equipment: id, tenant_id, property_id, brand, model, serial,
            installed_at
          </li>
          <li>
            notes: id, tenant_id, entity_type, entity_id, content,
            author_user_id
          </li>
        </ul>
        <h3>Eval Rubric (Excerpt)</h3>
        <ul>
          <li>Grounded in evidence (required).</li>
          <li>Correctness of summary.</li>
          <li>Safety: no risky advice without citations.</li>
          <li>Usefulness: actionable next step or clarifying question.</li>
        </ul>
        <h3>Glossary</h3>
        <ul>
          <li>
            <strong>Job-scoped</strong>: context limited to a single job and
            tenant.
          </li>
          <li>
            <strong>Evidence</strong>: notes, events, and manuals retrieved for
            citations.
          </li>
          <li>
            <strong>Abstention</strong>: safe refusal when evidence is missing
            or risk is high.
          </li>
        </ul>
        <div className="section-footer">
          <strong>Open questions / next steps:</strong> expand the rubric to
          include latency weighting and add a versioned prompt catalog.
        </div>
      </section>
    ),
  },
];

const projects = [{ id: 'hvacops', label: 'HVACOps.ai' }];

const uiProjects = [
  { id: 'jarvis', label: 'Jarvis (utag.DB Logger)' },
  { id: 'hotspotti', label: 'Hotspotti Mobile' },
  { id: 'audit-trading', label: 'AI Trading Audit Platform' },
];

const buildProjectSections = ({
  onImageClick,
  onDiagramClick,
}: {
  onImageClick: (src: string) => void;
  onDiagramClick: (svg: string) => void;
}): Record<string, Section[]> => ({
  main: [
    {
      id: 'main',
      label: 'Main',
      content: (
        <section className="about-section">
          <div className="profile-header">
            <button
              type="button"
              className="image-button profile-avatar-button"
              onClick={() => onImageClick('/headshot.png')}
            >
              <img
                className="profile-avatar"
                src="/headshot.png"
                alt="Nathan Schrader"
              />
            </button>
            <div className="profile-title-block">
              <h1 className="doc-title profile-name">Nathan Schrader</h1>
              <div className="profile-role">
                <div className="profile-role-primary">
                  <span>Customer Engineer</span>
                  <span className="role-mobile-break" aria-hidden="true" />
                  <span className="role-secondary-track">
                    <span
                      className="role-divider role-divider-leading"
                      aria-hidden="true"
                    >
                      |
                    </span>
                    <span>AI Systems Builder</span>
                    <span className="role-divider" aria-hidden="true">
                      |
                    </span>
                    <span>Production Architect</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <TLDR
            className="about-tldr"
            items={['Architecting and deploying real-world AI systems.']}
          />
          <div className="technical-scope">
            <h3>Technical Scope</h3>
            <div className="technical-scope-item">
              <strong>Systems &amp; Architecture</strong>
              <p>
                Production Systems • Distributed Debugging • Observability •
                Reliability
              </p>
            </div>
            <div className="technical-scope-item">
              <strong>Applied AI Engineering</strong>
              <p>LLM Systems • Retrieval Pipelines • Agents • AI Tooling</p>
            </div>
            <div className="technical-scope-item">
              <strong>Deployment &amp; Integration</strong>
              <p>
                Enterprise APIs • Identity/Auth • Data Flows • Platform
                Integrations
              </p>
            </div>
            <div className="technical-scope-item">
              <strong>Operating Strengths</strong>
              <p>
                Embedded Engineering • Root Cause Analysis • Security-Aware
                Design • Incident Leadership
              </p>
            </div>
          </div>
          <p>
            <strong>Founder — HVACOps.ai</strong>
            <br />
            <span className="role-detail">
              Architected and deployed a production AI platform that transforms
              manuals, procedures, and field data into real-time decision
              support using retrieval pipelines, orchestration logic, and
              low-latency infrastructure for HVAC field technicians.
            </span>
          </p>
          <p>
            <strong>Customer Success Engineer — Tealium</strong>
            <br />
            <span className="role-detail">
              Embed directly with enterprise teams to diagnose complex system
              behavior, design solutions, and guide production implementations
              across APIs, identity systems, and distributed web architectures.
            </span>
          </p>
        </section>
      ),
    },
  ],
  hvacops: buildBaseSections({ onDiagramClick }),
});

export function PortfolioShell() {
  const [connectorPath, setConnectorPath] = useState<string>('');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxSvg, setLightboxSvg] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<
    'projects' | 'dossiers' | 'links' | null
  >(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const scrollYRef = useRef(0);
  const navTimerRef = useRef<number | null>(null);
  const previousPathRef = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const handleImageClick = useCallback((src: string) => {
    setLightboxSvg(null);
    setLightboxSrc(src);
  }, []);
  const handleDiagramClick = useCallback((svg: string) => {
    setLightboxSrc(null);
    setLightboxSvg(svg);
  }, []);
  const projectSections = useMemo(
    () =>
      buildProjectSections({
        onImageClick: handleImageClick,
        onDiagramClick: handleDiagramClick,
      }),
    [handleImageClick, handleDiagramClick],
  );
  const projectViews = useMemo<Record<string, Section[]>>(
    () => ({
      jarvis: [
        {
          id: 'jarvis',
          label: 'Jarvis',
          content: (
            <section>
              <span className="kicker">Project</span>
              <h1 className="doc-title">Jarvis — utag.DB Logger</h1>
              <p className="doc-subtitle">
                A Chrome MV3 extension for Tealium debugging that captures
                utag.DB logs in the page context, monitors consent state, and
                exports a single case file for analysis.
              </p>
              <TLDR
                items={[
                  'Captures utag.DB logs without console scraping.',
                  'Per-tab session isolation with exportable case files.',
                  'Consent + storage snapshots alongside logs.',
                  'Optional local server for send_utag payloads.',
                ]}
              />
              <div className="cover-links">
                <a
                  href="https://github.com/schradermade/utagdb-logger"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/schradermade/utagdb-logger
                </a>
              </div>
              <div className="project-media">
                <figure>
                  <button
                    type="button"
                    className="image-button"
                    onClick={() => {
                      setLightboxSvg(null);
                      setLightboxSrc('/jarvis-1.png');
                    }}
                  >
                    <img
                      src="/jarvis-1.png"
                      alt="Jarvis side panel view with logger tools."
                    />
                  </button>
                  <figcaption>
                    Side panel tools with logger, consent, and export workflow.
                  </figcaption>
                </figure>
                <figure>
                  <button
                    type="button"
                    className="image-button"
                    onClick={() => {
                      setLightboxSvg(null);
                      setLightboxSrc('/jarvis-2.png');
                    }}
                  >
                    <img
                      src="/jarvis-2.png"
                      alt="Jarvis export and preview workflow."
                    />
                  </button>
                  <figcaption>
                    Export case file preview with recent exports list.
                  </figcaption>
                </figure>
              </div>
              <h3>Key capabilities</h3>
              <ul>
                <li>Page-context utag.DB capture with strict tab isolation.</li>
                <li>Consent/CMP snapshotting with GPC visibility.</li>
                <li>
                  Storage map snapshots (cookies, local/session storage, utag
                  data).
                </li>
                <li>
                  Single case file export for handoff to LLMs or support teams.
                </li>
              </ul>
              <h3>Architecture summary</h3>
              <ul>
                <li>
                  console-bridge.js injects into MAIN world and posts entries.
                </li>
                <li>content.js relays data to background service worker.</li>
                <li>
                  background.js persists sessions in chrome.storage.local.
                </li>
                <li>
                  sidepanel.js renders tools and builds case file exports.
                </li>
              </ul>
            </section>
          ),
        },
      ],
      hotspotti: [
        {
          id: 'hotspotti',
          label: 'Hotspotti',
          content: (
            <section>
              <span className="kicker">Project</span>
              <h1 className="doc-title">Hotspotti Mobile</h1>
              <p className="doc-subtitle">
                A cross-platform mobile app for discovering and exploring
                hotspots, with a map-first UX and real-time updates.
              </p>
              <TLDR
                items={[
                  'Mapbox-powered exploration and hotspot discovery.',
                  'Cross-platform delivery (iOS, Android, Web) via Expo.',
                  'Secure auth + storage with smooth, modern UI.',
                  'Personalized recommendations and realtime updates.',
                ]}
              />
              <div className="cover-links">
                <a
                  href="https://github.com/schradermade/hotspotti-mobile"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/schradermade/hotspotti-mobile
                </a>
              </div>
              <div className="project-media">
                <figure>
                  <button
                    type="button"
                    className="image-button"
                    onClick={() => {
                      setLightboxSvg(null);
                      setLightboxSrc('/hotspotti-1.jpeg');
                    }}
                  >
                    <img
                      src="/hotspotti-1.jpeg"
                      alt="Hotspotti app screen overview."
                    />
                  </button>
                  <figcaption>
                    Map-first discovery with nearby hotspots.
                  </figcaption>
                </figure>
                <figure>
                  <button
                    type="button"
                    className="image-button"
                    onClick={() => {
                      setLightboxSvg(null);
                      setLightboxSrc('/hotspotti-2.jpeg');
                    }}
                  >
                    <img
                      src="/hotspotti-2.jpeg"
                      alt="Hotspotti app detail view."
                    />
                  </button>
                  <figcaption>
                    Hotspot detail view with rich context.
                  </figcaption>
                </figure>
                <figure>
                  <button
                    type="button"
                    className="image-button"
                    onClick={() => {
                      setLightboxSvg(null);
                      setLightboxSrc('/hotspotti-3.jpeg');
                    }}
                  >
                    <img
                      src="/hotspotti-3.jpeg"
                      alt="Hotspotti profile and favorites."
                    />
                  </button>
                  <figcaption>
                    Saved hotspots and personalization flow.
                  </figcaption>
                </figure>
              </div>
              <h3>Core features</h3>
              <ul>
                <li>
                  Mapbox-backed exploration with clustered points and distance
                  filtering.
                </li>
                <li>
                  Location-aware discovery with realtime proximity updates.
                </li>
                <li>
                  Personalized recommendations driven by user preferences and
                  history.
                </li>
                <li>
                  Secure auth flow with tokenized sessions and protected
                  storage.
                </li>
                <li>
                  Cross-platform UI with smooth transitions and gesture-friendly
                  navigation.
                </li>
              </ul>
              <h3>Technical stack</h3>
              <ul>
                <li>React Native + Expo with cross-platform targets.</li>
                <li>Mapbox for maps and geospatial UI.</li>
                <li>Redux Toolkit for state management.</li>
                <li>Expo Secure Store for sensitive data.</li>
              </ul>
            </section>
          ),
        },
      ],
      'audit-trading': [
        {
          id: 'audit-trading',
          label: 'AI Trading Audit',
          content: (
            <section>
              <span className="kicker">Project</span>
              <h1 className="doc-title">AI Trading Audit Platform</h1>
              <p className="doc-subtitle">
                A production-grade audit and orchestration stack for AI-assisted
                trading recommendations. It enforces deterministic policy gates,
                emits append-only audit events (with optional hash chaining),
                and propagates trace IDs for end-to-end compliance review.
              </p>
              <TLDR
                items={[
                  'Orchestrator enforces trust boundaries and policy gates.',
                  'Audit MCP stores immutable events with optional hash chaining.',
                  'Trace IDs propagate end-to-end for auditability.',
                  'Risk/compliance checks are hard gates, advisory is optional.',
                ]}
              />
              <div className="cover-links">
                <a
                  href="https://github.com/schradermade/audit-ai-trading"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/schradermade/audit-ai-trading
                </a>
              </div>
              <h3>System overview</h3>
              <Mermaid
                chart={`
flowchart LR
  Client[Client Request] --> Orchestrator[Orchestrator API]
  Orchestrator --> Risk[Risk/Policy Gate]
  Orchestrator --> Audit[AIT Audit MCP]
  Audit --> DB[(Audit DB - SQLite)]
  Orchestrator --> Response[Decision Response]
`}
                onClick={(svg) => {
                  setLightboxSrc(null);
                  setLightboxSvg(svg);
                }}
              />
              <h3>Audit flow</h3>
              <Mermaid
                chart={`
sequenceDiagram
  participant C as Client
  participant O as Orchestrator
  participant A as Audit MCP
  C->>O: POST /trade/recommendation
  O->>A: audit: request_received
  O->>O: risk/compliance evaluation
  O->>A: audit: decision_forwarded
  O-->>C: recommendation response
`}
                onClick={(svg) => {
                  setLightboxSrc(null);
                  setLightboxSvg(svg);
                }}
              />
              <h3>Trust boundary</h3>
              <Mermaid
                chart={`
flowchart TB
  subgraph Trusted[Trusted Policy Boundary]
    O[Orchestrator]
    R[Risk/Compliance Gate]
  end
  subgraph Advisory[Advisory Only]
    L[LLM Advisory]
  end
  O --> R
  R --> O
  O --> L
  L --> O
`}
                onClick={(svg) => {
                  setLightboxSrc(null);
                  setLightboxSvg(svg);
                }}
              />
              <h3>Key capabilities</h3>
              <ul>
                <li>
                  Append-only audit logging with optional tamper-evident hash
                  chain.
                </li>
                <li>End-to-end trace propagation for compliance review.</li>
                <li>
                  Strict separation between policy enforcement and advisory
                  output.
                </li>
                <li>Fail-closed behavior when audit logging is unavailable.</li>
              </ul>
              <h3>Core services</h3>
              <ul>
                <li>
                  Orchestrator (FastAPI + Pydantic) for request validation and
                  policy gates.
                </li>
                <li>
                  Audit MCP (FastAPI + SQLite) for immutable event storage.
                </li>
                <li>
                  Shared schemas for trade requests, responses, and audit
                  events.
                </li>
              </ul>
            </section>
          ),
        },
      ],
    }),
    [setLightboxSrc, setLightboxSvg],
  );
  const navRef = useRef<HTMLDivElement | null>(null);
  const activeProjectRef = useRef<HTMLAnchorElement | null>(null);
  const activeLabelRef = useRef<HTMLAnchorElement | null>(null);
  const routeState = useMemo(() => resolvePortfolioPath(pathname), [pathname]);
  const activeProject = routeState?.projectId ?? 'main';
  const activeId = routeState?.sectionId ?? 'main';

  const activeSections = useMemo(() => {
    if (projectViews[activeProject]) return projectViews[activeProject];
    return projectSections[activeProject] ?? projectSections.hvacops;
  }, [activeProject, projectSections, projectViews]);
  const dossierIds = useMemo(() => projects.map((project) => project.id), []);
  const activeSection = useMemo(
    () =>
      activeSections.find((section) => section.id === activeId) ??
      activeSections[0],
    [activeId, activeSections],
  );

  useEffect(() => {
    const warmRoutes = () => {
      const dossierRoutes = (projectSections.hvacops ?? []).map((section) =>
        getPortfolioPath('hvacops', section.id),
      );
      const projectRoutes = uiProjects.map((project) =>
        getPortfolioPath(project.id, project.id),
      );
      ['/', ...dossierRoutes, ...projectRoutes].forEach((route) => {
        router.prefetch(route);
      });
    };

    const timer = window.setTimeout(warmRoutes, 0);
    return () => window.clearTimeout(timer);
  }, [projectSections, router]);

  useEffect(() => {
    if (previousPathRef.current === null) {
      previousPathRef.current = pathname;
      return;
    }

    if (previousPathRef.current !== pathname) {
      if (navTimerRef.current !== null) {
        window.clearTimeout(navTimerRef.current);
      }
      navTimerRef.current = window.setTimeout(() => {
        setIsNavigating(false);
      }, 900);
      previousPathRef.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (navTimerRef.current !== null) {
        window.clearTimeout(navTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!lightboxSrc && !lightboxSvg) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.classList.remove('lightbox-open');
      document.documentElement.classList.remove('lightbox-open');
      window.scrollTo(0, scrollYRef.current);
      return;
    }
    scrollYRef.current = window.scrollY || window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.classList.add('lightbox-open');
    document.documentElement.classList.add('lightbox-open');
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.classList.remove('lightbox-open');
      document.documentElement.classList.remove('lightbox-open');
      window.scrollTo(0, scrollYRef.current);
    };
  }, [lightboxSrc, lightboxSvg]);

  const getProjectHref = (projectId: string) => {
    const firstSection =
      projectViews[projectId]?.[0] ?? projectSections[projectId]?.[0];
    if (firstSection) {
      return getPortfolioPath(projectId, firstSection.id);
    }
    return '/';
  };

  const normalizePath = (value: string) => {
    const [withoutHash] = value.split('#');
    const [withoutQuery] = withoutHash.split('?');
    if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) {
      return withoutQuery.slice(0, -1);
    }
    return withoutQuery || '/';
  };

  const beginNavigation = (targetHref?: string) => {
    if (navTimerRef.current !== null) {
      window.clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }

    if (targetHref) {
      const targetPath = normalizePath(targetHref);
      const currentPath = normalizePath(pathname ?? '/');
      if (targetPath === currentPath) {
        setIsNavigating(false);
        return;
      }
    }

    setIsNavigating(true);
  };

  useLayoutEffect(() => {
    const updateConnector = () => {
      if (
        !navRef.current ||
        !activeProjectRef.current ||
        !activeLabelRef.current
      ) {
        setConnectorPath('');
        return;
      }
      const navRect = navRef.current.getBoundingClientRect();
      const projectRect = activeProjectRef.current.getBoundingClientRect();
      const labelRect = activeLabelRef.current.getBoundingClientRect();

      const startX = projectRect.left - navRect.left;
      const startY = projectRect.top - navRect.top + projectRect.height / 2;
      const midX = Math.max(8, startX - 50);
      const endY = labelRect.top - navRect.top + labelRect.height / 2;
      const endX = labelRect.left - navRect.left;

      const path = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
      setConnectorPath(path);
    };

    if (activeProject === 'main' || !dossierIds.includes(activeProject)) {
      setConnectorPath('');
      return;
    }

    updateConnector();
    window.addEventListener('resize', updateConnector);
    return () => window.removeEventListener('resize', updateConnector);
  }, [activeProject, activeId, dossierIds]);

  return (
    <main className="single-shell">
      <div className="nav-pane">
        <aside className="nav single-nav" ref={navRef}>
          <h2>Nathan Schrader</h2>
          <div className="nav-group">
            <Link
              href={getProjectHref('main')}
              prefetch
              scroll={false}
              onClick={() => beginNavigation(getProjectHref('main'))}
              className={activeProject === 'main' ? 'active' : ''}
            >
              About
            </Link>
          </div>
          <div className="nav-divider nav-divider-subtle" />
          <div className="nav-group">
            <div className="nav-label">Projects</div>
            {uiProjects.map((project) => (
              <Link
                key={project.id}
                href={getProjectHref(project.id)}
                prefetch
                scroll={false}
                onClick={() => beginNavigation(getProjectHref(project.id))}
                className={activeProject === project.id ? 'active' : ''}
              >
                {project.label}
              </Link>
            ))}
          </div>
          <div className="nav-divider nav-divider-subtle" />
          <div className="nav-group">
            <div className="nav-label">Architecture Dossiers</div>
            {projects.map((project) => (
              <Link
                key={project.id}
                href={getProjectHref(project.id)}
                prefetch
                scroll={false}
                onClick={() => beginNavigation(getProjectHref(project.id))}
                className={activeProject === project.id ? 'active' : ''}
                ref={activeProject === project.id ? activeProjectRef : null}
              >
                {project.label}
              </Link>
            ))}
          </div>
          {dossierIds.includes(activeProject) && (
            <div className="nav-divider nav-divider-subtle nav-divider-contents" />
          )}
          {dossierIds.includes(activeProject) && (
            <div className="nav-group contents-group">
              {activeSections.map((section) => (
                <Link
                  key={section.id}
                  href={getPortfolioPath(activeProject, section.id)}
                  prefetch
                  scroll={false}
                  onClick={() =>
                    beginNavigation(getPortfolioPath(activeProject, section.id))
                  }
                  className={activeId === section.id ? 'active' : ''}
                  ref={activeId === section.id ? activeLabelRef : null}
                >
                  {section.label}
                </Link>
              ))}
            </div>
          )}
          <div className="nav-divider" />
          <div className="nav-group">
            <div className="nav-label">Find Me</div>
            <a
              href="https://www.linkedin.com/in/nateinsupport/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/schradermade"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://postman.com/nateinsupport"
              target="_blank"
              rel="noreferrer"
            >
              Postman
            </a>
          </div>
          {connectorPath ? (
            <svg className="nav-connector-svg" aria-hidden="true">
              <path d={connectorPath} />
            </svg>
          ) : null}
        </aside>
      </div>
      <div className="content-pane">
        <div className="doc-content">{activeSection.content}</div>
      </div>
      <nav className="mobile-nav" aria-label="Primary">
        <Link
          href={getProjectHref('main')}
          prefetch
          scroll={false}
          className={activeProject === 'main' ? 'active' : ''}
          onClick={() => {
            beginNavigation(getProjectHref('main'));
            setMobilePanel(null);
          }}
        >
          About
        </Link>
        <button
          type="button"
          className={mobilePanel === 'projects' ? 'active' : ''}
          onClick={() =>
            setMobilePanel(mobilePanel === 'projects' ? null : 'projects')
          }
        >
          Projects
        </button>
        <button
          type="button"
          className={mobilePanel === 'dossiers' ? 'active' : ''}
          onClick={() =>
            setMobilePanel(mobilePanel === 'dossiers' ? null : 'dossiers')
          }
        >
          Dossier
        </button>
        <button
          type="button"
          className={mobilePanel === 'links' ? 'active' : ''}
          onClick={() =>
            setMobilePanel(mobilePanel === 'links' ? null : 'links')
          }
        >
          Find Me
        </button>
      </nav>
      {mobilePanel ? (
        <div
          className="mobile-sheet"
          role="dialog"
          aria-modal="true"
          onClick={() => setMobilePanel(null)}
        >
          <div
            className="mobile-sheet-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-sheet-handle" aria-hidden="true" />
            <div className="mobile-sheet-header">
              <strong>
                {mobilePanel === 'projects'
                  ? 'Projects'
                  : mobilePanel === 'dossiers'
                    ? 'HVACOps.ai Dossier'
                    : 'Find Me'}
              </strong>
              <button type="button" onClick={() => setMobilePanel(null)}>
                Close
              </button>
            </div>
            {mobilePanel === 'projects' ? (
              <div className="mobile-sheet-list">
                {uiProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={getProjectHref(project.id)}
                    prefetch
                    scroll={false}
                    className={activeProject === project.id ? 'active' : ''}
                    onClick={() => {
                      beginNavigation(getProjectHref(project.id));
                      setMobilePanel(null);
                    }}
                  >
                    {project.label}
                  </Link>
                ))}
              </div>
            ) : null}
            {mobilePanel === 'dossiers' ? (
              <div className="mobile-sheet-list">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={getProjectHref(project.id)}
                    prefetch
                    scroll={false}
                    className={activeProject === project.id ? 'active' : ''}
                    onClick={() => beginNavigation(getProjectHref(project.id))}
                  >
                    {project.label}
                  </Link>
                ))}
                <div className="mobile-sheet-sublist">
                  {(projectSections.hvacops ?? []).map((section) => (
                    <Link
                      key={section.id}
                      href={getPortfolioPath('hvacops', section.id)}
                      prefetch
                      scroll={false}
                      className={activeId === section.id ? 'active' : ''}
                      onClick={() => {
                        beginNavigation(
                          getPortfolioPath('hvacops', section.id),
                        );
                        setMobilePanel(null);
                      }}
                    >
                      {section.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            {mobilePanel === 'links' ? (
              <div className="mobile-sheet-list">
                <a
                  href="https://www.linkedin.com/in/nateinsupport/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/schradermade"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://postman.com/nateinsupport"
                  target="_blank"
                  rel="noreferrer"
                >
                  Postman
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {lightboxSrc || lightboxSvg
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              onClick={() => {
                setLightboxSrc(null);
                setLightboxSvg(null);
              }}
            >
              <button
                type="button"
                className="lightbox-close"
                onClick={() => {
                  setLightboxSrc(null);
                  setLightboxSvg(null);
                }}
              >
                Close
              </button>
              {lightboxSrc ? (
                <img src={lightboxSrc} alt="Expanded view" />
              ) : (
                <div
                  className="lightbox-svg"
                  dangerouslySetInnerHTML={{ __html: lightboxSvg ?? '' }}
                />
              )}
            </div>,
            document.body,
          )
        : null}
      {isNavigating ? (
        <div className="route-spinner" aria-hidden="true">
          <span className="route-spinner-dot" />
        </div>
      ) : null}
    </main>
  );
}
