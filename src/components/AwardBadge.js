import React from "react";
import { css } from "glamor";

let box = css({
  cursor: "pointer",
  display: "block",
  position: "absolute",
  right: "20px",
  top: "0px",
  "& .badge": { width: "50px", height: "50px", borderRadius: "50%" },
  "& .silver": { backgroundColor: "silver" },
  "& .gold": { backgroundColor: "gold" },
  "& .bronze": { backgroundColor: "orange" },
  "& .text": {
    display: "none",
    position: "absolute",
    top: "50px",
    right: 0,
    backgroundColor: "#333333",
    boxShadow: "2px 2px 4px -1px #888",
    color: "white",
    padding: "4px",
    whiteSpace: "nowrap"
  },
  ":hover .text": { display: "block" }
});

const AwardBadge = ({ awardText, awardLevel }) => (
  <div {...box}>
    {awardText && <div className="text">{awardText}</div>}
    {awardLevel == "" && awardText != "" ? <div className="ribbon" /> : null}
    {awardLevel == "" && awardText != "" ? (
      <div className="ribbon-shadow" />
    ) : null}
    {awardLevel == "" && awardText != "" ? (
      <div className={`coin gold`} />
    ) : null}
    {awardLevel && <div className="ribbon" />}
    {awardLevel && <div className="ribbon-shadow" />}
    {awardLevel && <div className={`coin ` + awardLevel} />}
  </div>
);
export default AwardBadge;
