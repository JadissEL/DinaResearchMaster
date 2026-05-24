"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FadeIn } from "@/components/motion";

const TOPICS = [
  "Market research submission",
  "Investor or funding data",
  "Event or initiative listing",
  "General inquiry",
];

export default function ConnectPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent — thank you");
      setStatus("success");
      setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="grid min-h-screen pt-[var(--header-height)] lg:grid-cols-2">
      <section className="flex flex-col justify-center bg-ref-v10-gray px-6 py-16 lg:px-12 lg:py-24">
        <FadeIn>
          <p className="label-mission">Connect</p>
          <h1 className="hero-v10-title mt-6">Contribute to Morocco research</h1>
          <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-black/70">
            Share market data, company insights, funding signals, or event
            information focused on the Moroccan ecosystem.
          </p>
          <p className="mt-10 font-ui text-sm text-black/45">
            Response within a few business days
          </p>
        </FadeIn>
      </section>

      <section className="flex flex-col justify-center bg-[var(--ref-ws-bg)] px-6 py-16 lg:px-12">
        <FadeIn>
          <form onSubmit={submit} className="mx-auto w-full max-w-md space-y-6">
            <div>
              <label htmlFor="name" className="label-case-study">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-ref mt-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="label-case-study">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-ref mt-2"
              />
            </div>
            <div>
              <label htmlFor="topic" className="label-case-study">
                Topic
              </label>
              <select
                id="topic"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="input-ref mt-2"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="label-case-study">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-ref mt-2 resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-v10 btn-v10-primary w-full disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Get in touch"}
            </button>
          </form>
        </FadeIn>
      </section>
    </div>
  );
}

