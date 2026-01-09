import { MarkdownRenderer } from "../components/MarkdownRenderer";
import "./NotesPage.css";

interface NotesPageProps {
  notePath?: string;
}

export function NotesPage({
  notePath = "notes/00-START-HERE",
}: NotesPageProps) {
  return (
    <div className="notes-page">
      <MarkdownRenderer filePath={notePath} />
    </div>
  );
}
