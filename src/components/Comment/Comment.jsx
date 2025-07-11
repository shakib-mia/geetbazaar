import React from "react";

const Comment = ({ image, cmntBody }) => {
  return (
    <div className="flex items-center gap-2 mt-[4px] w-4/5 ml-auto">
      <img src={image} alt="" />
      <p className="text-subtitle-2 font-semibold text-white">{cmntBody}</p>
    </div>
  );
};

export default Comment;
