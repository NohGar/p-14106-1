"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PostDto } from "@/type/post";
import { apiFetch } from "@/lib/backend/client";

//const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function Page() {
  //const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  //const [posts, setPosts] = useState<PostDto[]>([]);
  const [posts, setPosts] = useState<PostDto[] | null>(null);

  useEffect(() => {
    // fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`)
    //   .then((res) => res.json())
    //   .then(setPosts);

    apiFetch(`/api/v1/posts`).then(setPosts);
  }, []);

  //'로딩중'을 제대로 구현
  if (posts == null) return <div>로딩중...</div>;

  return (
    <>
      <h1>글 목록</h1>

      {posts.length == 0 && <div>글이 없습니다.</div>}

      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                {post.id} : {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="border p-2">
        <Link href="/posts/write">글쓰기</Link>
      </div>
    </>
  );
}