import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { TableOfContents } from "./TableOfContents";
import "./MarkdownRenderer.css";

interface MarkdownRendererProps {
  filePath: string;
}

export function MarkdownRenderer({ filePath }: MarkdownRendererProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setError(null);

      try {
        // Normalize the file path - remove .md if present
        let normalizedPath = filePath.replace(/\.md$/, "");

        // Try multiple path variations
        const pathsToTry = [
          `/materials/${normalizedPath}.md`,
          `/materials/${normalizedPath}/README.md`,
        ];

        let response: Response | null = null;

        for (const path of pathsToTry) {
          try {
            response = await fetch(path);
            if (response.ok) {
              const text = await response.text();
              // Check if we got HTML instead of markdown
              if (
                text.trim().startsWith("<!doctype") ||
                text.trim().startsWith("<!DOCTYPE")
              ) {
                continue; // Try next path
              }
              setContent(text);
              return;
            }
          } catch (err) {
            continue;
          }
        }

        throw new Error(`Failed to load: ${filePath}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
        console.error("Markdown load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [filePath]);

  const handleLinkClick = (href: string) => {
    // Handle internal markdown links
    if (!href.startsWith("http") && !href.startsWith("#")) {
      // Convert markdown link to route
      let route = href.replace(/\.md$/, "");

      // Handle relative paths like ./00-ROADMAP or ../something
      if (route.startsWith("./")) {
        route = route.substring(2);
        // Get current path and navigate relative to it
        const currentPath = filePath.split("/");
        currentPath.pop(); // Remove current file
        const targetPath = [...currentPath, route].join("/");
        navigate(`/${targetPath}`);
      } else if (route.startsWith("../")) {
        // Handle parent directory navigation
        const currentPath = filePath.split("/");
        currentPath.pop(); // Remove current file
        currentPath.pop(); // Go up one directory
        const relativePath = route.substring(3);
        const targetPath = [...currentPath, relativePath].join("/");
        navigate(`/${targetPath}`);
      } else {
        // Direct route navigation
        navigate(`/${route}`);
      }
    }
  };

  // Helper function to generate heading ID
  const generateHeadingId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "") // Remove all emojis
      .replace(/\*\*/g, "") // Remove bold markers
      .replace(/`/g, "") // Remove backticks
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  if (loading) {
    return (
      <div className="markdown-loading">
        <p className="loading-text">// loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="markdown-error">
        <h2>Content not found</h2>
        <p className="error-message">{error}</p>
        <p className="error-help">
          // Make sure the file exists at: <code>/materials/{filePath}.md</code>
        </p>
      </div>
    );
  }

  return (
    <>
      <TableOfContents content={content} />
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Custom rendering for specific elements
            h1: ({ children }) => {
              const text = String(children);
              const id = generateHeadingId(text);
              return (
                <h1 id={id} className="markdown-h1">
                  {children}
                </h1>
              );
            },
            h2: ({ children }) => {
              const text = String(children);
              const id = generateHeadingId(text);
              return (
                <h2 id={id} className="markdown-h2">
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              const text = String(children);
              const id = generateHeadingId(text);
              return (
                <h3 id={id} className="markdown-h3">
                  {children}
                </h3>
              );
            },
            code: ({ className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              const inline = !match;
              return !inline && match ? (
                <div className="code-block">
                  <div className="code-block-lang">{match[1]}</div>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="markdown-blockquote">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => {
              const isExternal = href?.startsWith("http");
              const isAnchor = href?.startsWith("#");

              return (
                <a
                  href={href}
                  className="markdown-link"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!isExternal && !isAnchor && href) {
                      e.preventDefault();
                      handleLinkClick(href);
                    }
                  }}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}
