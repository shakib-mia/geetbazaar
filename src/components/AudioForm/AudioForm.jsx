import React, { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import axios from "axios";
import { backendUrl } from "./../../constants";
import SelectOptions from "../SelectOptions/SelectOptions";
import CallerTuneTimeStamp from "../CallerTuneTimeStamp/CallerTuneTimeStamp";
import "@madzadev/audio-player/dist/index.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

import ArtistProfile from "../ArtistProfile/ArtistProfile";
import { fileToBase64 } from "../../utils/filetobase64";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PlanContext } from "../../contexts/PlanContext";
import Swal from "sweetalert2";

// Function to get audio duration
const getAudioDuration = (file) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });
    audio.addEventListener("error", (error) => {
      reject(error);
    });
    audio.src = URL.createObjectURL(file);
  });
};

const AudioForm = ({ setArtistCount, setCount, count, setCollapsed, id }) => {
  const { setScreen, setFormData, formData } = useContext(ScreenContext);
  // console.log(formData);
  const { planStore, setPlanStore } = useContext(PlanContext);
  const { userData, token } = useContext(ProfileContext);
  // const [done, setDone] = useState(false);
  const config = {
    headers: { token: sessionStorage.getItem("token") || token },
  };
  const location = useLocation();
  // console.log(id);
  // console.log();
  const [fileName, setFileName] = useState("");
  // const [alreadyHaveIsrc, setAlreadyHaveIsrc] = useState(false);
  const [isrc, setIsrc] = useState("");
  const [audioUrl, setAudioUrl] = useState(formData?.songUrl || "");
  const [file, setFile] = useState({});
  const [audioDuration, setAudioDuration] = useState(0);
  // const [focused, setFocused] = useState(false);
  // const [showPlats, setShowPlats] = useState(false);
  const [genre, setGenre] = useState("");
  const [subGenre, setSubGenre] = useState("");
  const [mood, setMood] = useState("");
  const [description, setDescription] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [subGenreOptions, setSubGenreOptions] = useState([]);
  // console.log(audioUrl);

  useEffect(() => {
    const audio = new Audio(audioUrl);

    audio.addEventListener("loadedmetadata", () => {
      setAudioDuration(audio.duration);
    });
  }, [audioUrl]);

  useEffect(() => {
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      setSongUrl(formData.songs[id].songUrl);
      // setSongUrl
    } else {
      setSongUrl(formData.songUrl);

      // setFormData({ ...formData, songName: e.target.value });
    }
  }, [formData.songUrl, formData.songs]);

  const handleArtistNameChange = (index, value) => {
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      // Handle the case where formData is an array of objects
      // console.log(formData.songs[id]);
      // const updatedFormData = formData.songs[id].artists.map((item, idx) => {
      //   if (idx === id) {
      //     item.name = value;
      //     const updatedArtists = [{ ...item }];
      //     updatedArtists[index].name = value;
      //     // console.log(updatedArtists);

      //     // console.log(item);

      //     // console.log(formData.songs[id]);
      //     // return { ...item, artists: updatedArtists };
      //   }
      //   // return item;
      // });
      formData.songs[id].artists[index].name = value;
      setFormData(formData);
      // console.log(formData.songs[id].artists[index]);
      // setFormData(updatedFormData);
    } else {
      // Handle the case where formData is a single object
      const updatedArtists = [...formData.artists];
      updatedArtists[index].name = value;
      setFormData({ ...formData, artists: updatedArtists });
    }
  };

  const handleArtistRoleChange = (index, value) => {
    // console.log(index, value);
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      // Handle the case where formData is an array of objects
      const updatedFormData = formData.songs.map((item, idx) => {
        if (idx === id) {
          const updatedArtists = [...item.artists];
          updatedArtists[index].role = value;
          return { ...item, artists: updatedArtists };
        }
        return item;
      });
      setFormData(updatedFormData);
      // console.log(updatedFormData);
    } else {
      // Handle the case where formData is a single object
      const updatedArtists = [...formData.artists];
      updatedArtists[index].role = value;
      setFormData({ ...formData, artists: updatedArtists });
    }
  };

  const languagesInIndia = [
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
  ];

  // useEffect(() => {
  //   if (!alreadyHaveIsrc) {
  //     axios
  //       .get(backendUrl + "generate-isrc")
  //       .then(({ data }) => setIsrc(data.newIsrc));
  //   } else {
  //     setIsrc("");
  //   }
  // }, [alreadyHaveIsrc]);

  // console.log(formData);

  const handleAudioChange = async (event, _id) => {
    const file = event.target.files[0]; // Get the file

    // Check if the filename contains #
    if (file.name.includes("#")) {
      Swal.fire({
        icon: "error",
        title: "Filename should not contain #",
        confirmButtonColor: "#2B52DD",
      });
      return;
    }

    setFile(file);
    const data = await fileToBase64(file);
    setAudioUrl(data);

    setFileName(file.name);

    const audioLength = await getAudioDuration(file);
    // console.log(`Audio length: ${audioLength} seconds`);
    // console.log();

    // Check if the file length is greater than 50 MB
    // if (file.size / (1024 * 1024) <= 50) {
    if (audioLength > 60) {
      const toastId = toast.loading("Uploading audio...", {
        position: "bottom-center",
      });

      if (file && file.type.startsWith("audio/")) {
        const SongFile = new FormData();
        SongFile.append("file", file);

        // Perform the file upload
        try {
          const response = await axios.post(
            backendUrl + "upload-song",
            SongFile,
            {
              headers: {
                token,
              },
            }
          );

          // Check if it's an album or a single song
          if (
            location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location?.pathname.includes("edit-album")
          ) {
            // Album upload logic
            formData.songs = formData.songs || [];
            formData.songs[_id] = {
              ...formData.songs[_id],
              songUrl: response.data.songUrl,
            };
          } else {
            console.log(response.data);
            // Single song upload logic
            formData.songUrl = response.data.songUrl;
            setSongUrl(response.data.songUrl);
          }

          // Update toast to successful
          toast.update(toastId, {
            render: "Audio submitted successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000, // Close toast after 3 seconds
          });
        } catch (error) {
          console.error("Error uploading file:", error);

          // Update toast to error
          toast.update(toastId, {
            render: "Error uploading audio. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Audio must be greater than 60 seconds",
        confirmButtonColor: "#2B52DD",
      });
    }
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Audio file is too large",
    //     confirmButtonColor: "#2B52DD",
    //   });
    // }

    // Create a new Audio object to get the duration
    const audio = new Audio(songUrl);

    // Wait for the audio metadata to load
    audio.onloadedmetadata = () => {
      const duration = audio.duration;
      setAudioDuration(duration);

      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(songUrl);

      // Append the file to FormData (if needed for further processing)
      const fileData = new FormData();
      fileData.append("file", file);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);
    if (location.pathname.includes("edit-song")) {
      // console.log(formData);
      formData.emailId = formData.userEmail;
      formData.updated = false;
      // axios
      //   .post(backendUrl + "edit-song", formData, config)
      //   .then(({ data }) => {
      setScreen("preview");
      // });
    } else {
      if (
        location.pathname === "/album-upload" ||
        location.search.split("?")[1] === "yearly-plan" ||
        location?.pathname.includes("edit-album")
      ) {
        formData.songs[id].status = "pending";
        formData.songs[id].userEmail = userData.user_email;

        // const SongFile = new FormData();

        // SongFile.append("file", formData.songs[id]?.file);

        // Perform the file upload
        // axios
        //   .post(backendUrl + "upload-song", SongFile, config)
        //   .then(({ data }) => {
        //     formData.songUrl = data.songUrl;
        //   })
        //   .catch((error) => {
        //     console.error("Error uploading file:", error);
        //   });

        //   delete formData.user_email;
        //   delete formData.audioUrl;
        //   delete formData.file;
        //   delete formData.status;

        //   formData.price = 99900;

        //   axios
        //     .post(backendUrl + "recent-uploads", formData, config)
        //     .then(({ data }) => {
        //       if (data.acknowledged) {
        //         // setCount(count + 1);
        //         location.pathname !== "/album-upload"
        //           ? setScreen("distribution")
        //           : setCollapsed(true);
        //       }
        //     });
        // } else {
        formData.status = "pending";
        formData.userEmail = userData.user_email;

        // formData;
        console.log(formData);

        const SongFile = new FormData();

        SongFile.append("file", formData.file);

        // // Perform the file upload
        // axios
        //   .post(backendUrl + "upload-song", SongFile, config)
        //   .then(({ data }) => {
        //     formData.songUrl = data.songUrl;
        //   })
        //   .catch((error) => {
        //     console.error("Error uploading file:", error);
        //   });

        delete formData.user_email;
        delete formData.audioUrl;
        delete formData.file;
        delete formData.status;
        // console.log(formData);
        formData.price = location.search.split("?")[2];
        formData.planName = location.search.split("?")[1];
        // console.log();
        // document.getElementsByClassName("owl-next")[0].click();
        // setScreen("preview");
        setCollapsed(true);
        // axios
        //   .post(backendUrl + "recent-uploads", formData, config)
        //   .then(({ data }) => {
        //     if (data.acknowledged) {
        //       // setCount(count + 1);
        //       location.pathname !== "/album-upload"
        //         ? setScreen("preview")
        //         : setCollapsed(true);
        //     }
        //   });
      } else {
        setScreen("preview");
      }
    }
  };

  const handleRemoveArtist = (index) => {
    console.log(index);
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      // Create updated songs immutably
      const updatedSongs = formData.songs.map((song, songIdx) => {
        if (songIdx === id) {
          return {
            ...song,
            artists: song.artists.filter((_, artistIdx) => artistIdx !== index),
          };
        }
        return song;
      });

      // console.log("Updated Songs Before Set:", updatedSongs); // Debugging

      // console.log();

      const newFormData = { ...formData, songs: updatedSongs };

      console.log(newFormData);
      // Set the updated state
      setFormData({ ...formData, songs: updatedSongs });
    } else {
      // Handle general artists
      const updatedArtists = formData.artists.filter(
        (_, artistIdx) => artistIdx !== index
      );

      console.log("Updated Artists Before Set:", updatedArtists); // Debugging

      setFormData((prev) => {
        console.log("Previous FormData:", prev); // Debugging
        return { ...prev, artists: updatedArtists };
      });
    }
  };

  /**
   *
   * {audioUrl.length > 0 && <AudioPlayer src={audioUrl} />}
   *
   *
   * */

  // console.log(id, formData.songs[id]?.artists);

  useEffect(() => {
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      const options =
        genre === "Film" || formData.songs[id].genre === "Film"
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
          : genre === "Pop" || formData.songs[id].genre === "Pop"
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
          : genre === "Indie" || formData.songs[id].genre === "Indie"
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
          : genre === "Hip-Hop/Rap" ||
            formData.songs[id].genre === "Hip-Hop/Rap"
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
          : genre === "Folk" || formData.songs[id].genre === "Folk"
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
              "Bhavageete",
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
              "Kummi Paatu",
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
              "Nati",
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
              "Raut Nacha",
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
          : genre === "Devotional" || formData.songs[id].genre === "Devotional"
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
          : genre === "Hindustani Classical" ||
            formData.songs[id].genre === "Hindustani Classical"
          ? ["Instrumental", "Vocal "]
          : genre === "Carnatic Classical" ||
            formData.songs[id].genre === "Carnatic Classical"
          ? ["Instrumental", "Vocal"]
          : genre === "Ambient / Instrumental" ||
            formData.songs[id].genre === "Ambient / Instrumental"
          ? ["Soft", "Easy Listening", "Electronic", "Fusion", "Lounge"]
          : [];

      setSubGenreOptions(options);
    } else {
      const options =
        genre === "Film" || formData.genre === "Film"
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
          : genre === "Pop" || formData.genre === "Pop"
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
          : genre === "Indie" || formData.genre === "Indie"
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
          : genre === "Hip-Hop/Rap" || formData.genre === "Hip-Hop/Rap"
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
          : genre === "Folk" || formData.genre === "Folk"
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
              "Bhavageete",
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
              "Kummi Paatu",
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
              "Nati",
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
              "Raut Nacha",
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
          : genre === "Devotional" || formData.genre === "Devotional"
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
          : genre === "Hindustani Classical" ||
            formData.genre === "Hindustani Classical"
          ? ["Instrumental", "Vocal "]
          : genre === "Carnatic Classical" ||
            formData.genre === "Carnatic Classical"
          ? ["Instrumental", "Vocal"]
          : genre === "Ambient / Instrumental" ||
            formData.genre === "Ambient / Instrumental"
          ? ["Soft", "Easy Listening", "Electronic", "Fusion", "Lounge"]
          : [];

      setSubGenreOptions(options);
    }
  }, [genre, formData?.genre]);

  // console.log(
  //   songUrl
  //     .substring(songUrl.lastIndexOf("/") + 1)
  //     .split("-")
  //     .slice(
  //       3,
  //       songUrl.substring(songUrl.lastIndexOf("/") + 1).split("-").length - 1
  //     ).join("-")
  // );
  // console.log(formData.songs[id]?.file);
  // const filename =
  //   location.pathname === "/album-upload" ||
  //   location.search.split("?")[1] === "yearly-plan"
  //     ? formData.songs[id]?.file?.name
  //     : formData.file?.name;
  // console.log(filename);

  // if (formData.songs) {
  //   console.log(
  //     location?.pathname === "/album-upload" ||
  //       location?.search?.split("?")[1] === "yearly-plan"
  //       ? formData?.songs[id]?.songName
  //       : formData?.songName
  //   );
  // }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleAddArtist = () => {
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location.pathname.includes("edit-album")
    ) {
      formData.songs && formData.songs[id].artists.push({ name: "", role: "" });
      setFormData(formData);

      console.log(formData.songs[id].artists);
    } else {
      formData.artists.push({ name: "", role: "" });
    }
  };

  // console.log(formData);

  return (
    <form onSubmit={handleSubmit} className="pb-3 lg:pb-0">
      {/* {id} */}
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            <InputField
              label={"Song Name"}
              onChange={(e) => {
                // console.log(formData.songs[id]);
                // console.log(id);
                // location.pathname === "/album-upload" || location.search.split("?")[1] === "yearly-plan" || setFormData()
                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album")
                ) {
                  console.log(formData.songs);
                  formData.songs[id].songName = e.target.value;
                  setFormData({ ...formData });
                } else {
                  setFormData({ ...formData, songName: e.target.value });
                }
              }}
              required
              value={
                location?.pathname === "/album-upload" ||
                location?.search?.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? formData?.songs && formData.songs[id]?.songName
                  : formData?.songName
              }
              placeholder={"Enter Your Song Name Here"}
            />
            <InputField
              label={"ISRC"}
              onChange={(e) => {
                setIsrc(e.target.value);
                // setFormData({ ...formData, isrc: e.target.value });
                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location.pathname.includes("edit-album")
                ) {
                  formData.songs[id].isrc = e.target.value;
                  setFormData({ ...formData });
                } else {
                  setFormData({ ...formData, isrc: e.target.value });
                }
              }}
              placeholder={"Enter the ISRC Here"}
              // required={alreadyHaveIsrc}
              note="Keep it blank if you don't have any"
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData?.songs[id]?.isrc
                  : formData.isrc
              }
              disabled={
                location.pathname.includes("edit") &&
                (formData?.songs[id]?.isrc || formData.isrc)
              }
            />
            {/* <div className="flex"></div> */}
            {/* <InputField
            type={"checkbox"}
            id={"alreadyHaveIsrc"}
            label={"I have my own ISRC"}
            containerClassName={"mt-4"}
            onChange={(e) => setAlreadyHaveIsrc(e.target.checked)}
          /> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center mt-3">
            {/* <InputField type={"multi-select"} options={["yes", "no"]} /> */}
            <SelectOptions
              onChange={(e) => {
                // setFormData({
                //   ...formData,
                //   parentalAdvisory: e.target.value === "yes" ? true : false,
                // });
                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album")
                ) {
                  formData.songs[id].parentalAdvisory = e.target.value;
                  setFormData({ ...formData });
                } else {
                  setFormData({
                    ...formData,
                    parentalAdvisory: e.target.value,
                  });
                }
              }}
              required={true}
              options={["No", "Yes"]}
              value={formData.parentalAdvisory ? "Yes" : "No"}
              placeholder={"Select..."}
              label={"Parent Advisory"}
            />
            <SelectOptions
              placeholder={"Select..."}
              value={formData.instrumental ? "Yes" : "No"}
              options={["No", "Yes"]}
              label={"Instrumental"}
              required={true}
              onChange={(e) => {
                // setFormData({
                //   ...formData,
                //   instrumental: e.target.value === "yes" ? true : false,
                // });
                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album")
                ) {
                  formData.songs[id].instrumental = e.target.value;
                  setFormData({ ...formData });
                } else {
                  setFormData({ ...formData, instrumental: e.target.value });
                }
              }}
            />
            <SelectOptions
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData.songs[id].language
                  : formData.language
              }
              options={languagesInIndia}
              label={"Language"}
              placeholder={"Select..."}
              required={true}
              onChange={(e) => {
                // setFormData({ ...formData, language: e.target.value });
                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location.pathname.includes("edit-album")
                ) {
                  formData.songs[id].language = e.target.value;
                  setFormData({ ...formData });
                } else {
                  setFormData({ ...formData, language: e.target.value });
                }
              }}
            />
            {/* <InputField type={"multi-select"} options={["yes", "no"]} /> */}
          </div>

          <div className="mt-4 flex items-end gap-2">
            <aside className="w-full">
              {location.pathname === "/album-upload" ||
              location.search.split("?")[1] === "yearly-plan" ||
              location?.pathname.includes("edit-album")
                ? formData.songs &&
                  formData.songs[id]?.artists?.map((artist, key) => (
                    <ArtistProfile
                      key={key}
                      id={key}
                      // handleArtistNameChange={handleArtistNameChange}
                      handleArtistRoleChange={handleArtistRoleChange}
                      handleRemoveArtist={handleRemoveArtist}
                      artist={artist}
                      formId={id}
                    />
                  ))
                : formData?.artists?.map((artist, key) => (
                    <ArtistProfile
                      key={key}
                      id={key}
                      handleArtistNameChange={handleArtistNameChange}
                      handleArtistRoleChange={handleArtistRoleChange}
                      handleRemoveArtist={handleRemoveArtist}
                      artist={artist}
                    />
                  ))}
            </aside>
          </div>

          <Button
            containerClassName={
              "!rounded-none w-1/2 relative -bottom-[6px] mt-0"
            }
            className={
              "!rounded-none px-4 !py-[12px] w-full text-center justify-center border border-interactive-light mt-0"
            }
            text={"+ Add Artist"}
            type={"button"}
            onClick={() => {
              if (
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
              ) {
                const updatedFormData = {
                  ...formData,
                };

                updatedFormData.songs[id].artists.push({ name: "", role: "" });

                // const updatedFormData = {
                //   ...formData,
                //   songs: formData.songs.map((song, idx) =>
                //     idx === id
                //       ? {
                //           ...song,
                //           artists: [...song.artists, { name: "", role: "" }],
                //         }
                //       : song
                //   ),
                // };

                setFormData(updatedFormData);
              } else {
                const updatedArtists = [
                  ...formData.artists,
                  { name: "", role: "" },
                ];
                setFormData({ ...formData, artists: updatedArtists });
              }
            }}
          />

          {/* <div className="mt-3 flex gap-3"> */}
          <InputField
            type={"file"}
            accept={".mp3, .wav"}
            label={"Upload Audio"}
            onChange={(e) => handleAudioChange(e, id)}
            disabled={
              location.pathname === "/album-upload" ||
              location.search.split("?")[1] === "yearly-plan" ||
              location.pathname.includes("edit-album")
                ? formData.songs && !formData.songs[id]?.songName?.length
                : !formData?.songName?.length
            }
            id={"audioUpload_" + id}
            // note={
            //   "Ensure your audio files are in WAV or MP3 formats only (Max 50MB). For bigger file mail us directly at content@forevisiondigital.com"
            // }
            dangerNote
            required={!location.pathname.includes("edit-song")}
            placeholder={
              fileName ||
              songUrl?.substring(songUrl.indexOf("asif-")) ||
              "Select File"
            }
            containerClassName={"mt-3"}
          />

          {/* {<Player trackList={tracks} />} */}

          {/* <InputField
            type={"text"}
            placeholder={"CRBT Cut"}
            label={"crbt"}
            labelClassName={"opacity-0"}
            containerClassName={"w-full"}
          /> */}

          {/* <Video /> */}
          {/* </div> */}
        </div>
        <div className="w-full lg:w-1/3">
          {<AudioPlayer id={id} src={audioUrl} />}
        </div>
      </div>
      {/* {formData.songName?.length && ( */}

      {/* )} */}
      {(location.search.split("?")[1]?.includes("-")
        ? location.search.split("?")[1]?.split("-")?.join(" ")
        : location.search.split("?")[1]) !== "forevision pro" ? (
        <CallerTuneTimeStamp audioDuration={audioDuration} id={id} />
      ) : (
        <></>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-0 items-end">
        <SelectOptions
          placeholder={"Select The Primary Genre"}
          required={true}
          label={"Primary Genre"}
          name={"genre"}
          id={"genre"}
          onChange={(e) => {
            setGenre(e.target.value);
            // setFormData({ ...formData, subGenre: e.target.value })

            if (
              location.pathname === "/album-upload" ||
              location.search.split("?")[1] === "yearly-plan" ||
              location.pathname.includes("edit-album")
            ) {
              if (formData.songs) {
                const newFormData = { ...formData };
                newFormData.songs[id].genre = e.target.value;
                // console.log(formData.songs[id]);
                setFormData(newFormData);
              }
            } else {
              formData.genre = e.target.value;
            }
          }}
          value={
            genre ||
            (location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location.pathname.includes("edit-album")
              ? formData.songs && formData.songs[id]?.genre
              : formData?.genre)
          }
          options={[
            "Film",
            "Pop",
            "Indie",
            "Hip-Hop/Rap",
            "Folk",
            "Devotional",
            "Hindustani Classical",
            "Carnatic Classical",
            "Ambient / Instrumental",
          ]}
        />

        <SelectOptions
          placeholder={"Select The Secondary Genre"}
          label={"Secondary Genre"}
          name={"subGenre"}
          id={"subGenre"}
          required={true}
          onChange={(e) => {
            setSubGenre(e.target.value);
            // setFormData({ ...formData, subGenre: e.target.value })
            if (
              location.pathname === "/album-upload" ||
              location.search.split("?")[1] === "yearly-plan" ||
              location.pathname.includes("edit-album")
            ) {
              const newFormData = { ...formData };
              newFormData.songs[id].subGenre = e.target.value;
              // console.log(formData.songs[id]);
              setFormData(newFormData);
            } else {
              formData.subGenre = e.target.value;
            }
          }}
          value={
            subGenre ||
            (location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location.pathname.includes("edit-album")
              ? formData.songs && formData.songs[id]?.subGenre
              : formData?.subGenre)
          }
          options={subGenreOptions}
        />

        <SelectOptions
          placeholder={"Select The Mood..."}
          label={"Mood"}
          required={true}
          onChange={(e) => {
            setMood(e.target.value);
            // setFormData({ ...formData, subGenre: e.target.value })
            if (
              location.pathname === "/album-upload" ||
              location.search.split("?")[1] === "yearly-plan" ||
              location.pathname.includes("edit-album")
            ) {
              const newFormData = { ...formData };
              newFormData.songs[id].mood = e.target.value;
              // console.log(formData.songs[id]);
              setFormData(newFormData);
            } else {
              formData.mood = e.target.value;
            }
          }}
          value={
            mood ||
            (location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location.pathname.includes("edit-album")
              ? formData.songs && formData.songs[id]?.mood
              : formData.mood)
          }
          // onChange={(e) => console.log(e.target.value)}
          options={[
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
          ]}
        />

        <InputField
          label={"Description"}
          placeholder={"Description"}
          required={false}
          textarea
          rows={4}
          containerClassName="!mt-[24px] !mb-0"
          value={
            location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location.pathname.includes("edit-album")
              ? formData.songs[id]?.description
              : formData.description
          }
          onChange={(e) => {
            setDescription(e.target.value);
            // setFormData({ ...formData, subGenre: e.target.value })
            if (
              location.pathname === "/album-upload" ||
              location.search.split("?")[1] === "yearly-plan" ||
              location.pathname.includes("edit-album")
            ) {
              if (formData.songs) {
                formData.songs[id].description = e.target.value;
                setFormData({ ...formData });
              }
            } else {
              formData.description = e.target.value;
              setFormData({ ...formData });
            }
          }}

          // labelClassName={"opacity-0"}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center mt-4">
        <aside className="w-full lg:w-2/3 flex flex-col lg:flex-row items-baseline gap-4">
          <div className="w-full lg:w-1/2">
            {/* <SelectOptions
                labelClassName={"font-medium text-subtitle-2 !text-black"}
                label={"Publisher"}
                note={
                  "If you don't have any you can use our name or you can create your own"
                }
                options={[
                  "GeetBazaar",
                  "GeetBazaar",
                  "GeetBazaar",
                ]}
              /> */}
            <InputField
              type="date"
              required={true}
              label=" "
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData.songs && formData.songs[id]?.releaseDate
                    ? formatDate(formData.songs[id]?.releaseDate)
                    : ""
                  : formData.releaseDate
                  ? formatDate(formData.releaseDate)
                  : ""
              }
              onChange={(e) => {
                const newDate = e.target.value;
                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album")
                ) {
                  formData.songs[id].releaseDate = newDate;
                  const newFormData = { ...formData };

                  setFormData(newFormData);
                } else {
                  // Update the releaseDate at the form level
                  setFormData({ ...formData, releaseDate: newDate });
                }
              }}
              note="Date of Music Release"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <InputField
              type="date"
              required={true}
              label=" "
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData.songs && formData.songs[id]?.liveDate
                    ? formData.songs[id]?.liveDate
                    : ""
                  : formData.liveDate
                  ? formData.liveDate
                  : ""
              }
              onChange={(e) => {
                const newDate = e.target.value;
                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album")
                ) {
                  formData.songs[id].liveDate = newDate;
                  const newFormData = { ...formData };
                  setFormData(newFormData);
                } else {
                  // Update the releaseDate at the form level
                  setFormData({ ...formData, liveDate: newDate });
                }
                console.log(formData);
              }}
              note="Go Live Date"
            />

            {/* <InputField
              type={"date"}
              required={true}
              label={" "}
              value={formData.liveDate}
              onChange={(e) =>
                // setFormData({ ...formData, liveDate: e.target.value })
                location.pathname === "/album-upload" || location.search.split("?")[1] === "yearly-plan"
                  ? (formData.songs[id]?.liveDate = e.target.value)
                  : formData.liveDate
              }
              note={"Go Live Date"}
            /> */}
          </div>
          {/* </div> */}
        </aside>

        <aside className="w-full lg:w-1/3">
          {/* <InputField
            type={"time"}
            label={" "}
            value={formData.time}
            onChange={(e) => {
              setFormData({ ...formData, time: e.target.value });
              location.pathname === "/album-upload" || location.search.split("?")[1] === "yearly-plan"
                ? (formData.songs[id]?.time = e.target.value)
                : (formData.time = e.target.value);
            }}
            note={"Go Live Time"}
          /> */}

          <InputField
            type="time"
            required={true}
            label=" "
            value={
              location.pathname === "/album-upload" ||
              location.search.split("?")[1] === "yearly-plan" ||
              location.pathname.includes("edit-album")
                ? (formData.songs && formData.songs[id]?.time) || ""
                : formData.time || ""
            }
            onChange={(e) => {
              const newDate = e.target.value;
              if (
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
              ) {
                formData.songs[id].time = newDate;
                const newFormData = { ...formData };

                setFormData(newFormData);
              } else {
                // Update the time at the form level
                setFormData({ ...formData, time: newDate });
              }
            }}
            note="Go live time"
          />
        </aside>
      </div>

      <div className="flex justify-center gap-4 items-center mt-3 mb-5">
        {/* <FaChevronCircleLeft
          className="text-heading-5 cursor-pointer"
          onClick={() => document.getElementsByClassName("owl-prev")[0].click()}
        /> */}
        <Button
          type={"submit"}
          // containerClassName={"mx-auto"}

          // disabled={done}
          text={"Save"}
        />
        {/* <FaChevronCircleRight
          className="text-heading-5 cursor-pointer"
          onClick={() => document.getElementsByClassName("owl-next")[0].click()}
        /> */}
      </div>

      {/* <Button type={"destructive"} text={"delete"} onClick={handleDelete} /> */}
    </form>
  );
};

export default AudioForm;
