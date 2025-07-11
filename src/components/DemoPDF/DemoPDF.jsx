import React, { useContext, useRef } from 'react';
// import RevenueItem from '../RevenueItem/RevenueItem';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from '../Button/Button';
import { ProfileContext } from '../../contexts/ProfileContext';

const DemoPDF = ({ data, setDemoVisible }) => {
    const containerRef = useRef(null);
    const { profileData } = useContext(ProfileContext)

    // console.log(profileData);

    const handleConvertToPdf = async () => {
        const { clientHeight, clientWidth } = containerRef.current;

        const canvas = await html2canvas(containerRef.current, {
            scale: 2, // Adjust the scale if needed
        });

        const pdf = new jsPDF({
            unit: 'px',
            format: [clientWidth, clientHeight],
        });

        const imgData = canvas.toDataURL('image/png');

        // Adjustments to ensure the image fills the entire PDF without white sections
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Revenue_Details_${profileData.first_name}_${profileData.last_name}`);

        setDemoVisible(false)
    };


    return (
        <div className='h-screen w-screen backdrop-blur-md absolute top-0 left-0 z-[9999999] flex flex-col justify-center items-center gap-1'>
            <div className='w-10/12 h-5/6 bg-grey-light p-2 rounded relative' ref={containerRef}>
                <button className='absolute -top-2 -right-2 text-white'>&times;</button>
                {/* {data.map(item => <RevenueItem item={item} />)} */}
            </div>

            <Button onClick={handleConvertToPdf} text="DOWNLOAD" />
        </div>
    );
};

export default DemoPDF;