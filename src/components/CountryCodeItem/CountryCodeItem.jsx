import React from "react";

const CountryCodeItem = ({
  setSelectedCode,
  countryCodes,
  countryCode,
  flag,
}) => {
  //   console.log(countryCodes);
  return (
    <div
      className="w-full py-1 flex justify-between"
      onClick={() => setSelectedCode(countryCodes)}
    >
      <div className="flex gap-1">
        <p>{flag}</p>
        {countryCode}
      </div>

      <aside>+{countryCodes}</aside>
    </div>
  );
};

export default CountryCodeItem;
