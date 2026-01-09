import { useEffect, useState } from "react";
import "./TableOfContents.css";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const rawText = match[2];
      const text = rawText
        .replace(
          /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
          ""
        ) // Remove all emojis
        .replace(/\*\*/g, "") // Remove bold markers
        .replace(/`/g, "") // Remove backticks
        .trim();

      // Generate ID (same as what markdown renderer would generate)
      const id = rawText
        .toLowerCase()
        .replace(
          /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
          ""
        ) // Remove all emojis
        .replace(/\*\*/g, "") // Remove bold markers
        .replace(/`/g, "") // Remove backticks
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      if (level === 2) {
        // Only show H2 headings in TOC
        // Filter out common non-content headings
        const excludedHeadings = ["Why This Matters", "Table of Contents"];
        if (!excludedHeadings.includes(text)) {
          extractedHeadings.push({ id, text, level });
        }
      }
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Observe which heading is currently in viewport
    const observers: IntersectionObserver[] = [];

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        const observer = new IntersectionObserver(handleIntersection, {
          rootMargin: "-100px 0px -80% 0px",
        });
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for any fixed headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);

      // Remove focus from button after click to prevent outline
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents">
      <div className="toc-header">
        <span className="toc-title">// contents</span>
      </div>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item level-${heading.level} ${
              activeId === heading.id ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className="toc-link"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
