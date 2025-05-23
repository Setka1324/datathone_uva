import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer 
      className="bg-[#C0C0C0] font-pixel text-black p-2 mt-auto border-2 border-r-black border-b-black border-l-white border-t-white"
      // Style explanation:
      // bg-[#C0C0C0]: Light gray background, same as your login window.
      // font-pixel: Assumes you have a 'font-pixel' class defined in Tailwind for your pixelated font.
      // text-black: Black text color for readability on the gray background.
      // p-2: Small padding for a compact footer/status bar feel.
      // mt-auto: Pushes the footer to the bottom of the viewport if content is short.
      // border-2 border-r-black border-b-black border-l-white border-t-white: 
      //   Creates a 3D "raised" or "outset" border effect, identical to your login window's border,
      //   making it look like a consistent UI panel.
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs">
        {/* Left side: Copyright information */}
        <div className="mb-2 sm:mb-0">
          &copy; {currentYear} D.I.C.E. IMPACT All Rights Reserved.
        </div>

        {/* Right side: Navigation Links */}
        {/* These links are placeholders. Update href to actual paths. */}
        <div className="flex space-x-4">
          <a href="https://www.bloom-uva.nl/" className="hover:underline">
            Made by Bloom 
          </a>
          <a href="https://www.instagram.com/dice_impact/" className="hover:underline">
            Instagram
          </a>

          <a className="text-[#C0C0C0]">
            Mark+Amir
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
