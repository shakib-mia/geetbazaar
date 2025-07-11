import React, { useContext, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";

const AddSplitModal = ({ song, setSplitId, setAdding }) => {
  // console.log(song);
  const { userData, updated, setUpdated } = useContext(ProfileContext);
  console.log(userData);
  const [error, setError] = useState("");

  const [splits, setSplits] = useState([
    { emailId: userData.emailId, percentage: "" },
    { emailId: "", percentage: "" },
    { emailId: "", percentage: "" },
  ]);

  // Calculate the total percentage
  const totalPercentage = splits.reduce(
    (sum, split) => sum + (parseFloat(split.percentage) || 0),
    0
  );

  // Remaining percentage available for allocation
  const remainingPercentage = 100 - totalPercentage;

  // Button states
  const isConfirmDisabled = totalPercentage !== 100;
  const isAddMoreDisabled = totalPercentage >= 100;
  const isDeleteDisabled = totalPercentage === 100;

  // Handler for updating individual fields in the splits array
  const handleInputChange = (index, field, value) => {
    setSplits((prevSplits) => {
      const updatedSplits = prevSplits.map((split, i) =>
        i === index ? { ...split, [field]: value } : split
      );

      if (field === "percentage") {
        const newTotalPercentage = updatedSplits.reduce(
          (sum, split) => sum + (parseFloat(split.percentage) || 0),
          0
        );
        // Prevent updating percentage if total exceeds 100
        if (newTotalPercentage > 100) {
          return prevSplits; // Do not update splits if adding this value exceeds 100
        }
      }

      // Validate all emails for uniqueness
      const updatedErrors = updatedSplits.map((split, i) => {
        if (split.emailId.trim() === "") return ""; // No error for empty field
        const isDuplicate = updatedSplits.some(
          (s, idx) => idx !== i && s.emailId === split.emailId
        );
        return isDuplicate ? "Email Address Taken" : "";
      });

      // Apply updated errors back to splits
      return updatedSplits.map((split, i) => ({
        ...split,
        error: updatedErrors[i],
      }));
    });
  };

  // Add a new split
  const addSplit = () => {
    if (!isAddMoreDisabled) {
      setSplits((prevSplits) => [
        ...prevSplits,
        { emailId: "", percentage: "" },
      ]);
    }
  };

  // Delete a split
  const deleteSplit = (index) => {
    // if (!isDeleteDisabled) {
    setSplits((prevSplits) => prevSplits.filter((_, i) => i !== index));
    // }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setAdding(song._id);
    // Check for duplicate emails
    const emails = splits.map((split) => split.emailId);
    const hasDuplicates = new Set(emails).size !== emails.length;
    if (hasDuplicates) {
      setError("Email Address Taken");
    }

    const splitData = {
      isrc: song.ISRC,
      songName: song.Song,
      splits: splits
        .map(({ error, ...rest }) => rest)
        .filter((split) => split.emailId.trim() !== ""),
      confirmed: false,
      owner: userData.emailId,
    };

    // console.log(splitData);
    axios.post(backendUrl + "royalty-splits", splitData).then(({ data }) => {
      setSplitId("");
      if (data.acknowledged) {
        setUpdated(!updated);
      }
    });
    // .finally(() => setAdding(false));
    setTimeout(() => setAdding(""), 1000);
  };

  return (
    <form onSubmit={handleConfirm}>
      <h4 className="text-heading-4-bold text-center">
        {song.songName || song.Song}
      </h4>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="relative h-1 bg-gray-300 rounded">
          <div
            className="absolute top-0 left-0 h-1 bg-blue-500 rounded"
            style={{ width: `${Math.min(totalPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-center mt-1">
          Total Percentage: {totalPercentage}%{" "}
          {totalPercentage > 100 && (
            <span className="text-red-500">(Exceeded 100%)</span>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {splits.map((split, index) => {
          // Calculate the max percentage for the current input
          const maxPercentage =
            split.percentage !== ""
              ? parseFloat(split.percentage) + remainingPercentage
              : remainingPercentage;

          return (
            <div key={index} className="flex items-end gap-2">
              <aside className="flex gap-2 w-full">
                <InputField
                  containerClassName="w-1/2"
                  label="Email ID"
                  placeholder="Enter your partner's/Co-Artist's Email ID"
                  value={split.emailId}
                  hideRequired
                  disabled={index === 0}
                  required={splits.length > 3}
                  onChange={(e) =>
                    handleInputChange(index, "emailId", e.target.value)
                  }
                  note={split.error} // Display specific error for this field
                  id={`email-${index}`}
                  dangerNote={split.error}
                />

                <InputField
                  containerClassName="w-1/2"
                  label="Percentage"
                  placeholder="Enter Split Percentage"
                  type="number"
                  min="1"
                  hideRequired
                  required={splits.length > 3 && split.emailId}
                  max={maxPercentage} // Dynamically limit input
                  value={split.percentage}
                  onChange={(e) =>
                    handleInputChange(index, "percentage", e.target.value)
                  }
                />
              </aside>
              <Button
                type="button"
                onClick={() => deleteSplit(index)}
                className="bg-interactive-light-destructive hover:!bg-interactive-light-destructive-hover focus:!bg-interactive-light-destructive-focus active:!bg-interactive-light-destructive-active disabled:hover:!bg-interactive-light-destructive-disabled"
                disabled={index === 0 || totalPercentage === 100}
                containerClassName={"relative -bottom-1"}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>

      <div className="flex mt-4 justify-center gap-4">
        <Button type="button" onClick={addSplit} disabled={isAddMoreDisabled}>
          Add More Splits
        </Button>

        <Button type="submit" disabled={isConfirmDisabled}>
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default AddSplitModal;
