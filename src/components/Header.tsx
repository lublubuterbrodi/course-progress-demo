function Header() {
  return (
    <header className="mb-8 sm:mb-10">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
        Course tracker
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        My Courses
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        Create courses, add lessons and track your learning progress
      </p>
    </header>
  );
}

export default Header;
