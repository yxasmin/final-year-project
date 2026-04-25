import { useState, useEffect } from "react";

export default function useChallengeProgress() {
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem("challengeProgress");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem("challengeProgress", JSON.stringify(progress));
    }, [progress]);

    const toggleTask = (challengeId, taskId) => {
        setProgress(prev => {
          const challenge = prev[challengeId] || [];
          const updated = challenge.includes(taskId)
            ? challenge.filter(id => id !== taskId)
            : [...challenge, taskId];

          return {...prev, [challengeId]: updated };

        });
    };

    return { progress, toggleTask };

}