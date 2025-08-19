import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { dateSuffix } from "../../utils/dateSuffix";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation } from "react-router-dom";
import { getAudioDuration } from "../../utils/getAudioDuration";
import { formatTime } from "../../utils/formatTime";
import Button from "../Button/Button";
import generatePDF from "react-to-pdf";
import signature from "../../assets/images/signature.webp";
import axios from "axios";
import { backendUrl } from "../../constants";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";

const Agreement = ({ handleClose, formData }) => {
  const date = new Date();
  const { userData, token, setRefetch } = useContext(ProfileContext);
  // console.log(userData);
  const location = useLocation();
  const [audioDuration, setAudioDuration] = useState(0);
  const agreementRef = useRef(null);
  // console.log(location.search.split("?"));
  const [downloading, setDownloading] = useState(false);
  useEffect(() => {
    // formData;
    getAudioDuration(formData.songUrl)
      .then((duration) => setAudioDuration(duration))
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  // const createPdf = async () => {
  //   // headerElement.style.display = "none";

  //   const pdf = await generatePDF(agreementRef, {
  //     filename: `Revenue_Details_of_.pdf`,
  //     page: {
  //       // default is 'A4'
  //       format: "A4",
  //       // scale: 2,
  //       // format: "letter",
  //       // default is 'portrait'
  //       orientation: "portrait",
  //     },
  //   });
  //   // handleClose();
  //   // axios.post

  //   try {
  //     const pdfBlob = await generatePDF();
  //     const fileName = `Agreement of ${userData.first_name}.pdf`;

  //     // Offer download to user
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(pdfBlob);
  //     link.download = fileName;
  //     link.click();

  //     // Upload PDF
  //     const formData = new FormData();
  //     formData.append("file", pdfBlob, fileName);

  //     const res = await axios.post(backendUrl + "upload-letterhead", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         token: sessionStorage.getItem("token"),
  //       },
  //     });

  //     // console.log(res);

  //     // Submit record label data
  //     // const config = { headers: { token } };
  //     // const response = await axios.post(
  //     //   backendUrl + "record-labels",
  //     //   { ...data, pdf: res.data.url },
  //     //   config
  //     // );

  //     // if (response.data.acknowledged) {
  //     //   e.target.reset();
  //     //   setSubmitted(false);

  //     //   Swal.fire({
  //     //     title: "Record Label Submitted Successfully",
  //     //     text: "The PDF has been downloaded and uploaded to the server.",
  //     //     icon: "success",
  //     //     customClass: {
  //     //       confirmButton: "custom-class-settings",
  //     //     },
  //     //   });
  //     // }
  //   } catch (error) {
  //     // toast.error(
  //     //   error.response?.data || "An error occurred. Please try again.",
  //     //   {
  //     //     position: "bottom-center",
  //     //   }
  //     // );
  //   } finally {
  //     // setSubmitted(false);
  //   }

  //   // showPreview(false);
  //   // setDetails("");

  //   // console.log(pdf);
  // };

  // const createPdf = {};

  useEffect(() => {
    const generateAndUploadPdf = async () => {
      if (formData.accepted) {
        // Show loading Swal
        Swal.fire({
          title: "Hold Tight, Almost There!",
          text: "Wrapping things up now, just a moment!",
          icon: "info",
          showConfirmButton: false,
          // allowOutsideClick: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        setDownloading(true);
        const element = agreementRef.current;

        // Capture the entire HTML element as a canvas
        const canvas = await html2canvas(element, {
          scale: 1, // Increase scale for better quality
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Calculate how many pages are required
        let imgHeight = (canvasHeight * pageWidth) / canvasWidth;
        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);

        // Loop through and add new pages if necessary
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Download the PDF
        const fileName = `Agreement_of_${userData.first_name}.pdf`;
        // pdf.save(fileName);

        // Upload the PDF Blob
        const pdfBlob = pdf.output("blob");
        const formData = new FormData();
        formData.append("file", pdfBlob, fileName);

        try {
          const res = await axios.post(
            backendUrl + "upload-agreements",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                token: sessionStorage.getItem("token"),
              },
            }
          );

          const data = {
            agreementUrl: res.data.agreementUrl,
            emailId: userData.emailId,
          };

          const insertResponse = await axios.post(
            backendUrl + "upload-agreements/add-to-db",
            data
          );

          if (insertResponse.data.acknowledged) {
            Swal.close();
            setRefetch((ref) => !ref);
            Swal.fire({
              title: "You're done",
              text: "Feel free to continue to checkout or save your work as a draft.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error uploading PDF:", error);
        } finally {
          setDownloading(false);
        }
      }
    };

    generateAndUploadPdf(); // Call the async function
  }, [formData.accepted]); // Dependencies

  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    // console.log(config);
    const config = {
      headers: { token: sessionStorage.getItem("token") || token },
    };
    axios
      .get("https://localhost:5000/platforms", config)
      .then(({ data }) => {
        setPlatforms(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Function to categorize the selected platforms
  const categorizePlatforms = (selectedPlatforms) => {
    const categorized = {};

    platforms.forEach((category) => {
      const platforms = category.platforms.map((platform) => platform.cat_name);
      const matchedPlatforms = platforms.filter((platform) =>
        selectedPlatforms?.includes(platform)
      );

      if (matchedPlatforms.length > 0) {
        categorized[category.platformType] = matchedPlatforms;
      }
    });

    return categorized;
  };

  // Usage
  const categorizedSelectedPlatforms = categorizePlatforms(
    formData.selectedPlatforms
  );
  console.log(categorizedSelectedPlatforms);

  return (
    <>
      {/* <Modal
        className={"!items-start !block !overflow-y-auto py-3 lg:py-7"}
        // handleClose={handleClose}
      > */}
      <div
        className="p-[96px] bg-white border-2 min-w-[1226px] absolute -left-[1226px] lg:-left-[100vw] max-w-[1226px]"
        ref={agreementRef}
      >
        <h1 className="text-heading-2-bold text-center text-grey-dark mb-4">
          Agreement
        </h1>

        <p>
          THIS AGREEMENT IS MADE this the {dateSuffix(date.getDate())} day of{" "}
          {date.toLocaleString("default", { month: "long" })}{" "}
          {date.getFullYear()} at Cooch Behar.
        </p>

        <h5 className="text-heading-5-bold text-center text-black mb-2 mt-4">
          Between
        </h5>
        <p>
          <b>GeetBazaar</b>, a Digital Distributor Firm having its main office
          at Saha Para, Near petrol pump, Khagrabari, Cooch Behar, West Bengal -
          736179, India, herein after referred to as <b>First Part</b>.
        </p>

        <h6 className="text-heading-6-bold text-center text-black mb-2 mt-4">
          AND
        </h6>

        <p>
          {userData.first_name} {userData.last_name}, and having its registered
          / Main office at {userData.billing_address}, {userData.billing_city},{" "}
          {userData.billing_country}, Hereinafter referred as Second Part.
        </p>

        <p className="my-2">
          <b>AND Whereas, FOREVISION DIGITAL or First Part</b> is a record label
          & digital distributor based on India that made the plat form for
          publishing songs on all its network including YouTube (content
          id/Video), Social sites, web site, App (s), and other digital
          Platforms as listed in Schedule as discussed between parties.
        </p>

        <p className="my-2">
          <b>AND Whereas</b>, Second Part is an individual artist / band / group
          / Producer / Company / Proprietorship/ HUF/ Partner/LLP who being a
          local performer and having knowledge about the music and art and
          familiar with the musical abilities of music and its abilities.
        </p>

        <p className="my-2">
          <b>AND Whereas</b>, the second Part wants to enlist his/its name to
          any Label or/And wants spread his/its music to online/ broadcast/
          Podcast/ OTT/ YouTube platforms and for the same the second part
          approached to the First Part.
        </p>

        <p className="my-2">
          <b>AND Whereas</b>, the First Part Agrees to do so for the following
          conditions:
        </p>

        <ol type="1">
          <li>
            <b>1. TERM.</b> The effectiveness of this Agreement shall commence
            with its execution by all of the parties, and shall continue
            thereafter for a period of 2 years.
          </li>

          <li>
            <b>2. DEFINITIONS.</b>
            <ol>
              <li>
                a. “Digital Master” or “Digital Masters” means copies of Second
                Part’s sound recordings / Video File and underlying musical
                compositions that Second Part owns, controls, or has the
                appropriate rights to distribute in a digital form, which First
                Part may sell or authorize Digital Store(s) to sell via
                Electronic Transmission, but not limited to, permanent digital
                download, streams, “conditional download,” ring tones, real
                tones, or other digital form as individual tracks or as a whole
                album, and artwork pursuant to the terms and conditions of this
                Agreement. Any sound recordings and the underlying musical
                compositions that are provided by or on behalf of Second Part to
                First Part must be owned or controlled by Second Part and/or
                have been cleared by Second Part. Any sound recording provided
                by Second Part to First Part shall be deemed subject to this
                agreement.
              </li>
              <li>
                b. “Digital Store” means any third party, including but not
                limited to CRBT Platforms such as Bharti Airtel, Vodafone Idea,
                BSNL, Jio Tunes, Music Streaming Plat forms such as WYNK, Gaana,
                Jio Saavn, Amazon; Video Platforms such as Youtube
                (audio/contendid), MX Player, Amazon prime video, hungama;
                International Streaming Plat forms such as Apple Music, iTunes,
                Spotify, Deezer, KKBox, Soundcloud, Pandora, AudibleMagic,
                MixCloud, iHeart, iMusicCorp, Awa, Netease, Napster, Boomplay,
                Alibaba, Vevo, Anghami, Snap, TikTok, Resso(Bytedance),
                Facebook, Triller, Jaxsta, Kuack Media, Touchtunes & many that
                First Part in its sole discretion may authorize to carry out the
                marketing, distribution and sale or other use of the Digital
                Masters pursuant to the terms of this Agreement, which is
                mentioned in the Schedule.
              </li>

              <li>
                c. “The Effective Date of this Agreement” shall mean either the
                date of this agreement or the day that the first Digital Masters
                are received by First Part from Second Part, whichever is the
                later.
              </li>
              <li>
                d. “Term” means the period beginning on the Effective Date of
                this Agreement and ending two (2) year after the Effective Date.
              </li>
              <li>
                e. “Territory” means the Territory of India and other than
                India.
              </li>
              <li>
                f. “Artwork” means album cover artwork and any other artwork
                relating to Second Part Digital Master(s) that Second Part
                provides to First Part. Any artwork/music/ inlay work that is
                provided by or on behalf of Second Part to First Part before or
                during the Term will be deemed to have been cleared by Second
                Part unless Label promptly notifies First Part in writing to the
                contrary.
              </li>
              <li>
                g. “Metadata” means the following categories of information in
                respect to each Digital Master: track title; album title; artist
                name; genre; copyright information; label name; ISRC and UPC
                identifiers; “Explicit Lyrics,” identification; biographical
                information; sales information- including pricing, date of first
                release; territories available for release; Songwriter and
                Publisher information.
              </li>
            </ol>
          </li>

          <li>
            <b>2. RIGHTS: </b>
            <ol>
              <li>
                a. Subject to the terms of this Agreement, Second Part hereby
                appoints First Part as Distributer exclusive authorized
                representative for the sale and electronic transmission of its
                Digital Masters. Accordingly, Second Part hereby grants an
                exclusive right to First Part to distribute such as during the
                Term, to: (i) Reproduce and convert Second Part’s content
                delivered by Second Part into Digital Masters; (ii) Perform and
                make thirty (30) second clips of the Second Part’s content
                available by streaming (“Clips”) to promote the sale and
                distribution of applicable Digital Masters; (iii) Promote, sell,
                distribute, and electronically transmit and deliver Digital
                Masters, as individual tracks or entire albums, and associated
                Metadata to purchasers who may use such Digital Masters in
                accordance with usage rules similar to those set forth by the
                music services; (iv) Display and electronically transmit and
                deliver Artwork for use solely in conjunction with the
                applicable purchased Digital Master(s); (v) Use Second Parts’
                Content, Artwork and Metadata as may be reasonably necessary or
                desirable for First Part to exercise First Part rights under the
                terms of this Agreement; and (vi) authorize or appoint any
                Online Store(s) to perform the activities in (i)-(v) above.
              </li>
              <li>
                b. First Part may use and authorize its Online Store(s) to use
                the names biographical material concerning and of the Second
                Parts as well as track and/or album name, and Artwork, in any
                marketing materials for the sale, promotion and advertising of
                the applicable Digital Master which is offered for sale or other
                use under the terms of this Agreement (e.g., an artist or band
                name may be used in an informational fashion, such as textual
                displays or other informational passages, to identify and
                represent authorship, production credits, and performances of
                the applicable artist or band in connection with the authorized
                exploitation of applicable Digital Masters). First Part and any
                of its Online Store(s) shall have the unrestricted right to
                market, promote and advertise the Digital Masters available for
                distribute as it determines in its discretion. Nothing herein
                shall obligate First Part or any Online Store(s) to actually
                exercise any rights granted under this Agreement as per Copy
                Right Act.
              </li>
              <li>
                c. First Part shall re-distribute the recording / master file /
                music as per the direction given by the 2nd part.
              </li>
            </ol>
          </li>

          <li>
            <b>3. SECOND PART’S OBLIGATIONS: </b>
            <br />
            <p>
              Second Part shall obtain and pay for any necessary clearances and
              licenses in the Territory for all Second Part Content and Artwork.
              Specifically, Second Part shall be responsible for and timely pay
              (i) any royalties and other income due to artists, authors,
              co-authors, copyright owners, co-copyright owners, producers and
              other record royalty participants from sales or other uses of
              Digital Masters, (ii) all mechanical royalties payable to
              publishers and/or authors or co-authors of copyrighted musical
              compositions embodied in Digital Masters from sales or other uses
              of Digital Masters, (iii) all payments that may be required under
              collective bargaining agreements applicable to Second Part or
              third parties other than First Part, and (iv) any other royalties,
              fees and/or sums payable with respect to the Second Part Content,
              Artwork, Metadata and other materials provided by Second Part to
              First Part.
            </p>
          </li>

          <li>
            <b>4. PAYMENT:</b>
            <br />
            <p>
              First Part shall pay Second Part of the{" "}
              {location.search
                ?.split("?")[1]
                ?.toLowerCase()
                ?.includes("forevision-social") ||
              location.pathname?.includes("album-upload")
                ? 80
                : 90}
              % (Audio),{" "}
              {location.search
                ?.split("?")[1]
                ?.toLowerCase()
                ?.includes("forevision-social") ||
              location.pathname?.includes("album-upload")
                ? 80
                : 85}
              % (YouTube) of the total revenues that First Part receives from
              Online Store(s) for the sale/streaming / downloading or other use
              of Second Part’s Digital Masters. First Part will compute amounts
              payable to the Second Part in each 3 months during the Term, and
              will provide a statement to Second Part in accordance with First
              Part’s standard business practices. Such payment shall constitute
              full consideration for all rights granted and obligations
              undertaken by Second Part hereunder. Revenue shall be paid to the
              Second Part if such Revenue share of Second Part exceeds minimum
              Rs.1,000/- rupees.
            </p>
          </li>

          <li>
            <b>5. OWNERSHIP: </b>
            <br />
            <p>
              As between the Parties, all right, title and interest in and to
              (i) Second Part’s Sound Recordings and Artwork, (ii) the Clips,
              (iii) all copyrights and equivalent rights embodied therein, and
              (iv) all materials furnished by Second Part, except as to any
              rights of First Part (whether pre-existing or under this
              Agreement), shall remain the property of Second Part, it being
              understood that under no circumstances shall First Part have any
              lesser rights than it would have as a member of the public. The
              first part shall have the ownership of the master track for the
              purpose of only distribution and sale.
            </p>
          </li>

          <li>
            <b>6. INDEMNIFICATION AND LIMITATION OF LIABILITY:</b>
            <br />
            <ol>
              <li>
                a. Second Part will indemnify, defend and hold harmless, and
                upon First Party’s request, defend, First Part and its Online
                Store(s) and affiliates (and their respective directors,
                officers and employees) from and against any and all losses,
                liabilities, damages, costs or expenses (including reasonable
                attorneys’ fees and costs) arising out of a claim by a third
                party by reason of: (i) a breach of any warranty,
                representation, covenant or obligation by Second Part under this
                Agreement; or (ii) any claim that any Digital Certain
                information on this page has been omitted and filed separately
                with the Commission. Confidential treatment has been requested
                with respect to the omitted portions. Master, sound recording or
                Second Part Content, Artwork, Metadata or any other materials
                provided or authorized by or on behalf of Second Part hereunder
                or First Part’s or its Online Store(s) use thereof violates or
                infringes the rights of another party. Second Part will
                reimburse First Part and its Online Store(s) and affiliates on
                demand for any actual payments made in resolution of any
                liability or claim that is subject to indemnification under this
                Claus 6, provided that First Part obtains Second Part’s written
                consent prior to making such payments, such consent not to be
                unreasonably withheld, delayed or conditioned First Part shall
                promptly notify Second Part of any such claim. Second Part may
                assume control of the defense of such claim. First Part shall
                have the right, to participate in the defense thereof under
                Second Part’s direction. Pending final determination of any
                claim involving such alleged breach or failure, first part may
                withhold sums due hereunder in an amount reasonably related to
                the amount of such claim. Second part shall have the right to
                participate in the defense of any action instituted on a claim
                for which second part is responsible to indemnify first part
                using counsel of Second part’s choice with own expense.
              </li>
              <li>
                b. Second Part represents and warrants that it has the full
                authority to act on behalf of any and all owners of any right,
                title and interest in and to the Second Part Sound Recordings
                and artwork; that it has full authority to enter into this
                Agreement and to fully perform its obligations hereunder and has
                obtained all necessary third-party consents, licenses and
                permissions necessary to enter into and fully perform its
                obligations herein; that it owns or controls the necessary
                rights in order to make the grant of rights, licenses and
                permissions herein, and that the exercise of such rights,
                licenses and permissions by the other party hereto shall not
                violate or infringe the rights of any third party; that it shall
                not act in any manner which conflicts or interferes with any
                existing commitment or obligation of such party, and that no
                agreement previously entered into by such party will interfere
                with such party’s performance of its obligations under this
                Agreement.
              </li>
              <li>
                c. The warranties and indemnifications herein shall survive the
                termination of this agreement.
              </li>
            </ol>
          </li>

          <li>
            <b>7. GENERAL PROVISIONS:</b>
            <ol type="a">
              <li>
                a.{" "}
                <span className="underline">No Agency or Joint Venture:</span>{" "}
                The parties agree and acknowledge that the relationship between
                the parties is that of independent contractors. This Agreement
                shall not be deemed to create a partnership or joint venture,
                and neither party is the other’s agent, partner, employee, or
                representative.
              </li>
              <li>
                b. <span className="underline">Binding on Successors:</span>{" "}
                This Agreement shall be binding on the assigns, heirs,
                executors, personal representatives, administrators, and
                successors (whether through merger, operation of law, or
                otherwise) of the parties.
              </li>
              <li>
                c. <span className="underline">Notices:</span> Any notice,
                approval, request, authorization, direction or other
                communication under this Agreement shall be given in writing and
                shall be deemed to have been delivered and given for all
                purposes. For every Action which is not included in this
                agreement the Both the parties shall serve a Notice to other
                Part with the prior 7 days intimation. Any notices or delivery
                required herein shall be deemed completed when hand-delivered,
                delivered by agent, or placed in the Indian Mail, postage
                prepaid, to the parties at the addresses listed herein.
              </li>
              <li>
                d. This writing contains the entire understanding between the
                parties and supersedes any previous agreements between the
                parties. During the term of this Agreement, it is understood and
                agreed that there shall be no change or modification of this
                Agreement unless reduced to writing and signed by all parties
                hereto. This agreement shall be governed by the laws of India,
                and subject to the exclusive jurisdiction of the courts located
                in the Cooch Behar.
              </li>
              <li>
                e. <span className="underline">Cure:</span> If either party
                hereto alleges that the other has breached this agreement, they
                must notify the other party in writing of such breach and then
                the other party shall have a period of forty five (45) days to
                cure such breach.
              </li>
            </ol>
          </li>

          <li>
            <b>8. GRANT OF LICENSE:</b>
            <ol type="a">
              <li>
                a. <span className="underline">Licensed Recordings:</span>
                Rights Holder i.e. Second Part hereby grants to Distribute as
                Distributor i.e. First Part and Distributor’s Third Party
                Assignees a nonexclusive right and license during the Term of
                Grant throughout the Territory to convert, digitize, encode,
                make, cause or otherwise produce Digital Audio Transmissions of
                the Rights Holder’s designated Licensed Recordings. The term
                “Digital Audio Transmission” shall mean any digital embodiment
                of a sound recording.
              </li>
              <li>
                b. <span className="underline">Distribution of Music:</span>{" "}
                Rights Holder i.e. Second Part hereby grants to Distribute as
                Distributor i.e. First Part and Distributor’s Third Party
                Assignees a nonexclusive right and license during the Term of
                Grant throughout the Territory to sell via downloading,
                distribute, publish, copy, transfer, convert, encode, integrate,
                digitally modify and deliver over the Internet the master sound
                recordings supplied by Rights Holder and designated as Licensed
                Recordings and embodied as Digital Audio Transmissions by the
                Distributor i.e. First Part and/or Distributor’s Third Party
                Assignees. It also serves the Right to Re-Distribute the Master
                Sound recording after delivering the written Consent by the
                Second Part.
              </li>
              <li>
                c. <span className="underline">Release:</span> Rights Holder
                i.e. Second Part hereby authorizes Distributor i.e. First Part
                and Distributor’s Third Party Assignees to immediately release,
                sell via downloading, publish, and/or deliver over the Internet
                the Digital Audio Transmissions of the Licensed Recordings and
                any artwork, writings, or pictorials supplied by Rights Holder
                to the Distributor for the purpose of promoting the sale of
                Rights Holder’s sound recordings during the Term of Grant
                throughout the Territory.
              </li>
              <li>
                d. <span className="underline">Music Streams</span> Rights
                Holder i.e. 2nd Part hereby grants to Distribute as Distributor
                i.e. First Part and Distributor’s Third Party Assignees a
                nonexclusive right and license during the Term of Grant
                throughout the Territory to perform the Digital Audio
                Transmissions of the Rights Holder’s Licensed Recordings by
                means of streaming digital transmissions for the purpose of
                audio listening by subscription consumers or for the purpose of
                promoting the sale and distribution of the recording. Rights
                Holder shall receive no royalty or payment of any kind for the
                performance of “music clips” as such performance is for the
                purpose of promoting the sale of Rights Holder’s sound
                recordings.
              </li>
              <li>
                e. <span className="underline">Portable Subscriptions:</span>{" "}
                Rights Holder i.e. Second Part hereby grants to Distribute as
                Distributor i.e. First Part and Distributor’s Third Party
                Assignees a nonexclusive right and license during the Term of
                Grant throughout the Territory to perform and deliver to
                portable subscription services the Digital Audio Transmissions
                of the Rights Holder’s Licensed Recordings by means of streaming
                digital transmissions and downloading for the purpose of audio
                listening by portable subscription consumers.
              </li>

              <li>
                f. <span className="underline">Distribution of Artwork:</span>{" "}
                Rights Holder i.e. Second Part hereby grants to Distribute as
                Distributor i.e. First Part and Distributor’s Third Party
                Assignees a nonexclusive right and license during the Term of
                Grant throughout the Territory to distribute, display, publish,
                copy, transfer, convert, encode, integrate, digitally modify and
                deliver over the Internet any artwork, writings, or pictorials
                supplied by Rights Holder to Distributor i.e. First Part and/or
                Distributor’s Third Party Assignees for the purpose of promoting
                the sale of the sound recordings.
              </li>

              <li>
                g. <span className="underline">Text:</span> Rights Holder i.e.
                Second Part hereby grants to Distribute as Distributor i.e.
                First Part and Distributor’s Third Party Assignees a
                nonexclusive right and license during the Term of Grant
                throughout the Territory to distribute, display, publish, copy,
                transfer, convert, encode, integrate, digitally modify and
                deliver over the Internet all writings, text and statements
                provided by the Rights Holder to the Distributor i.e. First Part
                and/or Distributor’s Third Party Assignees for the purpose of
                promoting the sale and distribution of the sound recordings.
              </li>

              <li>
                h. <span className="underline">Reserved Rights:</span> The
                Rights Holder i.e. Second Part reserves all rights and license
                not expressly granted to Distributor i.e. First Part and
                Distributor’s Third Party Assignees hereunder. Ownership of the
                Licensed Recordings and Licensed Artwork shall remain with
                Rights Holder i.e. 2nd Part or its licensors.
              </li>
            </ol>
          </li>

          <li>
            <b>9. DELIVERY:</b>
            <p>
              Rights Holder shall deliver to Distributor i.e. First Part by
              means of CD or Digital Audio Transmission (Uploading) the master
              versions of each Licensed Recording hereunder; a reasonable number
              of items of the related artwork for use by Distributor i.e. First
              Part and Distributor’s Third Party Assignees in connection with
              the marketing and promotion of the Licensed Recordings; and, a
              written schedule of the names and contact information of the
              author(s), composer(s), and music publisher(s) of the songs
              embodied in the Licensed Recordings, together with any additional
              copyright information known to Second Part relating to the
              Licensed Recordings, and a list of credits that Rights Holder is
              contractually required or otherwise reasonably desires to provide
              in connection with the distribution, exploitation of the Licensed
              Recordings hereunder. Distributor i.e. First Part shall have no
              right to modify the Licensed Recordings, except that it may
              digitize and/or encode the Licensed Recordings in any format now
              known or hereafter devised for purposed of facilitating the
              exercise of the rights and licenses granted hereunder.
            </p>
          </li>

          <li>
            <b>10. RIGHTS HOLDER i.e. SECOND PART’S OBLIGATIONS::</b>
            <p>
              The Rights Holder shall obtain and pay for any necessary
              clearances and licenses in the Territory for all the Rights
              Holder’s sound recordings and artwork. The Rights Holder shall be
              responsible for and pay any royalties and other income due to
              artists, authors, co-authors, copyright owners, co-copyright
              owners, producers, and other record royalty participants from
              sales or other uses of the Licensed Recordings. The Rights Holder
              shall also be responsible all mechanical royalties payable to
              publishers and/or authors or co-authors of copyrighted musical
              compositions embodied in the Licensed Recording from sales or
              other uses of the Licensed Recording. The Rights Holder shall also
              be responsible for all payments that may be required under
              collective bargaining agreements applicable to the Rights Holder
              and any other royalties, fees, and or monies payable by the Rights
              Holder with respect to the Rights Holder’s Licensed Recordings,
              artwork, and other materials supplied by Rights Holder to
              Distributor and Distributor’s Third Party Assignees.
            </p>
          </li>
          <li>
            <b>11. USE OF NAMES: </b>
            <p>
              Rights Holder hereby grants to Distributor and Distributor’s Third
              Party Assignees the right to use and to allow others to use the
              Rights Holder’s name, likeness of artist(s), group(s) or band(s),
              company information, and biographical material for the purpose of
              advertising and promoting the sale of the Licensed Recordings
              during the Term of Grant throughout the Territory.
            </p>
          </li>
          <li>
            <b>12. VERIFICATION:</b>
            <p>
              First Part shall verify the authenticity of the Master
              File/recording and being satisfied with the satisfied possible
              time, Accept and Start the work of Distribution.
            </p>
          </li>
          <li>
            <b>13. INDEMNIFY: </b>
            <p>
              Second Part shall be solely responsible for the payment of any and
              all royalty fees payable as a result of the performance of any
              copyrighted music or matters performed pursuant to the copyright
              Act, 1957 and will hold First Part harmless and indemnify First
              Part from any claims there from.
            </p>
          </li>
          <li>
            <b>14. ACT OF GOD: </b>
            <p>
              It is mutually agreed that neither party shall be responsible for
              any provision in this contract when prevented from complying with
              a contractual provision due to any Act of God or any other
              legitimate condition beyond the control of the appropriate party.
            </p>
          </li>
          <li>
            <b>15. ARBITRATION: </b>
            <p>
              In the event of a dispute between Parties regarding the terms,
              construction or performance of this Agreement, such dispute shall
              be settled by arbitration conducted by Abhirup Bhattacharjee,
              Advocate, Cooch Behar in Cooch Behar, West Bengal, according to
              the rules of the Arbitration and Conciliation Act, 1996.The award
              or decision resulting there from shall be subject to immediate
              enforcement in a West Bengal (state) court of competent
              jurisdiction. And the cost of the arbitration shall be incurred by
              both the parties such as Arbitrator fee, Conference hall / room
              rent, etc.
            </p>
          </li>
          <li>
            <b>16. ATTORNEY'S FEES: </b>
            <p>
              In the event of dispute arising between the parties, if a part is
              forced to obtain an attorney to enforce the terms of this
              Agreement, the party prevailing in such action of enforcement
              shall be entitled to the recovery of attorney's fees incurred in
              such action.
            </p>
          </li>
          <li>
            <b>17. COVENANT OF GOOD FAITH AND FAIR DEALING: </b>
            <p>
              Both the Parties agreed to perform their obligations under this
              Agreement, in all respects, in good faith.
            </p>
          </li>
          <li>
            <b>18. INDEPENDENT CONTRACTOR:</b>
            <p>
              In the performance of his/her obligations of this Agreement,
              Second Part shall be deemed an independent contractor.
            </p>
          </li>
          <li>
            <b>19. SUE OR TO BE SUED:</b>
            <p>
              That if any of the part will not rely upon the Clauses of this
              agreement or its Sub-Agreements which has a direct or indirect
              connection of its Terms and condition that he may Sue or to be
              sued through both civil and criminal periphery of law.
            </p>
          </li>
          <li>
            <b>20. RENEWAL FEE:</b>
            <p>
              A Renewal Fee for granting successive Terms to the Rights Holder
              shall be designated by First Part from time to time.
            </p>
          </li>
          <li>
            <b>21. TERM OF GRANT:</b>
            <p>
              The Term of Grant shall commence upon the date hereof and shall
              continue until the Rights Holder cancels in writing with First
              Part or for Two (2) years whichever is shorter. Distributor i.e.
              First Part shall have sixty (60) days after notice of cancellation
              or expiration of the Term to remove all of the Rights Holder’s
              i.e. Second Part music / content from the web sites or the
              Internet Plat Forms of the Distributor i.e. First Part and the
              Distributor’s Third Party Assignees.
            </p>
          </li>
        </ol>

        <h5 className="text-heading-5-bold mt-3 text-center mb-2">
          SECOND PART’S DETAILS:
        </h5>

        <div className="border divide-y border-black">
          <div className="flex divide-x divide-black">
            <p className="w-1/2 p-1">
              Individual/Company /Proprietorship/HUF/Partner/LLP ‘s Name:
            </p>
            <p className="w-1/2 p-1">
              {userData.first_name} {userData.last_name}
            </p>
          </div>

          <div className="flex divide-x border-black divide-black">
            <p className="w-1/2 p-1">Address/Office Address:</p>
            <p className="w-1/2 p-1">
              {userData.billing_address}, {userData.billing_city},{" "}
              {userData.billing_country}
            </p>
          </div>
          <div className="flex divide-x border-black divide-black">
            <p className="w-1/2 p-1">Duration of Recording:</p>
            <p className="w-1/2 p-1">{formatTime(audioDuration || 0)}</p>
          </div>
          <div className="flex divide-x border-black divide-black">
            <p className="w-1/2 p-1">Label Name (if any):</p>
            <p className="w-1/2 p-1">{formData.recordLabel}</p>
          </div>
          <div className="flex divide-x border-black divide-black">
            <p className="w-1/2 p-1">Contribute as fee to First Part:</p>
            <p className="w-1/2 p-1">
              {(parseFloat(location.search.split("?")[2]) / 100).toFixed(2)}
            </p>
          </div>
          <div className="flex divide-x border-black divide-black">
            <p className="w-1/2 p-1">
              Proposed Platforms for Distribution (as per Schedule) :
            </p>
            <p className="w-1/2 p-1">
              {formData.selectedPlatforms?.join(", ")}
            </p>
          </div>
        </div>

        <h5 className="text-heading-5-bold mt-3 mb-2 text-center">
          DESCRIPTION OF TRACKS / RECORDING / MUSIC /CONTENT
        </h5>

        <div className="border border-black text-center divide-y divide-black">
          <div className="grid grid-cols-6  divide-x divide-black">
            <p className="py-1">Song Name </p>
            <p className="py-1">Album Name</p>
            <p className="py-1">Singer </p>
            <p className="py-1">Lyricist</p>
            <p className="py-1">Language</p>
            <p className="py-1">Composer</p>
          </div>

          {location.pathname === "/album-upload" ? (
            formData?.songs?.map((song) => (
              <div className="grid grid-cols-6  divide-x divide-black">
                <p className="py-1">{song.songName} </p>
                <p className="py-1">{formData.albumTitle}</p>
                <p className="py-1">
                  {
                    song.artists.find(
                      ({ role }) => role === "Singer/Primary Artist"
                    ).name
                  }{" "}
                </p>
                <p className="py-1">
                  {song.artists.find(({ role }) => role === "Lyricist").name}
                </p>
                <p className="py-1">{song.language || "-"}</p>
                <p className="py-1">
                  {song.artists.find(({ role }) => role === "Composer").name}
                </p>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-6  divide-x divide-black">
              <p className="py-1">{formData.songName} </p>
              <p className="py-1">{formData.albumTitle}</p>
              <p className="py-1">
                {
                  formData.artists.find(
                    ({ role }) => role === "Singer/Primary Artist"
                  ).name
                }{" "}
              </p>
              <p className="py-1">
                {formData.artists.find(({ role }) => role === "Lyricist").name}
              </p>
              <p className="py-1">{formData.language || "-"}</p>
              <p className="py-1">
                {formData.artists.find(({ role }) => role === "Composer").name}
              </p>
            </div>
          )}
        </div>

        <h5 className="text-heading-5-bold mt-3 text-center mb-2">SCHEDULE</h5>

        <div className="border border-black text-center divide-y divide-black">
          <>
            {Object.keys(categorizedSelectedPlatforms).map((item) => (
              <div className="flex divide-x divide-black">
                <aside className="w-5/12 p-1">{item}</aside>
                <aside className="w-7/12 p-1">
                  {categorizedSelectedPlatforms[item].join(", ")}
                </aside>
              </div>
            ))}
          </>
        </div>

        <p className="mt-1">
          <b>THE PARTIES AGREE</b> to the terms and obligations and so execute
          on the day and date first above mentioned, signed this contract with
          will and consent.
        </p>

        <div className="flex mt-6 justify-around items-end">
          <div className="flex flex-col w-fit">
            <div className="signature text-center mb-1 w-1/2">
              <img src={signature} alt="" />
            </div>
            <p className="border-t border-black pt-1">First Part's Signature</p>
          </div>
          <div className="flex  flex-col">
            <div className="signature text-heading-4 text-center mb-1">
              {formData.signature}
            </div>
            <p className="border-t border-black pt-1">
              Second Part's Signature
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center mt-4">
        <Button disabled={downloading} onClick={createPdf}>
          {downloading ? "Please Wait..." : "Download & Close"}
        </Button>
      </div> */}
      {/* </Modal> */}
    </>
  );
};

export default Agreement;
