import Link from 'next/link';

type TopBarItemProps = {
    href: string,
    children: string
}

function TopBarItem({ href, children }: TopBarItemProps) {
    return (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    )
}

export default function TopBar() {
    return (
        <div className="flex items-center bg-cyan-300 h-16">
            <h1 className="text-3xl ml-7 align-middle">
                <Link href="/">
                    <a>ArthurDev</a>
                </Link>
            </h1>

            <div className="flex ml-auto mr-7 justify-between lg:w-1/4 md:w-1/2">
                <TopBarItem href="/">Home</TopBarItem>
                <TopBarItem href="/about">About</TopBarItem>
                <TopBarItem href="/contact">Contact</TopBarItem>
            </div>
        </div>
    )
}
