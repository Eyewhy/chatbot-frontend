import Link from 'next/link';

function PublicLayout({ children }) {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="site-logo" href="/search">Helper4me</Link>
          <nav aria-label="Main navigation">
            <Link href="/search">Find helpers</Link>
            <Link href="/organization">Agencies</Link>
            <a href="https://blog.helper4.me/wp/">Blog</a>
            <a href="https://blog.helper4.me/wp/faq">FAQ</a>
            <Link href="/login">Account</Link>
          </nav>
        </div>
      </header>
      <main className="site-main">{children}</main>
    </>
  );
}

export default PublicLayout;
