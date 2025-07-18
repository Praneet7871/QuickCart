import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer id="contact" className="backdrop-blur-md bg-white/5 text-white border-t border-white/10 font-light text-base">
      <div className="flex flex-col md:flex-row items-start justify-between px-6 md:px-16 lg:px-32 gap-10 py-16 border-b border-white/10">
        {/* LEFT SECTION */}
        <div className="md:w-1/2">
          <Image className="w-32 md:w-36" src={assets.logo} width={144} height={38} alt="logo" />
          <p className="mt-6 leading-relaxed">
            Quickcart is a site for distribution of models in order to ease club activities and
            provide a platform for the club members to share their models and ideas.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-1/2 flex items-start justify-start md:justify-end">
          <div>
  <h2 className="font-semibold text-white text-2xl mb-4">Get in touch</h2>
  <div className="space-y-2 text-lg">
    <p>7000979055</p>
    <p>animators@iiti.ac.in</p>
  </div>
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
