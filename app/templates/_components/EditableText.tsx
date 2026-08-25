"use client";

import { useEffect, useRef, useState } from "react";
import { autoGrowTextarea } from "../_lib/autoGrow";

export default function EditableText({
  value,
  onCommit,
  editable,
  as: Tag = "span",
  className,
  multiline,
  placeholder,
  editClassName,
}: {
  value: string;
  onCommit: (value: string) => void;
  editable?: boolean;
  as?: React.ElementType;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  editClassName?: string;
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editing) return;
    const el = multiline ? textareaRef.current : inputRef.current;
    el?.focus();
    if (multiline) autoGrowTextarea(textareaRef.current);
  }, [editing, multiline]);

  if (!editable) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (!editing) {
    return (
      <Tag
        className={`${className ?? ""} cursor-text rounded-sm outline-dashed outline-1 outline-transparent transition-[outline-color] duration-150 hover:outline-current/40`}
        onClick={() => setEditing(true)}
      >
        {value || <span className="opacity-50">{placeholder ?? "Click to edit"}</span>}
      </Tag>
    );
  }

  const stopEditing = () => setEditing(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" || (e.key === "Enter" && !multiline)) {
      stopEditing();
    }
  };

  const sharedClassName = `${className ?? ""} ${
    editClassName ?? "border-b border-dashed border-current/40"
  } w-full bg-transparent outline-none`;

  // Committed on every keystroke (same pattern as the left-panel form), not
  // just on blur — blur/Escape/Enter only toggle the static/editing display.
  return multiline ? (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      rows={1}
      onChange={(e) => {
        onCommit(e.target.value);
        autoGrowTextarea(e.target);
      }}
      onBlur={stopEditing}
      onKeyDown={handleKeyDown}
      className={`${sharedClassName} resize-none overflow-hidden`}
    />
  ) : (
    <input
      ref={inputRef}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onCommit(e.target.value)}
      onBlur={stopEditing}
      onKeyDown={handleKeyDown}
      className={sharedClassName}
    />
  );
}
