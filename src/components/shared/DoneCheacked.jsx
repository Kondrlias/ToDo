export default function DoneCheacked({ isCompleted, onToggle }) {
  return <input type="checkbox" checked={isCompleted} onChange={onToggle} />;
}
