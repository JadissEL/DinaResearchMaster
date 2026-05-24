"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleSlug: string;
  articleTitle: string;
}

function CommentReply({ reply }: { reply: Comment }) {
  return (
    <div className="mt-4 ml-4 border-l-2 border-[var(--ref-v10-green)] pl-4">
      <p className="font-ui text-sm font-medium text-black">{reply.authorName}</p>
      <p className="mt-1 font-ui text-sm text-[var(--ref-ws-muted)]">{reply.body}</p>
    </div>
  );
}

export function CommentSection({ articleSlug, articleTitle }: CommentSectionProps) {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`/api/comments?articleSlug=${articleSlug}&status=APPROVED`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments ?? []))
      .catch(() => setComments([]));
  }, [articleSlug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleSlug,
          authorName,
          authorEmail: authorEmail || undefined,
          body,
          honeypot: "",
        }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Perspective submitted for review");
      setBody("");
      trackEvent("COMMENT_SUBMIT", { slug: articleSlug });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="mt-20 border-t border-black/10 pt-12 reading-measure" id="discussion">
      <h2 className="section-todays-mix text-2xl">Join the discussion</h2>
      <p className="mt-2 font-ui text-sm text-[var(--ref-ws-muted)]">
        Share your perspective on &ldquo;{articleTitle}&rdquo;. Comments are moderated
        to preserve quality.
      </p>

      {comments.length > 0 && (
        <ul className="mt-10 space-y-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border border-black/10 bg-white p-6"
            >
              <p className="font-ui text-sm font-medium text-black">
                {comment.authorName}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {formatDate(comment.createdAt)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {comment.body}
              </p>
              {comment.replies?.map((reply) => (
                <CommentReply key={reply.id} reply={reply} />
              ))}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submit} className="mt-10 space-y-4">
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="authorName" className="label-case-study">
              Name *
            </label>
            <input
              id="authorName"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="input-ref mt-2"
            />
          </div>
          <div>
            <label htmlFor="authorEmail" className="label-case-study">
              Email (optional)
            </label>
            <input
              id="authorEmail"
              type="email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="input-ref mt-2"
            />
          </div>
        </div>
        <div>
          <label htmlFor="body" className="label-case-study">
            Your insight *
          </label>
          <textarea
            id="body"
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="input-ref mt-2 resize-y"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-v10 btn-v10-primary disabled:opacity-50"
        >
          {status === "loading" ? "Submitting…" : "Submit perspective"}
        </button>
      </form>
    </section>
  );
}
