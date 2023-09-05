import Link from 'next/link';

export default function LinkC({href, children}) {
  return (
    <Link legacyBehavior href={href}><a style={{textDecoration: 'none'}}>{children}</a></Link>
    );
}