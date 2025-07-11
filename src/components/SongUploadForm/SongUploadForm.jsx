import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { backendUrl, config } from "../../constants";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { toast } from "react-toastify";
import CallerTuneTimeStamp from "../CallerTuneTimeStamp/CallerTuneTimeStamp";
import SelectInput from "../SelectInput/SelectInput";
import SelectOptions from "../SelectOptions/SelectOptions";
import Form from "../Form/Form";

const SongUploadForm = ({ index, setSubmitted, uploadType }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [previouslyReleased, setPreviouslyReleased] = useState(false);
  const [isrc, setIsrc] = useState("");
  const [updatedIsrc, setUpdatedIsrc] = useState(newIsrc);
  const [formIsValid, setFormIsValid] = useState(false); // State to track form validity
  const formRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [genre, setGenre] = useState("Film");
  const [subGenreOptions, setSubGenreOptions] = useState([]);
  const [recordLabels, setRecordLabels] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };
    axios
      .get(backendUrl + "record-labels", config)
      .then(({ data }) => setRecordLabels(data))
      .catch((err) => {
        if (err.response.status === 401) {
          sessionStorage.removeItem("token");
        }
      });
  }, []);

  useEffect(() => {
    const options =
      genre === "Film"
        ? [
            "Devotional",
            "Dialogue",
            "Ghazal",
            "Hip-Hop/ Rap",
            "Instrumental",
            "Patriotic",
            "Remix",
            "Romantic",
            "Sad",
            "Unplugged",
          ]
        : genre === "Pop"
        ? [
            "Acoustic Pop",
            "Band Songs",
            "Bedroom Pop",
            "Chill Pop",
            "Contemporary Pop",
            "Country Pop/ Regional Pop",
            "Dance Pop",
            "Electro Pop",
            "Lo-Fi Pop",
            "Love  Songs",
            "Pop Rap",
            "Pop Singer-Songwriter",
            "Sad Songs",
            "Soft Pop",
          ]
        : genre === "Indie"
        ? [
            "Indian Indie",
            "Indie Dance",
            "Indie Folk",
            "Indie Hip-Hop",
            "Indie Lo-Fi",
            "Indie Pop",
            "Indie Rock",
            "Indie Singer -Songwriter",
          ]
        : genre === "Hip-Hop/Rap"
        ? [
            "Alternative Hip-Hop",
            "Concious Hip-Hop",
            "Country Rap",
            "Emo Rap",
            "Hip-Hop",
            "Jazz Rap",
            "Pop Rap",
            "Trap",
            "Trap Beats",
          ]
        : genre === "Folk"
        ? [
            "Ainchaliyan",
            "Alha",
            "Atulprasadi",
            "Baalgeet/ Children Song",
            "Banvarh",
            "Barhamasa",
            "Basant Geet",
            "Baul Geet",
            "Bhadu Gaan",
            "Bhagawati",
            "Bhand",
            "Bhangra",
            "Bhatiali",
            "Bhavageete   ",
            "Bhawaiya",
            "Bhuta song",
            "Bihugeet",
            "Birha",
            "Borgeet",
            "Burrakatha",
            "Chappeli",
            "Daff",
            "Dandiya Raas",
            "Dasakathia",
            "Deijendrageeti",
            "Deknni",
            "Dhamal",
            "Gadhwali",
            "Gagor",
            "Garba",
            "Ghasiyari Geet",
            "Ghoomar",
            "Gidda",
            "Gugga",
            "Hafiz Nagma",
            "Heliam",
            "Hereileu",
            "Hori",
            "Jaanapada Geethe",
            "Jaita",
            "Jhoori",
            "Jhora",
            "Jhumur",
            "Jugni",
            "Kajari",
            "Kajari/ Kajari /Kajri",
            "Karwa Chauth Songs",
            "Khor",
            "Koligeet",
            "Kumayuni",
            "Kummi Paatu  ",
            "Lagna Geet /Marriage Song",
            "Lalongeeti",
            "Lavani",
            "Lokgeet",
            "Loor",
            "Maand",
            "Madiga Dappu",
            "Mando",
            "Mapilla",
            "Naatupura Paadalgal",
            "Naqual",
            "Nati ",
            "Nautanki",
            "Nazrulgeeti",
            "Neuleu",
            "Nyioga",
            "Oggu Katha",
            "Paani Hari",
            "Pai Song",
            "Pandavani",
            "Pankhida",
            "Patua Sangeet",
            "Phag Dance",
            "Powada",
            "Qawwali",
            "Rabindra Sangeet",
            "Rajanikantageeti",
            "Ramprasadi",
            "Rasiya",
            "Rasiya Geet",
            "Raslila",
            "Raut Nacha ",
            "Saikuthi Zai",
            "Sana Lamok",
            "Shakunakhar-Mangalgeet",
            "Shyama Sangeet",
            "Sohar",
            "Sumangali",
            "Surma",
            "Suvvi paatalu",
            "Tappa",
            "Teej songs",
            "Tusu Gaan",
            "Villu Pattu",
          ]
        : genre === "Devotional"
        ? [
            "Aarti",
            "Bhajan",
            "Carol",
            "Chalisa",
            "Chant",
            "Geet",
            "Gospel",
            "Gurbani",
            "Hymn",
            "Kirtan",
            "Kirtan",
            "Mantra",
            "Mantra",
            "Paath",
            "Qawwals",
            "Shabd",
          ]
        : genre === "Hindustani Classical"
        ? ["Instrumental", "Vocal "]
        : genre === "Carnatic Classical"
        ? ["Instrumental", "Vocal"]
        : genre === "Ambient / Instrumental"
        ? ["Soft", "Easy Listening", "Electronic", "Fusion", "Lounge"]
        : [];

    setSubGenreOptions(options);
  }, [genre]);

  const fields = [
    {
      required: true,
      placeholder: "UPC",
      name: "UPC",
      type: "text",
      label: "UPC",
      note: "If you already have a UPC for this release, please add. If not, no problem, we'll create one for you.",
    },
    // {
    //   block1: [
    {
      required: true,
      label: "Album Name",
      placeholder: "Album Name",
      name: "Album",
      type: "text",
    },
    {
      required: true,
      label: "Song Name",
      placeholder: "Song Name",
      name: "Song",
      type: "text",
    },
    {
      required: true,
      placeholder: "ISRC",
      name: "ISRC",
      type: "text",
      label: "ISRC",
      value: previouslyReleased ? isrc : updatedIsrc,
      disabled: !previouslyReleased,
      onChange: (e) => setIsrc(e.target.value),
    },
    {
      required: true,
      placeholder: "Date of Release",
      name: "Date of Release",
      type: "date",
      label: "Date of Release",
    },

    {
      required: true,
      placeholder: "Go Live Date",
      name: "Go Live Date",
      type: "date",
      label: "Go Live Date",
    },

    {
      required: true,
      placeholder: "Go Live Time",
      name: "Go Live Time",
      type: "time",
      label: "Go Live Time",
      // onChange: (e) => console.log(e.target.value),
    },

    {
      required: true,
      type: "select-input",
      // placeholder: "Parental Advisory",
      name: "Instrumental",
      label: "Is this an Instrumental?",
      options: ["No", "Yes"],
    },
    {
      required: true,
      // placeholder: "Record Label",
      name: "Record Label",
      label: "Record Label",
      type: "select-input",
      options: recordLabels,
      // onChange: (e) => console.log(e.target.value),
    },
    {
      required: true,
      placeholder: "Reporting Partner",
      name: "Reporting Partner",
      label: "Reporting Partner",
    },

    {
      required: true,
      placeholder: "Language",
      name: "Language",
      label: "Language",
      type: "select-input",
      options: [
        "Ahirani",
        "Arabic",
        "Assamese",
        "Awadhi",
        "Bengali",
        "Bhojpuri",
        "Chattisgarhi",
        "Dogri",
        "English",
        "Garhwali",
        "Garo",
        "Gujarati",
        "Haryanvi",
        "Himachali",
        "Hindi",
        "Instrumental",
        "Kannada",
        "Kashmiri",
        "Khasi",
        "kokborok",
        "Konkani",
        "kumauni",
        "Maithili",
        "Malayalam",
        "Mandarin",
        "Manipuri",
        "Marathi",
        "Marwari",
        "Naga",
        "Nagpuri",
        "Nepali",
        "Odia",
        "Punjabi",
        "Rajasthani",
        "Rajbongshi",
        "Sanskrit",
        "Tamil",
        "Telugu",
        "Urdu",
        "Tulu",
      ],
    },
    {
      required: true,
      placeholder: "Genre",
      name: "Genre",
      label: "Genre",
      type: "select-input",
      onChange: (e) => setGenre(e.target.value),
      options: [
        "Film",
        "Pop",
        "Indie",
        "Hip-Hop/Rap",
        "Folk",
        "Devotional",
        "Hindustani Classical",
        "Carnatic Classical",
        "Ambient / Instrumental",
      ],
    },

    {
      required: true,
      placeholder: "Sub Genre",
      name: "Sub Genre",
      label: "Sub Genre",
      type: "select-input",
      options: subGenreOptions,
      disabled: genre.length === 0,
    },

    {
      required: true,
      placeholder: "Description",
      name: "Description",
      label: "Description",
    },
    {
      required: true,
      placeholder: "Mood",
      // name:"mood",
      type: "select-input",
      options: [
        "Romantic",
        "Happy",
        "Sad",
        "Dance",
        "Bhangra",
        "Patriotic",
        "Nostalgic",
        "Inspirational",
        "Enthusiastic",
        "Optimistic",
        "Passion",
        "Pessimistic",
        "Spiritual",
        "Peppy",
        "Philosophical",
        "Mellow",
        "Calm",
      ],
      name: "Mood",
      label: "Mood",
    },
    {
      required: true,
      placeholder: "Sub Category",
      name: "Sub Category",
      label: "Sub Category",
    },

    {
      required: true,
      type: "select-input",
      placeholder: "Parental Advisory",
      name: "Parental Advisory",
      label: "Parental Advisory",
      options: ["Non Explicit", "Explicit"],
    },

    {
      required: true,
      type: "date",
      placeholder: "Original Release Date of Music",
      name: "Original Release Date of Music",
      label: "Original Release Date of Music",
    },

    {
      required: true,
      placeholder: "Artist Name",
      name: "ArtistName",
      label: "Artist Name",
    },
    {
      required: true,
      placeholder: "Featuring Artist",
      name: "FeaturingArtistName",
      label: "Featuring Artist Name",
    },
    {
      required: true,
      placeholder: "Composer",
      name: "Composer",
      label: "Composer",
    },
    {
      required: true,
      placeholder: "Lyricist",
      name: "Lyricist",
      label: "Lyricist",
    },

    {
      required: false,
      placeholder: "Spotify Artist Profile / ID for the track Main Artist",
      name: "SpotifyMainArtist",
      label: "Spotify Artist Profile / ID for the track Main Artist",
    },

    {
      required: false,
      placeholder: "Spotify Artist Profile / ID for the track Featured Artist",
      name: "SpotifyFeaturedArtist",
      label: "Spotify Artist Profile / ID for the track Featured Artist",
    },

    {
      required: false,
      placeholder: "Apple Artist ID for Track Main Artist",
      name: "AppleMainArtist",
      label: "Apple Artist ID for Track Main Artist",
    },

    {
      required: false,
      placeholder: "Apple Artist ID for Composer",
      name: "AppleFeaturedArtist",
      label: "Apple Artist ID for Composer",
    },

    uploadType === "Film" && {
      required: false,
      placeholder: "Apple Artist ID for Lyricist",
      name: "AppleLyricistD",
      label: "Apple Artist ID for Lyricist",
    },

    uploadType === "Film" && {
      required: false,
      placeholder: "Apple Artist ID for Film Producer",
      name: "AppleFilmProducerID",
      label: "Apple Artist ID for Film Producer",
    },

    uploadType === "Film" && {
      required: false,
      placeholder: "Apple Artist ID for Film Director",
      name: "AppleFilmDirectorID",
      label: "Apple Artist ID for Film Director",
    },

    uploadType === "Film" && {
      required: false,
      placeholder: "Apple Artist ID for Starcast",
      name: "AppleStarcastID",
      label: "Apple Artist ID for Starcast",
    },

    {
      required: false,
      placeholder: "https://www.facebook.com/username",
      name: "FacebookMainArtist",
      label: "Facebook page link for Track Main Artist",
    },
    {
      required: false,
      placeholder: "https://www.instagram.com/username",
      name: "InstagramHandleMainArtist",
      label: "Instagram Artist handle for Track Main Artist",
    },

    uploadType === "Film" && {
      required: true,
      type: "date",
      placeholder: "Original Release Date of Movie",
      name: "Original Release Date of Movie",
      label: "Original Release Date of Movie",
    },

    uploadType === "Film" && {
      required: true,
      type: "text",
      placeholder: "Film Banner",
      name: "Film Banner",
      label: "Film Banner",
    },

    uploadType === "Film" && {
      required: true,
      type: "text",
      placeholder: "Film Director",
      name: "Film Director",
      label: "Film Director",
    },

    uploadType === "Film" && {
      required: true,
      type: "text",
      placeholder: "Film Producer",
      name: "Film Producer",
      label: "Film Producer",
    },

    uploadType === "Film" && {
      required: true,
      type: "text",
      placeholder: "Film Star Casts/Actors",
      name: "Film Star Casts/Actors",
      label: "Film Star Casts/Actors",
    },

    {
      required: true,
      // placeholder: "Sub Category",
      type: "file",
      name: "song",
      label: "Song",
      accept: ".wav,.mp3",
      note: "Upload Your Song Here",
      onChange: (event) => {
        const file = event.target.files[0]; // Get the file
        if (file && file.type.startsWith("audio/")) {
          const audioUrl = URL.createObjectURL(file);
          setAudioUrl(audioUrl);
          const audio = new Audio(audioUrl);

          audio.onloadedmetadata = () => {
            // audio;
            // Access audio duration here
            setAudioDuration(audio.duration);
            // `Audio Duration: ${audio.duration} seconds`;
            // Perform any action with the duration here

            // Remember to revoke the created URL to avoid memory leaks
            URL.revokeObjectURL(audioUrl);
          };
        }
      },
    },

    {
      required: true,
      type: "file",
      placeholder: "Art Work",
      name: "art-work",
      label: "Art Work",
      accept: "image/jpg",
      note: "Upload Your Artwork Here (3000 X 3000, .jpg)",
      onChange: (e) => {
        // console.log(e.target.files[0]);
        const reader = new FileReader();
        // console.log(reader);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            // Set image dimensions
            // ({ width: img.width, height: img.height });
            if (img.width >= 3000 && img.width === img.height) {
              //   alert("perfect");
            } else {
              toast.error(
                "Image should be greater than or equal 3000 X 3000 pixels",
                {
                  position: "bottom-center",
                }
              );
            }
          };
          //   img.src = e.target.result;
        };
        e.target.files[0] && reader.readAsDataURL(e.target.files[0]); // Read the file
      },
    },
  ];

  const checkFormValidity = () => {
    const isFormValid = fields.every((field) => {
      // Check if each required field has a value
      // console.log(formRef.current["Sub Category"].required);
      if (formRef.current["Sub Category"]?.required) {
        return (
          !!formRef.current["Sub Category"]?.value &&
          formRef.current[`prev-Released-${index}`].value
        );
      }
      return true;
    });
    setFormIsValid(isFormValid);
  };

  // Effect to check form validity whenever any field changes
  useEffect(() => {
    checkFormValidity();
  }, [fields]);

  const incrementIsrc = (isrc, index) => {
    // Correctly slice from the 7th character to the end to include all digits
    const numericPart = parseInt(isrc.slice(7), 10);
    const incrementedNumericPart = numericPart + index;

    // Concatenate and pad the numeric part as needed
    const result =
      isrc.slice(0, 7) + incrementedNumericPart.toString().padStart(5, "0");
    // console.log(result);
    return result;
  };

  useEffect(() => {
    if (!previouslyReleased && newIsrc) {
      // Adjust based on your ISRC format and requirements
      const updatedIsrc = incrementIsrc(newIsrc, index);
      //   console.log(updatedIsrc);
      axios.get(backendUrl + "check-isrc/" + updatedIsrc).then(({ data }) => {
        if (data.length > 0) {
          // data;
          const newUpdate = incrementIsrc(data[data.length - 1].isrc, index);
          setUpdatedIsrc(newUpdate);
        } else {
          setUpdatedIsrc(updatedIsrc);
        }
      });
      //   setNewIsrc(updatedIsrc);
    }
  }, [newIsrc, index, previouslyReleased]);

  useEffect(() => {
    if (!previouslyReleased) {
      axios
        .get(backendUrl + "generate-isrc")
        .then(({ data }) => setNewIsrc(data.newIsrc));
    }
  }, [previouslyReleased]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [song] = e.target.song.files;
    const [artWork] = e.target["art-work"].files;

    const songForm = new FormData();
    songForm.append("file", song);

    const artWorkForm = new FormData();
    artWorkForm.append("file", artWork);

    const { artWorkUrl } = await axios
      .post(backendUrl + "upload-art-work", artWorkForm, config)
      .then(({ data }) => data);

    const { songUrl } = await axios
      .post(backendUrl + "upload-song", songForm, config)
      .then(({ data }) => data);

    const songData = {};

    fields.map(({ name }) => (songData[name] = e.target[name]?.value));
    songData.songUrl = songUrl;
    songData.artWorkUrl = artWorkUrl;
    songData.audioDuration = audioDuration;
    delete songData.song;
    delete songData["art-work"];

    // console.log(songData);
    songData.callerTune = [
      {
        startSeconds: parseInt(startSeconds),
        startMinutes: parseInt(startMinutes),
        endMinutes:
          (parseInt(startSeconds) || 0) + 45 >= 60
            ? parseInt(startMinutes) + 1
            : parseInt(startMinutes),
        endSeconds:
          parseInt(startSeconds) + 45 >= 60
            ? Math.abs(60 - (parseInt(startSeconds) + 45))
            : parseInt(startSeconds) + 45,
      },
    ];

    setSubmitted(true);

    // songData;
  };

  return (
    // <Form fields={fields} handleSubmit={handleSubmit} ref={formRef} />

    <form
      className="flex flex-col w-full items-center mt-3"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full mb-4">
        {fields.map((item, key) => (
          <>
            {item.name === "Record Label" || item.name === "ArtistName" ? (
              <>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </>
            ) : (
              <></>
            )}
            {item.type === "select-input" ? (
              <SelectOptions
                {...item}
                // onChange={(e) => console.log(e.target.value)}
                // options={}
              />
            ) : (
              item.name?.length && <InputField {...item} key={key} />
            )}

            {item.name === "Lyricist" ||
            item.name === "InstagramHandleMainArtist" ? (
              <>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </>
            ) : (
              <></>
            )}
          </>
        ))}

        {audioUrl.length > 0 && (
          <aside>
            {audioUrl.length > 0 && <audio src={audioUrl} controls />}
          </aside>
        )}

        <aside>
          <h6>Previously Released</h6>
          <input
            type="radio"
            name={`prev-Released-${index}`}
            id={`yes-${index}`}
            checked={previouslyReleased}
            onChange={(e) => setPreviouslyReleased(true)}
          />{" "}
          <label htmlFor={`yes-${index}`}>Yes</label>
          <br />
          <input
            type="radio"
            name={`prev-Released-${index}`}
            id={`no-${index}`}
            checked={!previouslyReleased}
            onChange={(e) => setPreviouslyReleased(false)}
          />{" "}
          <label htmlFor={`no-${index}`}>No</label>
        </aside>
      </div>

      {audioUrl && (
        <>
          {/* <label htmlFor="CRBT-cut">CRBT Cut Name</label> */}
          <InputField
            type={"text"}
            placeholder={"CRBT/Caller Tune Cut Name"}
            className="w-11/12"
            id={"CRBT-cut"}
            label="CRBT Cut Name"
          />

          <CallerTuneTimeStamp
            setStartMinutes={setStartMinutes}
            setStartSeconds={setStartSeconds}
            audioDuration={audioDuration}
            startMinutes={startMinutes}
            startSeconds={startSeconds}
          />
        </>
      )}

      <Button type={"submit"} text="submit" disabled={!formIsValid}></Button>
    </form>
  );
};

export default SongUploadForm;
