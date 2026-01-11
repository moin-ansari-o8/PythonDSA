import { MarkdownRenderer } from "../components/MarkdownRenderer";
import "./NotesPage.css";

interface NotesPageProps {
  notePath?: string;
}

export function NotesPage({ notePath = "notes/overview" }: NotesPageProps) {
  return (
    <div className="notes-page">
      <MarkdownRenderer filePath={notePath} />
    </div>
  );
}
