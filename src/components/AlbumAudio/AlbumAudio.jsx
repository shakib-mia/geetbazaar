import React, { useState } from "react";
import AlbumAudioForm from "../AlbumAudioForm/AlbumAudioForm";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AlbumAudio = (props) => {
  const location = useLocation();
  const { initFormData, setInitFormData, formData, setFormData } = props;
  console.log(formData);

  // Initialize forms based on mode (edit or create)
  const [forms, setForms] = useState(() =>
    location.pathname.includes("edit-album")
      ? formData.songs.map((song, index) => ({ ...song, id: index }))
      : [{ id: 0 }]
  );

  const addMoreForm = () => {
    // Create a new song template
    const newSong = {
      songName: "",
      isrc: "",
      artists: [
        { name: "", role: "Singer/Primary Artist" },
        { name: "", role: "Lyricist" },
        { name: "", role: "Composer" },
      ],
      selectedPlatforms: [],
      file: {},
      startMinutes: 0,
      startMinutes2: 0,
      startSeconds: 0,
      startSeconds2: 0,
      parentalAdvisory: false,
      instrumental: false,
      language: "",
      genre: "",
      subGenre: "",
      // liveDate: "",
      // liveTime: "",
      // releaseDate: "",
    };

    // Add the new song to both initFormData and forms
    const newId =
      forms.length > 0 ? Math.max(...forms.map((form) => form.id)) + 1 : 0;

    const newForm = { ...newSong, id: newId };
    // console.log(formData);
    if (formData.songs.length < 25) {
      formData.songs.push(newSong);

      // setInitFormData((prevFormData) => [...prevFormData, newForm]);
      setFormData({ ...formData });
      setForms((prevForms) => [...prevForms, newForm]);
    } else {
      toast.error("Maximum number of audio limit reached");
    }
  };

  return (
    <>
      {forms.map((form, key) => (
        <AlbumAudioForm
          key={form.id}
          id={form.id}
          count={forms.length}
          setCount={() => {}} // If you're not using this, you can remove it
          {...props}
        />
      ))}

      <div className="flex justify-center gap-2">
        <Button
          containerClassName={"w-fit xl:mt-5"}
          onClick={addMoreForm}
          text={"Add More"}
        />
        <Button
          containerClassName={"w-fit xl:mt-5"}
          onClick={() => props.setScreen("preview")}
          text={"Finish"}
        />
      </div>
    </>
  );
};

export default AlbumAudio;
