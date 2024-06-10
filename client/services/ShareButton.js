import { useState } from 'react';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { generatePdfLink } from './linkgenerator.js'; // Adjust the import path accordingly
import { CiShare2 } from "react-icons/ci";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";

const ShareButton = ({ title, pdfLink }) => {
  const [copied, setCopied] = useState(false);
  const url = generatePdfLink(pdfLink);
  const websiteUrl = "https://edudoc.vercel.app/";
  const text = `Check out this document: ${title} : ${url}`;
  const stats = `\n1000+ Views Increasing day by day 1000+ Visitors Across the Globe Users Growing!`;
  const callToAction = `\nCheck website: ${websiteUrl} to see more notes and contribute.`;
  const promotionalMessage = "Discover valuable insights and resources at EduDoc!";
  const message = `${promotionalMessage}${callToAction}\n${stats}\n${text}`;
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Reset copied state after 3 seconds
  };

  return (
    <>
      <CopyToClipboard text={message} onCopy={handleCopy}>
        <button className='text-blue-500 transition-colors duration-200 hover:text-blue-700'>
        {copied ? 'Copied' : ''}
          <FaRegCopy   /> 
        </button>
      </CopyToClipboard>
      <WhatsappShareButton url={url} title={message}>
        <CiShare2 size={32} round className='text-blue-500 transition-colors duration-200 hover:text-blue-700' />
      </WhatsappShareButton>
    </>
  );
};

export default ShareButton;
