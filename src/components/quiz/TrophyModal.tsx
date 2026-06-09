interface TrophyModalProps {
  onClose: () => void;
}

export const TrophyModal = ({ onClose }: TrophyModalProps) => {
  return (
    <div className="quiz-modal-backdrop" role="dialog" aria-modal="true">
      <div className="quiz-modal">
        <div className="quiz-trophy" aria-hidden="true">
          🏆
        </div>
        <h3>Golden Trophy Earned!</h3>
        <p>You answered correctly. Legendary work, historian.</p>
        <button type="button" className="quiz-modal-btn" onClick={onClose}>
          Keep Playing
        </button>
      </div>
    </div>
  );
};
