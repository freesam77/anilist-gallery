"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type UserFormProps = {
  ctaLabel?: string;
  defaultName?: string;
  defaultOccupation?: string;
  onSubmit: (payload: {
    name: string;
    occupation: string;
  }) => Promise<void> | void;
  onClear?: () => Promise<void> | void;
  busy?: boolean;
  showClear?: boolean;
};

export default function UserForm({
  ctaLabel = "Enter",
  defaultName = "",
  defaultOccupation = "",
  onSubmit,
  onClear,
  busy = false,
  showClear = false,
}: UserFormProps) {
  const [name, setName] = useState(defaultName);
  const [occupation, setOccupation] = useState(defaultOccupation);
  const [submitting, setSubmitting] = useState(false);
  const nameId = useId();
  const occupationId = useId();

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  useEffect(() => {
    setOccupation(defaultOccupation);
  }, [defaultOccupation]);

  const canSubmit =
    name.trim().length > 1 &&
    occupation.trim().length > 1 &&
    !submitting &&
    !busy;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), occupation: occupation.trim() });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = async () => {
    if (!onClear) return;
    setSubmitting(true);
    try {
      await onClear();
      setName("");
      setOccupation("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded-xl text-left max-w-md"
    >
      <div className="space-y-2">
        <Label htmlFor={nameId}>Name</Label>
        <Input
          id={nameId}
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={occupationId}>Occupation</Label>
        <Input
          id={occupationId}
          placeholder="Senior Frontend Engineer"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
        <Button className="flex-1 w-full" type="submit" disabled={!canSubmit}>
          {submitting ? "Saving..." : ctaLabel}
        </Button>
        {showClear && onClear ? (
          <Button
            className="flex-1 w-full"
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={submitting}
          >
            Clear
          </Button>
        ) : null}
      </div>
    </form>
  );
}
