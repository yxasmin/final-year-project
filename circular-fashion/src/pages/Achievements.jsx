import { Link } from 'react-router-dom';
import CHALLENGES from "../data/challengesData";
import useChallengeProgress from "../hooks/useChallengeProgress";
import './Achievements.css';


export default function Achievements() {
  const { progress } = useChallengeProgress();

  const earned = CHALLENGES.filter(
    c => progress[c.id]?.length === c.tasks.length
  );
  const locked = CHALLENGES.filter(
    c => !progress[c.id] || progress[c.id].length < c.tasks.length
  );

  return (
    <div className="achievements-page">
      
      <h1>Achievements</h1>
      <Link to="/challenges" className="back-link">← Challenges</Link>

      <div className="ach-meta">
        <span className="ach-count">{earned.length} / {CHALLENGES.length} badges earned</span>

        {earned.length > 0 && (
          <span className="ach-pill">{earned.length} unlocked</span>
        )}
      </div>
      
      <p className="section-label">Earned</p>
      {earned.length === 0 ? (
        <div className="empty-earned">Complete a challenge to earn your first badge</div>
      ) : (
        <div className="badge-grid">
          {earned.map(ch => (
            <div key={ch.id} className="badge earned">
              <div className="badge-icon">
                <img src={ch.badge} alt={ch.title} style={{ width: 40, height: 40}} />
                  
              </div>
              <p className="badge-name">{ch.title}</p>
           </div>
          ))}
        </div>
      )}

      <p className="section-label">Locked</p>
      <div className="badge-grid">
        {locked.map(ch => (
      <div key={ch.id} className="badge locked">
        <p className="badge-name">{ch.title}</p>
          <p className="badge-progress">
            {progress[ch.id]?.length || 0}/{ch.tasks.length} tasks
          </p>
        </div>
        ))}
      </div>
    </div>
  );
}
 






