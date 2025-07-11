import React, { useContext, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import Button from "../Button/Button";
import PlatformSelection from "../PlatformSelection/PlatformSelection";
const Platform = () => {
  const { setScreen, formData } = useContext(ScreenContext);
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    formData.selectedPlatforms || []
  );

  return (
    <div className="pb-6">
      <PlatformSelection
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />
      <Button
        disabled={!selectedPlatforms?.length}
        className={"!w-1/5 mx-auto mt-5"}
        onClick={() => setScreen("audio")}
      >
        Save and Next
      </Button>
    </div>
  );
};

export default Platform;
