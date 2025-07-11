import React from "react";
import Accordion from "../Accordion/Accordion";

const Faq = () => {
  const accordionData = [
    {
      title: "What is GeetBazaar?",
      content:
        "GeetBazaar is a digital music distribution service that helps artists and record labels distribute their music to various online platforms such as streaming services, music stores, and social media platforms.",
    },
    {
      title: "What are the benefits of using GeetBazaar?",
      content:
        "By using GeetBazaar, you can reach a global audience through popular music platforms like Spotify, Apple Music, and YouTube. We offer competitive royalty rates, comprehensive reporting, and lifetime ownership of your music rights.",
    },
    {
      title:
        "What types of content does GeetBazaar not accept for distribution?",
      content:
        "We do not accept any song if it’s a Prank Tune, Political Tune, Current Affairs, Delhi Farmer’s Protest, Happy Birthday, Objectionable Word, IVRS, Business Tune, Name Tune, Promotional or Corporate Tune on any platform. Additionally, for Caller Tune platforms, we do not accept the above-mentioned content along with the National Anthem or National Song.",
    },
    {
      title: "How does digital music distribution work?",
      content:
        "Digital music distribution involves uploading your music to GeetBazaar, which then distributes it to online stores and streaming platforms worldwide. You retain ownership of your music and earn royalties whenever your music is streamed or downloaded.",
    },
    {
      title: "Can I distribute my music internationally with GeetBazaar?",
      content:
        "Yes, GeetBazaar distributes music globally to both international music stores and local platforms in various countries.",
    },
    {
      title: "What are the different plans offered by GeetBazaar?",
      content: "GeetBazaar offers several plans tailored to different needs:",

      listItems: [
        "- GeetBazar Pro: Distribution to Indian and international stores. Includes YouTube Music, YouTube Content ID, and lyrics monetization platforms like LyricFind and Musixmatch.",
        "- GeetBazar CRBT: Distribution to Indian stores and CRBT platforms. Includes YouTube Music, YouTube Content ID, and lyrics monetization platforms.",
        "- GeetBazar CRBT+: Distribution everywhere (Indian stores, international stores, and CRBT platforms), with higher royalties. Includes YouTube Music, YouTube Content ID, and lyrics monetization platforms.",
        "- GeetBazar Social: Distribution to social media platforms like Facebook, Instagram, TikTok, and more. Includes YouTube Music, YouTube Content ID, and lyrics monetization platforms.",
        "- GeetBazar Album: Album distribution plan where artists can upload EPs, LPs, or full albums for distribution across all supported platforms.",
      ],
    },
    {
      title: "How much does it cost to use GeetBazaar?",
      content:
        "Pricing varies depending on the plan you choose. We offer a one-time fee structure with no recurring charges.",
    },
    {
      title: "Do I retain ownership of my music rights with GeetBazaar?",
      content:
        "Yes, you retain 100% ownership of your music rights when you distribute with GeetBazaar.",
    },
    {
      title: "What file formats are accepted for music uploads?",
      content: "We accept WAV and MP3 file formats for music uploads.",
    },
    {
      title: "What are the artwork requirements for album covers?",
      content: "Artwork should be a minimum of 3000×3000 pixels in size.",
    },
    {
      title: "How long does it take for my music to go live after uploading?",
      content:
        "Your music typically goes live within a few days after approval, but our fast-track approval process can get your music live in as little as 3-4 hours.",
    },
    {
      title: "What kind of support does GeetBazaar offer?",
      content:
        "We provide lifetime support to help you with any issues or questions regarding your distribution.",
    },
    {
      title: "How can I contact GeetBazaar for support?",
      content:
        "You can reach our support team through email or phone, details of which are available on our website.",
    },
    {
      title: "How do I receive royalties from my music distribution?",
      content:
        "Royalties are collected from streaming platforms and stores and are paid out to you according to your chosen plan’s terms, typically monthly.",
    },
    {
      title: "What is your refund policy?",
      content:
        "We will refund the amount (after deduction of taxes, platform fees, and basic fees) in case your song is not LIVE on at least one platform within 30 days of the go-live date. Refund requests can be submitted to admin@forevisiondigital.com. Once the song is live, we cannot accept your refund request.",
      listItems: [
        "- Forced takedown by the uploader.",
        "- Cancellation of the order by the customer.",
        "- Takedown by a third party due to infringement of rights.",
        "- Takedown due to unauthorized upload or upload of a cover song without appropriate rights.",
      ],
    },
  ];

  return (
    <div className="pb-4">
      <h2 className="text-heading-4-bold lg:text-heading-2-bold text-white mt-6 text-center mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <Accordion data={accordionData} />
    </div>
  );
};

export default Faq;
