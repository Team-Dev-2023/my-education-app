import { useLocation, useNavigate } from "react-router-dom";

function CourseDetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="bg-[#7a0fe411] rounded-md p-2 mx-2"
        onClick={() => {
          navigate("/");
        }}
      >
        HomePage
      </button>
    </div>
  );
}

export default CourseDetailPage;
