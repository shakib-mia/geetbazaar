import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "../../constants";
import {
  FaApple,
  FaChevronLeft,
  FaLink,
  FaMusic,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";
import { SiAmazonmusic, SiApplemusic } from "react-icons/si";
import dummyAlbumArt from "../../assets/images/album-art.png"; // Adjust the path as necessary

const SocialLinks = () => {
  const location = useLocation();
  const [userId, songId] = location.pathname
    .split("/")
    .slice(2, location.pathname.split("/").length);
  const [isEffectRun, setIsEffectRun] = useState(false);
  const [song, setSong] = useState({});
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isEffectRun) {
      setIsEffectRun(true);
      axios
        .get(backendUrl + "songs/" + songId)
        .then(({ data }) => setSong(data));
    }
  }, [userId, songId, isEffectRun]);

  const platforms = Object.keys(song).filter(
    (key) => typeof song[key] === "string" && song[key].includes("https")
  );

  const platformIcons = {
    spotify: <FaSpotify className="text-heading-4" />,
    apple: <FaApple className="text-heading-4" />,
    youtube: <FaYoutube className="text-heading-4" />,
    default: <FaMusic className="text-heading-4" />, // fallback icon
    "apple-music": <SiApplemusic className="text-heading-4" />,
    "amazon-music": <SiAmazonmusic className="text-heading-4" />,
    gaana: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="38px"
        height="38px"
        baseProfile="basic"
      >
        <path
          fill="#fff"
          d="M37.228,43H10.772C8.136,43,6,40.864,6,38.228V11.772C6,9.136,8.136,7,10.772,7h26.457	C39.864,7,42,9.136,42,11.772v26.457C42,40.864,39.864,43,37.228,43z"
        />
        <path
          fill="#000"
          d="M24.962,12c-0.04,0-0.08,0-0.12,0.01c-2.82,0.05-5.11,2.22-5.35,4.99l-1.248,10c0,2.76,2.24,4,5,4	H26.8c0,0.03-0.01,0.06-0.01,0.09C26.47,34.17,26.38,35,23.5,35H18l-1,3h6.5c5.57,0,5.826-3.663,6.28-6.59	C29.84,30.87,32.424,12,32.424,12H24.962z M26.14,28h-2.586c-1.28,0-2.31-1.03-2.31-2.31L22.462,17c0.11-1.28,1.7-1.98,3-2H28	c0.33,0,0.54,0.09,0.67,0.23c0.27,0.27,0.21,0.75,0.15,1.16l-1.14,7.23l-0.55,3.53C27.06,27.64,26.64,28,26.14,28z"
        />
      </svg>
    ),
    jiosaavn: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="38px"
        height="38px"
      >
        <path
          fill="white"
          d="M 14 3.9902344 C 8.486 3.9902344 4 8.4762344 4 13.990234 L 4 35.990234 C 4 41.504234 8.486 45.990234 14 45.990234 L 32 45.990234 L 32 45.962891 C 33.827743 48.40534 36.732629 50 40 50 C 45.5 50 50 45.5 50 40 C 50 36.732629 48.40534 33.827743 45.962891 32 L 46 32 L 46 13.990234 C 46 8.4762344 41.514 3.9902344 36 3.9902344 L 14 3.9902344 z M 14 5.9902344 L 36 5.9902344 C 40.411 5.9902344 44 9.5792344 44 13.990234 L 44 30.845703 C 42.772767 30.305196 41.421143 30 40 30 C 35.433084 30 31.565043 33.107064 30.380859 37.308594 C 29.084472 38.245027 27.897977 39.28982 26.939453 40.330078 C 26.359453 40.970078 26.829453 42 27.689453 42 L 30.201172 42 C 30.34321 42.692283 30.563783 43.357183 30.841797 43.990234 L 14 43.990234 C 9.589 43.990234 6 40.401234 6 35.990234 L 6 13.990234 C 6 9.5792344 9.589 5.9902344 14 5.9902344 z M 14 8 C 10.686 8 8 10.686 8 14 L 8 17.501953 C 8 17.882953 8.2105937 18.238531 8.5585938 18.394531 C 13.212594 20.481531 20.661391 30.761 21.900391 42 L 25.099609 42 C 26.313609 29.891 38.343078 22.226984 41.330078 21.083984 C 41.727078 20.932984 42 20.565625 42 20.140625 L 42 14 C 42 10.686 39.314 8 36 8 L 29.402344 8 C 28.800344 8 28.336156 8.5201875 28.410156 9.1171875 C 29.119156 14.799188 28.987 26.167 23 39 C 23 29.566 17.659969 14.801984 14.542969 8.3339844 C 14.441969 8.1249844 14.232 8 14 8 z M 40 32 C 44.4 32 48 35.6 48 40 C 48 44.4 44.4 48 40 48 C 35.6 48 32 44.4 32 40 C 32 35.6 35.6 32 40 32 z M 9.109375 33.953125 C 8.516375 33.883125 8 34.358078 8 34.955078 L 8 36 C 8 39.314 10.686 42 14 42 L 19.308594 42 C 20.176594 42 20.643687 40.966125 20.054688 40.328125 C 17.346688 37.391125 12.829375 34.399125 9.109375 33.953125 z M 44.615234 35 C 44.573047 35 44.544922 35.005859 44.544922 35.005859 C 44.544922 35.005859 38.747656 36.204687 38.347656 36.304688 C 38.097656 36.354687 37.998047 36.505859 37.998047 36.755859 L 37.998047 41.242188 C 37.998047 41.692188 38.097047 41.992188 36.998047 41.992188 C 35.799047 41.992188 35 42.740234 35 43.490234 C 35 43.990234 35.200047 44.989281 36.748047 44.988281 C 38.297047 44.988281 38.996094 44.040234 38.996094 43.490234 L 38.996094 39.203125 C 38.996094 38.903125 39.047266 38.803906 39.197266 38.753906 C 39.347266 38.753906 42.945703 37.853125 43.595703 37.703125 C 43.995703 37.603125 43.994141 37.704687 43.994141 38.054688 L 43.994141 39.457031 L 43.994141 40.257812 C 43.994141 40.707813 44.095094 41.007812 42.996094 41.007812 C 41.797094 41.007812 40.996094 41.757812 40.996094 42.507812 C 40.996094 43.007813 41.197094 44.005859 42.746094 44.005859 C 44.295094 44.005859 44.994141 43.057812 44.994141 42.507812 L 44.994141 39.158203 L 44.994141 37.705078 L 44.994141 35.505859 C 44.994141 35.055859 44.741797 35 44.615234 35 z"
        />
      </svg>
    ),
  };

  return (
    <div className="py-3 lg:pt-7 lg:pb-6 flex justify-center">
      <div className="shadow shadow-[#00000081] p-3 bg-linear-[0deg] from-black to-interactive-light text-black w-11/12 lg:w-1/3 rounded-lg">
        <FaChevronLeft
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <img
          src={
            song.artwork || dummyAlbumArt
            // "https://server.forevisiondigital.in/uploads/art-work/file-1731994452207-1b_3000p.jpg"
          }
          alt="dummy"
          className="mx-auto my-1 w-[200px] rounded-lg aspect-square object-cover"
        />
        <h4 className="text-heading-5-bold lg:text-heading-4-bold text-center">
          {song.Song || song.songName}
        </h4>
        <h6 className="text-paragraph-1 lg:text-heading-6-bold text-grey lg:mt-1 text-left">
          {<p className="text-center">{song.ArtistName}</p> || (
            <ul className="flex flex-col items-center gap-1 mt-2">
              {song.artists?.map((item, key) => (
                <li key={key}>
                  {item.role.includes("/")
                    ? item.role.split("/")[0]
                    : item.role}
                  : {item.name}
                </li>
              ))}
            </ul>
          )}
        </h6>

        <div className="mt-4">
          {platforms.map(
            (item, key) =>
              item === "YouTube-Topic" ||
              item === "Meta" || (
                <a
                  href={song[item]}
                  target="_blank"
                  rel="noreferrer"
                  key={key}
                  className="flex items-center gap-2 p-2 transition text-black"
                >
                  {platformIcons[item.toLowerCase()] || platformIcons.default}

                  <h5 className="text-heading-5-bold capitalize">
                    {item.includes("-") ? item.split("-").join(" ") : item}
                  </h5>
                </a>
              )
          )}
        </div>

        <CopyToClipboard
          text={window.location.href}
          data-tooltip-id={"copy"}
          onCopy={() => setCopied(true)}
          data-tooltip-content={copied ? "Copied" : "Copy Link To Clipboard"}
          className="cursor-pointer text-paragraph-1 focus:outline-none flex items-center justify-center w-full mt-2 py-2 rounded text-interactive-dark gap-2"
        >
          <div className="">
            <FaLink /> <button>Click to Get the Sharable Link</button>
          </div>
        </CopyToClipboard>
        <Tooltip id={"copy"} />
      </div>
    </div>
  );
};

export default SocialLinks;
