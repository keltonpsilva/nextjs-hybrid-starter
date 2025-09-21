/* eslint-disable @next/next/no-img-element */

import { Fragment } from "react/jsx-runtime";
// import { Facebook, Instagram, Linkedin } from 'lucide-react'

import { HOME_PAGE_PATH } from "@/shared/router/router-paths";
import Link from "next/link";
import footerNavigationItems from "./footer-nagivation-items";

export default function FooterSection() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/4">
            {/* <div className="text-xs font-medium text-gray-400 uppercase">HouseMotto</div> */}
            <Link href={HOME_PAGE_PATH}>
              <div className="flex  items-center gap-2">
                <span className="sr-only">Your Company</span>
                {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  /> */}
                <img
                  className="h-8 w-auto "
                  src="/assets/house-motto-logo.svg"
                  alt="housemotto-logo"
                />
                <span className="font-bold">Housemotto</span>
              </div>
            </Link>
          </div>

          <div className="w-full md:w-3/4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {footerNavigationItems.map((item, index) => (
                <Fragment key={`${index}-${item.title}`}>
                  <div key={`section-${item.title}`}>
                    <div className="text-sm font-semibold text-black uppercase">
                      {item.title}
                    </div>
                    {item.children.map((link, linkIndex) => (
                      <Link
                        key={`link-${item.title}-${linkIndex}`}
                        href={link.href}
                        className="block first:mt-5 mt-3 text-sm font-medium text-gray-500 duration-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-200 hover:underline"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">
            © Copyright 2024. All Rights Reserved.
          </p>

          {/* <div className="flex mt-3 -mx-2 sm:mt-0">
            <Link to={'#'}>
              <Linkedin
                className="mx-2 size-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Linkedin"
              />
            </Link>

            <Link to={'#'}>
              <Facebook
                className="mx-2 size-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Linkedin"
              />
            </Link>

            <Link to={'#'}>
              <Instagram
                className="mx-2 size-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Linkedin"
              />
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
