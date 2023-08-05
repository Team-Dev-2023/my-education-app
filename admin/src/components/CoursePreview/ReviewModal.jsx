import { Modal, Pagination } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";

function ReviewModal({ open, handleSetClose, reviewData }) {
  //pagination
  const [page, setPage] = useState(1);
  const [paginationVisibleReview, setPaginationVisibleReview] = useState([]);
  const perPage = 7;

  const handleChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      setPaginationVisibleReview(reviewData.slice(0, perPage));
    }
    if (value > 1) {
      setPaginationVisibleReview(
        reviewData.slice((value - 1) * perPage, value * perPage - 1)
      );
    }
  };

  useEffect(() => {
    setPaginationVisibleReview(reviewData.slice(0, 10));
  }, [reviewData]);

  return (
    <Modal open={open} onClose={handleSetClose} className="overflow-scroll">
      <div className="bg-white min-w-[600px] min-h-[400px] max-w-[920px] p-[24px] mt-[92px] mx-auto">
        <p className="mb-[16px] text-[24px] flex flex-row">
          <StarIcon fontSize="inherit" className="mr-[4px] text-[#e59819]" />
          <span className="font-[700] text-[24px]">
            {"4.7"} course rating - {"55"} ratings
          </span>
        </p>
        <div className="flex flex-col">
          <div>
            {paginationVisibleReview.map((item) => (
              <ReviewItem key={item.uuid} item={item} />
            ))}
          </div>
          <div>
            {reviewData.length > 0 && (
              <div className="container w-full mx-auto flex justify-center mt-[16px]">
                <Pagination
                  count={Math.ceil(reviewData.length / 10)}
                  page={page}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReviewModal;
