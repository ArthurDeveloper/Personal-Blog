import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Router } from 'next/router';

type TopBarItemProps = {
    href: string,
    children: string | JSX.Element
}

function TopBarItem({ href, children }: TopBarItemProps) {
    return (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    )
}

export default function TopBar() {
    const [isScreenSmall, setIsScreenSmall] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    Router.events.on('routeChangeStart', () => {
        setIsMenuOpen(false);
    });

    useEffect(() => {
        function updateScreenSize() {
            if (window.innerWidth < 576) {
                setIsScreenSmall(true);
            } else {
                setIsScreenSmall(false);
            }
        }

        updateScreenSize();

        document.addEventListener('resize', () => {
            updateScreenSize();
        });
    }, []);

    return (
        <>
            <div className={`flex items-center bg-cyan-300 h-16 ${isMenuOpen ? 'absolute z-10 top-0' : ''} w-full`}>
                <h1 className="text-3xl ml-7 align-middle">
                    <Link href="/">
                        <a>ArthurDev</a>
                    </Link>
                </h1>

                {
                    isScreenSmall ? 
                    <button className="ml-auto mr-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        Menu
                    </button> :
                    <nav className="flex ml-auto mr-4 sm:mr-7 justify-between sm:w-48 md:w-1/4">
                        <TopBarItem href="/">Home</TopBarItem>
                        <TopBarItem href="/about">About</TopBarItem>
                        <TopBarItem href="/contact">Contact</TopBarItem>
                    </nav>
                }
            </div>

            {isMenuOpen ? 
                <nav className={`flex flex-col w-full h-full absolute z-0 ${isMenuOpen ? 'top-16' : '-top-16'} animate-menu-show-up`}>
                    <TopBarItem href="/">
                        <div className="border-b border-gray-200 pr-2 p-5 text-xl bg-white">
                            Home    
                        </div>
                    </TopBarItem>

                    <TopBarItem href="/about">
                        <div className="border-b border-gray-200 pr-2 p-5 text-xl bg-white">
                            About
                        </div>
                    </TopBarItem>

                    <TopBarItem href="/contact">
                        <div className="border-b border-gray-200 pr-2 p-5 text-xl bg-white">
                            Contact
                        </div>
                    </TopBarItem>
                </nav> :
                null
            }
        </>
    )
}
