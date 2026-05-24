"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

interface Comment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
  article: { slug: string; title: string };
}

export default function ModerationPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPending = async (token: string) => {
    setLoading(true);
    const res = await fetch("/api/comments/moderate", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments);
      setAuthed(true);
      sessionStorage.setItem("admin_secret", token);
    }
    setLoading(false);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_secret");
    if (saved) {
      setSecret(saved);
      fetchPending(saved);
    }
  }, []);

  const moderate = async (commentId: string, status: "APPROVED" | "REJECTED" | "SPAM") => {
    const token = secret || sessionStorage.getItem("admin_secret") || "";
    await fetch("/api/comments/moderate", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, status }),
    });
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-6 pt-32 pb-24">
        <h1 className="hero-v10-title text-2xl">Moderation</h1>
        <p className="mt-2 font-ui text-sm text-[var(--ref-ws-muted)]">Enter admin secret to continue.</p>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="input-ref mt-4"
          placeholder="ADMIN_SECRET"
        />
        <Button
          className="mt-4"
          onClick={() => fetchPending(secret)}
          disabled={loading}
        >
          {loading ? "Loading…" : "Enter"}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <h1 className="hero-v10-title text-2xl">
        Pending comments ({comments.length})
      </h1>
      <ul className="mt-8 space-y-6">
        {comments.map((c) => (
          <li key={c.id} className="border border-black/10 bg-white p-6">
            <p className="label-case-study">
              {c.article.title} · {c.authorName}
            </p>
            <p className="mt-2 text-gray-800">{c.body}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => moderate(c.id, "APPROVED")}>
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => moderate(c.id, "REJECTED")}
              >
                Reject
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => moderate(c.id, "SPAM")}
              >
                Spam
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {comments.length === 0 && (
        <p className="mt-8 text-gray-500">No pending comments.</p>
      )}
    </div>
  );
}
