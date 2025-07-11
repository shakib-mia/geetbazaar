import React, { useContext, useEffect } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import PreviewDetails from "../PreviewDetails/PreviewDetails";
import { backendUrl } from "../../constants";
import { useLocation } from "react-router-dom";

const Preview = () => {
  const { formData, setFormData } = useContext(ScreenContext);
  console.log(formData);
  const location = useLocation();
  const filteredSongs =
    location.pathname === "/album-upload" &&
    formData.songs.filter(
      (song) => song.songName && song.songName.trim() !== ""
    );

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      songs: filteredSongs,
    }));
  }, [filteredSongs.length]);

  // const createAlbumTable = (album) => {
  //   const createRow = (label, value) => (
  //     <tr className="divide-x divide-grey">
  //       <td className="p-2 uppercase font-medium">{label}</td>
  //       <td className="p-2">
  //         {label === "Artwork URL" ? (
  //           <img className="w-1/5" src={value} alt={label} />
  //         ) : (
  //           value
  //         )}
  //       </td>
  //     </tr>
  //   );

  //   const createArtistRow = (artist, index) => (
  //     <tr className="divide-x divide-grey" key={index}>
  //       <td className="p-2 uppercase font-medium">Artist {index + 1}</td>
  //       <td className="flex flex-col divide-y divide-grey">
  //         <p className="p-2">Name: {artist.name}</p>
  //         <p className="p-2">Role: {artist.role}</p>
  //         <p className="p-2">Spotify URL: {artist.spotifyUrl || "N/A"}</p>
  //         <p className="p-2">Apple Artist URL: {artist.appleArtist || "N/A"}</p>
  //         <p className="p-2">Facebook URL: {artist.facebookUrl || "N/A"}</p>
  //       </td>
  //     </tr>
  //   );

  //   return (
  //     <div class="bg-gray-100 p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
  //       <div class="flex items-center mb-6">
  //         <img
  //           src={
  //             backendUrl + "uploads/art-work/file-1720006760873-1b_3000p.jpg"
  //           }
  //           alt="Album Art"
  //           class="w-32 h-32 rounded-lg shadow-md mr-6"
  //         />
  //         <div>
  //           <h1 class="text-2xl font-bold text-blue-600">
  //             O Priya Tumi Kothay
  //           </h1>
  //           <p class="text-gray-600">Single by Asif Akbar</p>
  //         </div>
  //       </div>

  //       <div class="bg-white p-4 rounded-lg shadow mb-6">
  //         <audio controls class="w-full">
  //           <source
  //             src={
  //               backendUrl +
  //               "uploads/songs/file-abc-1720006963154-asif-akbar-music-world_o-priya-tumi-kothay.mp3"
  //             }
  //             type="audio/mpeg"
  //           />
  //           Your browser does not support the audio element.
  //         </audio>
  //       </div>

  //       <div class="grid grid-cols-2 gap-4 mb-6">
  //         <div>
  //           <p class="text-gray-600">
  //             Genre: <span class="text-blue-600">Pop</span>
  //           </p>
  //           <p class="text-gray-600">
  //             Subgenre: <span class="text-blue-600">Band Songs</span>
  //           </p>
  //           <p class="text-gray-600">
  //             Language: <span class="text-blue-600">Bengali</span>
  //           </p>
  //           <p class="text-gray-600">
  //             Mood: <span class="text-blue-600">Sad</span>
  //           </p>
  //         </div>
  //         <div>
  //           <p class="text-gray-600">
  //             ISRC: <span class="text-blue-600">12345678</span>
  //           </p>
  //           <p class="text-gray-600">
  //             UPC: <span class="text-blue-600">1234567890</span>
  //           </p>
  //           <p class="text-gray-600">
  //             Record Label: <span class="text-blue-600">Shakib's Team</span>
  //           </p>
  //           <p class="text-gray-600">
  //             Publisher: <span class="text-blue-600">GeetBazaar</span>
  //           </p>
  //         </div>
  //       </div>

  //       <div class="mb-6">
  //         <h2 class="text-xl font-semibold text-blue-600 mb-2">Artists</h2>
  //         <ul class="list-disc list-inside text-gray-600">
  //           <li>Asif Akbar - Singer/Primary Artist</li>
  //           <li>Ethun - Lyricist</li>
  //           <li>Ethun - Composer</li>
  //         </ul>
  //       </div>

  //       <div class="mb-6">
  //         <h2 class="text-xl font-semibold text-blue-600 mb-2">Description</h2>
  //         <p class="text-gray-600">sdfghjkl</p>
  //       </div>

  //       <div>
  //         <h2 class="text-xl font-semibold text-blue-600 mb-2">
  //           Selected Platforms
  //         </h2>
  //         <div class="flex flex-wrap gap-2">
  //           <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded">
  //             Apple Music
  //           </span>
  //           <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded">
  //             Spotify
  //           </span>
  //           <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded">
  //             YouTube Music
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      {/* <div className="w-2/3">{createAlbumTable(formData)}</div> */}
      <PreviewDetails albumData={formData} />
    </>
  );
};

export default Preview;
