import { RawHtml } from "@/components/RawHtml";
import Link from "next/link";
import { Masthead } from "../Masthead";
import "./excerpt.css";

function Excerpt({ post }: { post: ExcerptType }) {
  return (
    <div className="post-preview">
      <Link href={post?.uri}>
        <header>
          <Masthead
            className="mini-masthead"
            featuredImage={{
              node: { ...post.featuredImage?.node, uri: post.uri },
            }}
          />
        </header>
      </Link>
      <div className="ubu">
        <RawHtml>{post.excerpt}</RawHtml>
        <Link style={{ color: "var(--accentColor)" }} href={post.uri}>
          read&nbsp;more&nbsp;&raquo;
        </Link>
      </div>
    </div>
  );
}

export default Excerpt;
