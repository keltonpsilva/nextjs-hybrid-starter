import { signOut } from "next-auth/react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  ExitIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  DASHBOARD_PAGE_PATH,
  HOME_PAGE_PATH,
  PROFILE_PAGE_PATH,
  PUBLIC_ROUTES_PATH,
} from "@/shared/router/router-paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";

interface NavigationMenuItem {
  id: string;
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

function getDropdownMenuItems(isWebsite: boolean): NavigationMenuItem[] {
  const dashboardItem = [
    {
      id: "website",
      name: "Go Website",
      href: HOME_PAGE_PATH,
      icon: DashboardIcon,
    },
    {
      id: "profile",
      name: "Profile",
      href: PROFILE_PAGE_PATH,
      icon: UserCircleIcon,
    },
    // {
    //   id: "help",
    //   name: "Help",
    //   href: PROFILE_PAGE_PATH,
    //   icon: CircleQuestionMark,
    // },
  ];

  const websiteItem = [
    {
      id: "dashboard",
      name: "Go Dashboard",
      href: DASHBOARD_PAGE_PATH,
      icon: DashboardIcon,
    },
  ];

  return isWebsite ? websiteItem : dashboardItem;
}

function getUserInitials(displayName: string | null): string | null {
  if (!displayName) {
    return null;
  }

  const fullname = displayName.split(" ");
  const firstName = fullname[0];
  const lastNname = fullname[1];

  return firstName[0].toUpperCase() + lastNname[0].toLocaleUpperCase();
}

export default function ProfileDropdown({
  displayName,
}: {
  displayName: string;
}) {
  const pathname = usePathname();
  const [isWebsite, setIsWebsite] = useState<boolean>(false);

  useEffect(() => {
    const isWebsite = PUBLIC_ROUTES_PATH.some(
      (path) =>
        pathname === "/" || pathname === path || pathname.startsWith(`${path}/`)
    );

    setIsWebsite(isWebsite);
  }, [pathname]);

  const userNavigation = getDropdownMenuItems(isWebsite);

  return (
    <span>
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <div className="flex flex-col justify-center px-3 py-1 text-base leading-6 whitespace-nowrap bg-white rounded-lg border-2 border-violet-200 border-solid">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col justify-center self-stretch font-bold text-center text-white">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="localhost" />
                    <AvatarFallback className="bg-primary">
                      {getUserInitials(displayName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="self-stretch my-auto text-slate-950 hidden sm:block">
                  {displayName}
                </div>
                <ChevronDownIcon className="w-5 h-5 display-inline" />
              </div>
            </div>
          </MenuButton>
        </div>

        <Transition
          as={MenuItems}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            {userNavigation.map((item) => (
              <div key={`menu-${item.id}`}>
                <MenuItem key={`menu-item-${item.id}`}>
                  <Link
                    href={item.href}
                    className="flex px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    {item.icon && <item.icon className={cn("h-5 w-5 mr-2")} />}
                    {item.name}
                  </Link>
                </MenuItem>
                <Separator key={`separator-${item.id}`} />
              </div>
            ))}

            <MenuItem>
              <a
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                className="flex px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                <ExitIcon className="w-4 h-4 mr-2" />
                Sign out
              </a>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </span>
  );
}
