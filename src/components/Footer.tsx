import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-[#090A0D] border-t border-[#1A1D24] px-6 md:px-12 py-6">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
       
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src={logo} 
            alt="FitLog Logo" 
            width={24} 
            height={24} 
            className="object-contain" 
            priority 
          />
          <span className="text-white font-extrabold text-lg tracking-wider">
            FITLOG
          </span>
        </Link>

       
        <p className="text-[#6B7280] text-xs sm:text-sm font-normal text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;