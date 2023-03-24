import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center h-24 w-full border-t mt-5 flex sm:flex-row flex-col justify-between items-center sm:px-10 space-y-3 p-3">
      <div className="">
        Made with 🖤 in SF. Powered by{" "}
        <a
          href="https://twitter.com/peterthedecent"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Growth First Labs, LLC{" "}
        </a>
      </div>
      <div className="flex space-x-4 pb-4 sm:pb-0">
        <Link
          href="https://twitter.com/peterthedecent"
          className="group"
          aria-label="Peter on Twitter"
          target={"_blank"}
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
          </svg>
        </Link>
        <Link
          href="https://github.com/petersolimine"
          className="group"
          aria-label="Peter on GitHub"
          target={"_blank"}
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
        </Link>
        <Link
          href="https://www.instagram.com/peters_5"
          className="group"
          aria-label="Peter on Instagram"
          target={"_blank"}
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
            viewBox="0 0 24 24"
          >
            <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A4.2,4.2 0 0,1 17.8,21H7.8C4.6,21 2,19.4 2,16.2V7.8A4.2,4.2 0 0,1 7.8,2M7.6,4A2.6,2.6 0 0,0 5,6.6V16.4C5,18.39 6.61,20 8.6,20H17.4A2.6,2.6 0 0,0 20,17.4V8.6C20,6.61 18.39,5 16.4,5H7.6M17.25,15A1.25,1.25 0 0,1 16,16.25C15.31,16.25 14.75,15.69 14.75,15V12.25A1.25,1.25 0 0,1 16,11C16.69,11 17.25,11.56 17.25,12.25V15Z" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
