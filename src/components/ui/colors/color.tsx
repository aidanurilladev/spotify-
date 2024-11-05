'use client';
import { useState } from 'react';
// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';
import scss from './color.module.scss';

const imageUrl =
 'https://elchocrud.pro/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgirl.7db8d490.png&w=1200&q=75';

const Color = () => {
 const [bgColor, setBgColor] = useState('#ffffff');

 const handleColors = (colors: string[]) => {
  if (colors.length > 0) {
   setBgColor(colors[0]);
  }
 };

 return (
  <section className={scss.PlayList}>
   <div className="container">
    <div className={scss.content}>
     <h1>PlayList</h1>
     <div
      style={{
       backgroundColor: bgColor,
       height: '100vh',
       padding: '20px'
      }}
     >
      <ColorExtractor getColors={handleColors}>
       <img
        src={imageUrl}
        alt="Cover"
        style={{ width: '100px', height: 'auto' }}
        crossOrigin="anonymous"
       />
      </ColorExtractor>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Color;