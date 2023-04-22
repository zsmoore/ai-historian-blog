import Link from "next/link";

const Footer = () => {
  return (
    <footer aria-label="Site Footer" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <Link href="/">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-md sm:text-lg leading-tight sm:leading-tight lg:leading-relaxed">
                {process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')}
              </span>
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 lg:mt-0 lg:text-right">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;