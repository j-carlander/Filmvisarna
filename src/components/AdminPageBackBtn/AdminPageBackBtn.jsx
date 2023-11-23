/**
 * component for a button tha navigates back one step
 */

import { useNavigate } from "react-router-dom";

export function AdminPageBackBtn({ text }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="adminpage-back-btn">
      <img src="/chevron-left.svg" width="20" />
      {text}
    </button>
  );
}
