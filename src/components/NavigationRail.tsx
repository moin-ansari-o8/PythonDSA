import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationRail.css";

interface NavItem {
  id: string;
  title: string;
  path: string;
  children?: NavItem[];
}

const navigationData: NavItem[] = [
  {
    id: "start",
    title: "00-START-HERE",
    path: "/notes/00-START-HERE",
  },
  {
    id: "roadmap",
    title: "00-ROADMAP",
    path: "/notes/00-ROADMAP",
  },
  {
    id: "how-to-learn",
    title: "00-HOW-TO-LEARN",
    path: "/notes/00-HOW-TO-LEARN",
  },
  {
    id: "notes",
    title: "Notes",
    path: "/notes",
    children: [
      {
        id: "python-basics",
        title: "01-python-basics",
        path: "/notes/01-python-basics",
      },
      {
        id: "complexity",
        title: "02-complexity",
        path: "/notes/02-complexity",
      },
      {
        id: "arrays-strings",
        title: "03-arrays-strings",
        path: "/notes/03-arrays-strings",
      },
      {
        id: "linked-lists",
        title: "04-linked-lists",
        path: "/notes/04-linked-lists",
      },
      {
        id: "stacks-queues",
        title: "05-stacks-queues",
        path: "/notes/05-stacks-queues",
      },
      { id: "recursion", title: "06-recursion", path: "/notes/06-recursion" },
      { id: "trees", title: "07-trees", path: "/notes/07-trees" },
      { id: "graphs", title: "08-graphs", path: "/notes/08-graphs" },
      {
        id: "dynamic-programming",
        title: "09-dynamic-programming",
        path: "/notes/09-dynamic-programming",
      },
      {
        id: "sorting-searching",
        title: "10-sorting-searching",
        path: "/notes/10-sorting-searching",
      },
    ],
  },
  {
    id: "problems",
    title: "Problems",
    path: "/problems",
  },
  {
    id: "solutions",
    title: "Solutions",
    path: "/solutions",
  },
  {
    id: "templates",
    title: "Templates",
    path: "/templates",
  },
  {
    id: "cheatsheets",
    title: "Cheatsheets",
    path: "/cheatsheets",
  },
  {
    id: "progress",
    title: "Progress",
    path: "/progress",
  },
];

export function NavigationRail() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["notes"])
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isActive = (path: string) => {
    // Exact match or child route match, but not parent match
    if (location.pathname === path) return true;

    // For paths with children, only match if it's a direct child
    // Prevent /notes from matching when on /notes/00-START-HERE
    if (
      path === "/notes" ||
      path === "/problems" ||
      path === "/solutions" ||
      path === "/templates" ||
      path === "/cheatsheets" ||
      path === "/progress"
    ) {
      return location.pathname === path;
    }

    // For specific note paths, match if pathname starts with it
    return (
      location.pathname.startsWith(path + "/") || location.pathname === path
    );
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.id);
    const active = isActive(item.path);

    return (
      <div key={item.id} className="nav-item-wrapper">
        <div
          className={`nav-item depth-${depth} ${active ? "active" : ""}`}
          style={{ paddingLeft: `${depth * 16 + 16}px` }}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleSection(item.id)}
              className="nav-expand-btn"
            >
              <span className="nav-expand-icon">{isExpanded ? "▼" : "▶"}</span>
              <span className="nav-title">{item.title}</span>
            </button>
          ) : (
            <Link to={item.path} className="nav-link">
              <span className="nav-title">{item.title}</span>
            </Link>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="nav-children">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="navigation-rail">
      <div className="nav-header">
        <h2 className="nav-brand">
          <span className="py">Py</span>
          <span className="master">Master</span>
        </h2>
        <p className="nav-subtitle">// learning system</p>
      </div>
      <div className="nav-content">
        {navigationData.map((item) => renderNavItem(item))}
      </div>
    </nav>
  );
}
