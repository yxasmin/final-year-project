import { Link } from "react-router-dom";
import CHALLENGES from "../data/challengesData";
import useChallengeProgress from "../hooks/useChallengeProgress";
import "./Challenges.css";

export default function Challenges() {
  const { progress, toggleTask } = useChallengeProgress();

  const earnedCount = CHALLENGES.filter(
     c => c.tasks?.length > 0 && progress[c.id]?.length === c.tasks.length
    ).length;

    return (
      <div className="challenges-page">
        <h1>Challenges</h1>
        <Link to="/profile" className="back-link">
        ← Back to Profile
        </Link>
        <p className="subtitle">Complete tasks to earn badges</p>

        <div className="summary">
          <span>{earnedCount} / {CHALLENGES.length} badges earned</span>
          <Link to="/achievements" className="summary-link">View Achievements →</Link>      
      </div>

      <div className="challenge-list">
        {CHALLENGES.map(challenge => {
          const tasks = challenge.tasks || [];
          const completed = progress[challenge.id] || [];
          const isEarned = tasks.length > 0 && completed.length === tasks.length;
          const pct = tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0;

          console.log(challenge.id, challenge.badge);

          return (
            <div key={challenge.id} className="challenge-card">
              <div className="card-header">
                <img
                   src={challenge.badge}
                   alt={challenge.title}
                   className={`card-badge-img ${isEarned ? "badge-earned" : "badge-locked"}`}
                   />
                   <div className="card-header-text">
                    <h2>{challenge.title}</h2>
                    <p className="challenge-desc">{challenge.description}</p>
                  </div>
                  {isEarned && <span className="earned-tag">✓ Earned</span>}
                   </div>

                   <div className="progress-row">
                     <div className="progress-bar">
                       <div className="progress-fill" style={{ width: `${pct}%` }} />
                     </div>
                     <span className="progress-count">{completed.length}/{tasks.length}</span>
              </div>

              <ul className="task-list">
                {tasks.map(task => (
                  <li
                    key={task.id}
                    className={completed.includes(task.id) ? "done": ""}
                    onClick={() => toggleTask(challenge.id, task.id)}
                >
                  {task.text}
                </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
    );
}
      
  
  