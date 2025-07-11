import React from "react";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import SelectOptions from "../../components/SelectOptions/SelectOptions";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";

const BulkUpload = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = {};

    formData.forEach((value, key) => {
      if (value instanceof File) {
        formObject[key] = value; // or use value.name if you just want the file name
      } else {
        formObject[key] = value;
      }
    });

    // formData.forEach((item) => console.log(item));

    // console.log(formObject);
    axios
      .post(backendUrl + "bulk-upload", formObject)
      .then(({ data }) => console.log(data));
  };
  return (
    <div className="p-7">
      <h3 className="text-heading-3-bold text-center text-black-deactivated">
        Bulk Upload
      </h3>

      <form action="" className="mt-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <InputField
            type={"text"}
            id={"serial-no"}
            name={"serial-no"}
            label={"Serial Number"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"isrc-no"}
            name={"isrc-no"}
            label={"ISRC NUMBER (International Standard Recording Code)"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"iswc-no"}
            name={"iswc-no"}
            label={
              "ISWC (International Standard Musical Work Code -Alloted by the Society)"
            }
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"song-title"}
            name={"song-title"}
            label={"Song Title"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"Language"}
            name={"Language"}
            label={"Language"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"sub-lang"}
            name={"sub-lang"}
            label={"TITLE SUB LANGUAGE CODE"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"Duration"}
            name={"Duration"}
            label={"Duration"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"work-category"}
            name={"work-category"}
            label={"Work Category"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"work-sub-category"}
            name={"work-sub-category"}
            label={"Work Sub Category"}
            hideRequired={true}
          />
          <SelectOptions
            type={"multi-select"}
            id={"work-type"}
            name={"work-type"}
            options={["Vocal", "Instrumental"]}
            label={"Work Type (VOCAL / INSTRUMENTAL) "}
            hideRequired={true}
          />
          <SelectOptions
            type={"multi-select"}
            id={"text-music-relation"}
            name={"text-music-relation"}
            options={["Instrumental", "Music", "Both"]}
            label={"Text music relation"}
            hideRequired={true}
          />
          <SelectOptions
            type={"multi-select"}
            id={"version"}
            name={"version"}
            options={["Original", "Modified"]}
            label={"Version"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"singer"}
            name={"singer"}
            label={"Singer / Performer"}
            hideRequired={true}
            placeholder={"Enter Singer / Performer Name"}
          />
        </div>

        <div className="my-7 grid grid-cols-2 gap-2">
          <InputField
            type={"text"}
            id={"composer-ipi"}
            name={"composer-ipi"}
            label={"COMPOSER IPI NAME NUMBER (MEMBERS)"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"composer-first-name"}
            name={"composer-first-name"}
            label={"COMPOSER FIRST NAME"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"composer-last-name"}
            name={"composer-last-name"}
            label={"COMPOSER LAST NAME"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"member-code"}
            name={"member-code"}
            label={"MEMBER CODE"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"mechanical-society"}
            name={"mechanical-society"}
            label={"MECHANICAL SOCIETY"}
            hideRequired={true}
            disabled={true}
            note={"Leave it Blank"}
          />

          <SelectOptions
            type={"multi-select"}
            id={"composer-cae"}
            name={"composer-cae"}
            options={["Composer", "Author", "Publisher"]}
            label={"CAE"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"composer-performance-share"}
            name={"composer-performance-share"}
            label={"PERFORMANCE SHARE "}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"composer-mechanical-share"}
            name={"composer-mechanical-share"}
            label={"MECHANICAL SHARE"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"composer-sync-share"}
            name={"composer-sync-share"}
            label={"SYNC SHARE "}
            hideRequired={true}
          />
        </div>

        <div className="my-7 grid grid-cols-2 gap-2">
          <InputField
            type={"text"}
            id={"second-composer-ipi"}
            name={"second-composer-ipi"}
            label={"SECOND COMPOSER IPI NAME NUMBER (MEMBERS)"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"second-composer-first-name"}
            name={"second-composer-first-name"}
            label={"COMPOSER FIRST NAME"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"second-composer-last-name"}
            name={"second-composer-last-name"}
            label={"COMPOSER LAST NAME"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"second-composer-member-code"}
            name={"second-composer-member-code"}
            label={"MEMBER CODE"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"second-composer-mechanical-society"}
            name={"second-composer-mechanical-society"}
            label={"MECHANICAL SOCIETY"}
            hideRequired={true}
            disabled={true}
            note={"Leave it Blank"}
          />

          <SelectOptions
            type={"multi-select"}
            id={"second-composer-cae"}
            name={"second-composer-cae"}
            options={["Composer", "Author", "Publisher"]}
            label={"CAE"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"second-composer-performance-share"}
            name={"second-composer-performance-share"}
            label={"PERFORMANCE SHARE "}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"second-composer-mechanical-share"}
            name={"second-composer-mechanical-share"}
            label={"MECHANICAL SHARE"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"second-composer-sync-share"}
            name={"second-composer-sync-share"}
            label={"SYNC SHARE "}
            hideRequired={true}
          />
        </div>

        <div className="my-7 grid grid-cols-2 gap-2">
          <InputField
            type={"text"}
            id={"author-ipi"}
            name={"author-ipi"}
            label={"IPI NAME NUMBER (MEMBERS)"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"author-first-name"}
            name={"author-first-name"}
            label={"FIRST NAME"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"author-last-name"}
            name={"author-last-name"}
            label={"LAST NAME"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"author-member-code"}
            name={"author-member-code"}
            label={"MEMBER CODE"}
            hideRequired={true}
          />
          <InputField
            type={"text"}
            id={"author-mechanical-society"}
            name={"author-mechanical-society"}
            label={"MECHANICAL SOCIETY"}
            hideRequired={true}
            disabled={true}
            note={"Leave it Blank"}
          />

          <SelectOptions
            type={"multi-select"}
            id={"author-cae"}
            name={"author-cae"}
            options={["Composer", "Author", "Publisher"]}
            label={"CAE"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"author-PERFORMANCE-SHARE"}
            name={"author-PERFORMANCE-SHARE"}
            label={"PERFORMANCE SHARE "}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"author-MECHANICAL-SHARE"}
            name={"author-MECHANICAL-SHARE"}
            label={"MECHANICAL SHARE"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"author-SYNC-SHARE"}
            name={"author-SYNC-SHARE"}
            label={"SYNC SHARE "}
            hideRequired={true}
          />
        </div>

        <div className="my-7 grid grid-cols-3 gap-2">
          <InputField
            type={"number"}
            id={"member-ipi-name"}
            name={"member-ipi-name"}
            label={"IPI NAME NUMBER (MEMBERS)  "}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"production-title"}
            name={"production-title"}
            label={
              "PRODUCTION TITLE OR FILM NAME OR ALBUM NAME OR SINGLE NAME "
            }
            hideRequired={true}
          />

          <InputField
            type={"number"}
            id={"alternative-title"}
            name={"alternative-title"}
            label={"ALTERNATIVE TITLE / OTHER TITLE OF SONG "}
            hideRequired={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InputField
            type={"number"}
            id={"submitted-by"}
            name={"submitted-by"}
            label={"Submitted by "}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"youtube-asset-id"}
            name={"youtube-asset-id"}
            label={"YouTube Asset ID For example - A711132219079712"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"spotify-id"}
            name={"spotify-id"}
            label={
              "Spotify ID (Licensor Track ID) For example -1LZzUWParmtfuuydjmQVbS"
            }
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"apple-id"}
            name={"apple-id"}
            label={"Apple ID (Track DSP ID) For example - 1523521149"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"amazon-id"}
            name={"amazon-id"}
            label={"Amazon ID (DSP Resource ID) For example- AB00NB49ZM6"}
            hideRequired={true}
          />
          <InputField
            type={"number"}
            id={"validation-link"}
            name={"validation-link"}
            label={"Validation Link"}
            hideRequired={true}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default BulkUpload;
