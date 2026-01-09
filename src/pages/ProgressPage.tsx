import { useState } from "react";
import "./ProgressPage.css";

interface WeekProgress {
  week: number;
  title: string;
  topics: string;
  status: "completed" | "in-progress" | "not-started";
  problems: string[];
  checkedProblems: Set<number>;
}

export function ProgressPage() {
  const [weeks, setWeeks] = useState<WeekProgress[]>([
    {
      week: 1,
      title: "Foundation",
      topics: "Python Basics + Complexity + Arrays Intro",
      status: "in-progress",
      problems: [
        "Two Sum",
        "Best Time to Buy and Sell Stock",
        "Contains Duplicate",
        "Maximum Subarray",
        "Valid Palindrome",
      ],
      checkedProblems: new Set(),
    },
    {
      week: 2,
      title: "Arrays & Strings",
      topics: "Two Pointers + Sliding Window",
      status: "not-started",
      problems: [],
      checkedProblems: new Set(),
    },
  ]);

  const [reflection, setReflection] = useState("");
  const [currentStreak] = useState(0);

  const toggleProblem = (weekIndex: number, problemIndex: number) => {
    setWeeks((prev) => {
      const updated = [...prev];
      const week = { ...updated[weekIndex] };
      const newChecked = new Set(week.checkedProblems);

      if (newChecked.has(problemIndex)) {
        newChecked.delete(problemIndex);
      } else {
        newChecked.add(problemIndex);
      }

      week.checkedProblems = newChecked;
      updated[weekIndex] = week;
      return updated;
    });
  };

  const getTotalProblems = () => {
    return weeks.reduce((sum, week) => sum + week.problems.length, 0);
  };

  const getSolvedProblems = () => {
    return weeks.reduce((sum, week) => sum + week.checkedProblems.size, 0);
  };

  return (
    <div className="progress-page">
      <h1>Progress Tracker</h1>
      <p className="progress-subtitle">// systematic learning log</p>

      <div className="progress-summary">
        <div className="summary-item">
          <span className="summary-label">Problems Solved</span>
          <span className="summary-value">
            {getSolvedProblems()} / {getTotalProblems()}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Current Streak</span>
          <span className="summary-value">{currentStreak} days</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Current Week</span>
          <span className="summary-value">Week {weeks[0].week}</span>
        </div>
      </div>

      <div className="weeks-container">
        {weeks.map((week, weekIndex) => (
          <div key={week.week} className={`week-card status-${week.status}`}>
            <div className="week-header">
              <h2 className="week-title">
                Week {week.week}: {week.title}
              </h2>
              <span className="week-status">{getStatusIcon(week.status)}</span>
            </div>
            <p className="week-topics">{week.topics}</p>

            {week.problems.length > 0 && (
              <div className="problems-list">
                <h3 className="problems-heading">Problems</h3>
                {week.problems.map((problem, problemIndex) => (
                  <label key={problemIndex} className="problem-item">
                    <input
                      type="checkbox"
                      checked={week.checkedProblems.has(problemIndex)}
                      onChange={() => toggleProblem(weekIndex, problemIndex)}
                    />
                    <span className="problem-name">{problem}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="reflection-section">
        <h2>Weekly Reflection</h2>
        <p className="reflection-hint">// what did you learn this week?</p>
        <textarea
          className="reflection-input"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your thoughts, challenges, and insights..."
          rows={8}
        />
      </div>
    </div>
  );
}

function getStatusIcon(status: string): string {
  switch (status) {
    case "completed":
      return "✓";
    case "in-progress":
      return "●";
    case "not-started":
      return "○";
    default:
      return "○";
  }
}
