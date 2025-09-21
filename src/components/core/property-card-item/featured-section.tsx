import { StarIcon } from "@heroicons/react/24/solid";

export default function FeaturedSection() {
  return (
    <div>
      <div className="absolute mt-5 transform -translate-x-2.5">
        <svg
          width="10"
          height="10"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="gap-0 w-full aspect-square fill-indigo-600 min-w-[10px]"
        >
          <path d="M8 8L0 0H8V8Z" fill="#5245ED" />
        </svg>

        {/* <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cbbdb2d66ebc773316b6d746006064d45b4956bdbf34acd6067d0930c023c10?"
    className="gap-0 w-full aspect-square fill-indigo-600 min-w-[10px]"
  /> */}
      </div>

      <div
        id="popular"
        className="bg-indigo-600 w-[120px] absolute top-full -mt-3  transform -translate-x-2.5 rounded-t-lg rounded-br-lg text-white h-8 flex items-center gap-1 "
      >
        <div className="ml-3 flex items-center gap-1 font-semibold">
          <StarIcon className="w-4 h-4" />
          Featured
        </div>
      </div>
    </div>
  );
}
