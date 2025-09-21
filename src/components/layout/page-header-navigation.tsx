"use client";

import { useEffect, useState } from "react";
import { PopoverGroup } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";
import {
  APPLICATIONS_PAGE_PATH,
  BUY_LISTING_PAGE_PATH,
  DASHBOARD_PAGE_PATH,
  FAVORITED_PAGE_PATH,
  HOME_PAGE_PATH,
  PUBLIC_ROUTES_PATH,
  RENT_LISTING_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
  VIEWING_PAGE_PATH,
} from "@/shared/router/router-paths";
import { cn } from "@/lib/utils";

import ProfileDropdown from "./profile-dropdown";
import PageHeaderMobileNavigation from "./page-header-mobile-navigation";

export interface Navigation {
  categories: Category[];
  pages: Page[];
}

interface Category {
  id: string;
  name: string;
  featured: FeaturedItem[];
  sections: Section[];
}

interface FeaturedItem {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface Section {
  id: string;
  name: string;
  items: Page[]; // Same structure as Page
}

export interface Page {
  name: string;
  href: string;
}

const websitePages: Page[] = [
  { name: "Rent", href: RENT_LISTING_PAGE_PATH },
  { name: "Buy", href: BUY_LISTING_PAGE_PATH },
];
const dashboardPages: Page[] = [
  { name: "Dashboard", href: DASHBOARD_PAGE_PATH },
  { name: "Application", href: APPLICATIONS_PAGE_PATH },
  { name: "Saved properties", href: FAVORITED_PAGE_PATH },
  { name: "Viewings", href: VIEWING_PAGE_PATH },
];

export default function PageHeaderNavigation() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<Page[]>([]);

  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    const isWebsite = PUBLIC_ROUTES_PATH.some(
      (path) =>
        pathname === HOME_PAGE_PATH ||
        pathname === path ||
        pathname.startsWith(`${path}/`)
    );

    setMenuItems(isWebsite ? websitePages : dashboardPages);
  }, [pathname]);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <PageHeaderMobileNavigation
        open={open}
        setOpen={setOpen}
        pages={menuItems}
      />

      <header className="relative bg-white border-b border-gray-200 dark:border-white/10">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"> */}
        {/* <p className="flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          You&apos;re using the Beta version of Housemotto — we’re still
          improving!
        </p> */}

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href={HOME_PAGE_PATH}>
                  <div className="flex  items-center gap-2">
                    <span className="sr-only">Your Company</span>
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    /> */}
                    <picture>
                      <img
                        className="h-7 w-auto "
                        src="/assets/house-motto-logo.svg"
                        alt="housemotto-logo"
                      />
                    </picture>
                    {/* <span className="font-bold">Housemotto</span> */}
                    <span>Housemotto</span>
                  </div>
                </Link>

                {/* <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a> */}
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <div className="flex h-full space-x-8">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-gray-700  hover:border-indigo-600 hover:text-indigo-600  ",
                          "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      alt=""
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      alt=""
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
                </div> */}

                {/* Authentication */}
                <div className="flex lg:ml-6">
                  <div className="flex items-center gap-2">
                    {status === "unauthenticated" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => redirect(SIGN_IN_PAGE_PATH)}
                        >
                          Login
                        </Button>
                        <Button onClick={() => redirect(SIGN_UP_PAGE_PATH)}>
                          Register
                        </Button>
                      </>
                    )}

                    {status === "authenticated" && user && (
                      <ProfileDropdown displayName={user.name ?? user.email!} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
